import type { Request, Response } from "express";
import Balance from "../models/Balance.model.js";
import Transaction from "../models/Transaction.model.js";
import PaymentIntent from "../models/PaymentIntent.model.js";

export const stats = async (req: Request, res: Response) => {
  //@ts-ignore
  const merchant = req.merchant._id || req.merchant.id;
  console.log(merchant);
  const balance = await Balance.findOne({ account_id: merchant });
  console.log(balance);
  const transactions = await Transaction.find({ account_id: merchant })
    .sort({ createdAt: -1 })
    .limit(10);
  console.log(transactions);

  const intents = await PaymentIntent.find({
    //@ts-ignore
    merchant_id: req.merchant.id,
    status: "succeeded",
  });
  const volume = intents.reduce((acc, cur) => acc + cur.amount, 0);

  res.json({
    balance,
    transactions,
    volume,
    currency: balance?.available[0]?.currency || "GEL",
  });
};
