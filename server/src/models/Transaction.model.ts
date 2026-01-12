import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import type { TransactionI } from "../interfaces/Transaction.interface.js";
import { CURRENCIES } from "../types/rates.type.js";

const transactionSchema = new mongoose.Schema<TransactionI>({
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
    default: "transaction",
  },
  account_id: { type: String, required: true },
  amount: { type: Number, required: true },
  fee: { type: Number, default: 0 },
  currency: { type: String, enum: CURRENCIES, required: true },
  redisplay: {
    type: String,
    required: true,
    enum: ["allowed", "limited", "unspecified"],
    default: "unspecified",
  },
  status: {
    type: String,
    required: true,
    enum: ["open", "cancelled", "declined", "completed", "void"],
  },
  live: { type: Boolean, default: false, required: true },
  created_at: { type: Date, default: Date.now, required: true },
  customer: { type: String, default: null },
  card: {
    brand: {
      type: String,
      required: true,
      enum: ["visa", "mastercard", "tbc", "credo", "bog"],
    },
    last4: { type: String, required: true },
    check: {
      type: String,
      enum: ["pass", "fail", "unavailable", "unchecked"],
      default: "unavailable",
    },
    country: { type: String, required: true },
    fingerprint: { type: String, default: () => uuidv4(), required: true },
    network: {
      code: { type: String, default: null },
      reason: { type: String, default: null },
      status: { type: String, default: null },
    },
  },
  metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
