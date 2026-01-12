import type { BalanceI } from "../interfaces/Balance.interface.js";
import mongoose from "mongoose";
import { CURRENCIES } from "../types/rates.type.js";

const balanceSchema = new mongoose.Schema<BalanceI>({
  id: { type: String, required: true, unique: true, immutable: true },
  object: {
    type: String,
    enum: [
      "transaction",
      "charge",
      "customer",
      "refund",
      "balance",
      "payout",
      "payment_intent",
    ],
    required: true,
    immutable: true,
    default: "balance",
  },
  account_id: { type: String, required: true },
  available: [
    {
      amount: { type: Number, required: true },
      currency: { type: String, required: true, enum: CURRENCIES },
      type: { type: String, required: true, enum: ["card"] },
    },
  ],
  pending: [
    {
      amount: { type: Number, required: true },
      currency: { type: String, required: true, enum: CURRENCIES },
      type: { type: String, required: true, enum: ["card"] },
    },
  ],
  reserved: [
    {
      amount: { type: Number, required: true },
      currency: { type: String, required: true, enum: CURRENCIES },
      reason: {
        type: String,
        requried: true,
        enum: ["payout", "dispute", "reserve"],
      },
    },
  ],
  live: { type: Boolean, required: true, default: false },
  created_at: { type: Date, default: Date.now, required: true },
  updated_at: { type: Date, default: Date.now, required: true },
});

const Balance = mongoose.model("Balance", balanceSchema);
export default Balance;
