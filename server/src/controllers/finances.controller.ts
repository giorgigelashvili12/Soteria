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
