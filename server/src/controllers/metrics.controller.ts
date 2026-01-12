import Transaction from "../models/Transaction.model.js";
import { v4 as uuidv4 } from "uuid";
import type { Request, Response } from "express";

export const grossVolume = async (req: Request, res: Response) => {
  try {
    let tr: any[] = await Transaction.find().sort({ created_at: 1 });

    if (!tr.length) {
      const test = [
        {
          id: `txn_${uuidv4()}`,
          amount: 1200,
          fee: 50,
          account_id: "test_1",
          currency: "USD",
          status: "completed",
          live: true,
          created_at: new Date("2025-10-01"),
          card: { brand: "visa", last4: "4242", country: "USD" },
        },
        {
          id: `txn_${uuidv4()}`,
          amount: 1500,
          fee: 80,
          account_id: "test_1",
          currency: "USD",
          status: "completed",
          live: true,
          created_at: new Date("2025-10-02"),
          card: { brand: "mastercard", last4: "1111", country: "USD" },
        },
      ];
      tr = await Transaction.insertMany(test);
    }

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
