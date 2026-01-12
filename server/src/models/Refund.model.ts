import type { RefundI } from "../interfaces/Refund.interface.js";
import mongoose from "mongoose";
import { CURRENCIES } from "../types/rates.type.js";

const refundSchema = new mongoose.Schema<RefundI>({
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
    default: "refund",
  },
  amount: { type: Number, required: true },
  source: {
    balance: { type: String, required: true },
    charge: { type: String, required: true },
    payment: { type: String, required: true },
  },
  created_at: { type: Date, required: true, default: Date.now },
  currency: { type: String, required: true, enum: CURRENCIES },
  destination: {
    type: { type: String, default: null },
    card: {
      reference: { type: String, default: null },
      reference_status: {
        type: String,
        required: true,
        enum: ["pending", "available", "unavailable"],
      },
      type: {
        type: String,
        required: true,
        enum: ["pending", "refund", "reversal"],
      },
    },
  },
  metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  reason: { type: String, default: null },
  receipt: { type: String, default: null },
  status: {
    type: String,
    required: true,
    enum: ["open", "declined", "completed"],
  },
  live: { type: Boolean, required: true, default: false },
  transaction_id: { type: String, default: null },
});

const Refund = mongoose.model("Refund", refundSchema);
export default Refund;
