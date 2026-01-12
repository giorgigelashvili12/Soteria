import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import type { ChargeI } from "../interfaces/Charge.interface.js";
import { CURRENCIES } from "../types/rates.type.js";

const chargeSchema = new mongoose.Schema<ChargeI>({
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
    default: "charge",
  },
  amount: { type: Number, required: true },
  amount_received: { type: Number, default: null },
  amount_refunded: { type: Number, default: null },
  app_source: { type: String, default: null },
  app_fee: { type: String, default: null },
  balance: { type: String, default: null },
  captured: { type: Boolean, default: true },
  currency: { type: String, requried: true, enum: CURRENCIES },
  customer_id: { type: String, default: null },
  description: { type: String, default: null },
  live: { type: Boolean, required: true, default: false },
  metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  failure_balance: { type: String, default: null },
  failure_code: { type: String, default: null },
  failure_message: { type: String, default: null },
  fraud_details: {
    user_report: { type: String, default: null },
    platform_report: { type: String, default: null },
  },
  result: {
    network_status: { type: String, default: null },
    reason: { type: String, default: null },
    risk_level: { type: String, default: null },
    risk_score: { type: String, default: null },
    type: { type: String, default: null },
  },
  paid: { type: Boolean, default: false },
  payment_intent: { type: String, default: null },
  payment_method: { type: String, default: null },
  payment_method_details: {
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
      country: { type: String, enum: ["GE", "US"], required: true },
      fingerprint: { type: String, default: () => uuidv4(), required: true },
      network: {
        code: { type: String, default: null },
        reason: { type: String, default: null },
        status: { type: String, default: null },
      },
    },
  },
});

const Charge = mongoose.model("Charge", chargeSchema);
export default Charge;
