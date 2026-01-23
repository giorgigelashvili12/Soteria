import Transaction from "../models/Transaction.model.js";
import Balance from "../models/Balance.model.js";
import { v4 as uuidv4 } from "uuid";
import type { Request, Response } from "express";

export const grossVolume = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const merchantId = req.merchant._id || req.merchant.id;
    console.log(merchantId);

    let tr = await Transaction.find({ account_id: merchantId }).sort({
      created_at: 1,
    });

    const chartData = tr.map((t) => ({
      date: new Date(t.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      gross: t.amount || 0,
      net: (t.amount || 0) - (t.fee || 0),
    }));

    res.json(chartData);
  } catch (e: any) {
    console.error("Error:", e);
    res.status(500).json({ msg: "error fetching metrics" });
  }
};
