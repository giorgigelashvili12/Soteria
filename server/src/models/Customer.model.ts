import mongoose from "mongoose";
import type { CustomerI } from "../interfaces/Customer.interface.js";
import { CURRENCIES } from "../types/rates.type.js";

const customerSchema = new mongoose.Schema<CustomerI>({
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
    default: "customer",
  },
  balance: { type: Number, default: 0 },
  created_at: { type: Date, required: true, default: Date.now },
  currency: { type: String, enum: CURRENCIES, required: true },
  default_score: { type: mongoose.Schema.Types.Mixed, default: null },
  description: { type: String, default: null },
  email: { type: String, default: null },
  livemode: { type: Boolean, required: true, default: false },
  metadata: { type: String, default: null },
  name: { type: String, default: null },
  phone: { type: String, default: null },

  shipping: {
    address: {
      city: { type: String, default: null },
      country: { type: String, default: null },
      line1: { type: String, default: null },
      postal_code: { type: String, default: null },
      state: { type: String, default: null },
    },
    name: { type: String, default: null },
    tracking_number: { type: String, default: null },
  },
});

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
