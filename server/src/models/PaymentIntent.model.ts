import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import type { PaymentIntentI } from "../interfaces/PaymentIntent.interface.js";
import { CURRENCIES } from "../types/rates.type.js";

const paymentIntentSchema = new mongoose.Schema<PaymentIntentI>({
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
    default: "payment_intent",
  },
  client_secret: {
    type: String,
    required: true,
    unique: true,
    default: () => `pi_${uuidv4()}_secret_${uuidv4().split("-")[0]}`,
  },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
      sku: String,
    },
  ],
  amount: { type: Number, required: true },
  amount_received: { type: Number, required: true },
  currency: { type: String, required: true, enum: CURRENCIES },
  idempotency_key: { type: String, default: () => uuidv4(), required: true },
  status: {
    type: String,
    required: true,
    enum: ["requires_payment_method", "processing", "succeeded", "failed"],
  },
  live: { type: Boolean, required: true, default: false },
  customer_id: { type: String, default: null },
  merchant_id: { type: String, required: true },
  merchant_name: { type: String, default: null },
  description: { type: String, default: null },
  metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  created_at: { type: Date, default: Date.now, required: true },
  changed_at: { type: Date, default: Date.now },
});

const PaymentIntent = mongoose.model("PaymentIntent", paymentIntentSchema);
export default PaymentIntent;
