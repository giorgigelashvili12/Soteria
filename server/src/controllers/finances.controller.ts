import type { Request, Response } from "express";
import Balance from "../models/Balance.model.js";
import Transaction from "../models/Transaction.model.js";
import PaymentIntent from "../models/PaymentIntent.model.js";

export const stats = async (req: Request, res: Response) => {
  //@ts-ignore
  const merchant = req.merchant.id;

  const [balance, transactions, volumeResult] = await Promise.all([
    Balance.findOne({ account_id: merchant }),
    Transaction.find({ account_id: merchant })
      .sort({ createdAt: -1 })
      .limit(10),
    PaymentIntent.aggregate([
      {
        $match: {
          merchant_id: merchant,
          status: "succeeded",
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]),
  ]);

  const volume = volumeResult.length > 0 ? volumeResult[0].totalAmount : 0;

  res.json({
    balance,
    transactions,
    volume,
    currency: balance?.available[0]?.currency || "GEL",
  });
};

export const settleManually = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const merchantId = req.merchant.id;

    const balance = await Balance.findOne({ account_id: merchantId });

    if (!balance) {
      return res
        .status(404)
        .json({ msg: "No balance found for this merchant" });
    }

    const pendingItem = balance.pending[0];
    if (!pendingItem || pendingItem.amount <= 0) {
      return res.status(400).json({ msg: "No pending funds to settle" });
    }

    const availableItem = balance.available.find(
      (a) => a.currency === pendingItem.currency,
    );

    if (!availableItem) {
      balance.available.push({
        amount: pendingItem.amount,
        currency: pendingItem.currency,
        type: "card",
      });
    } else {
      availableItem.amount += pendingItem.amount;
    }

    pendingItem.amount = 0;

    await balance.save();

    return res.json({
      msg: "Funds settled successfully",
      data: balance,
    });
  } catch (e: any) {
    return res
      .status(500)
      .json({ msg: "Internal server error", err: e.message });
  }
};
