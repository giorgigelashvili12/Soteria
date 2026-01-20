import mongoose from "mongoose";
import type { MerchantI } from "../interfaces/Merchant.interface.js";
import { passkey } from "../utils/passkey.js";

const mercantSchema = new mongoose.Schema<MerchantI>({
  id: { type: String, required: true, unique: true, immutable: true },
  email: { type: String, required: true },
  password: { type: String, required: true, minLength: 8 },
  legalName: { type: String, required: true },
  phone: { type: String, default: null },
  country: { type: String, required: true },
  lastLoginIp: { type: String, required: true },
  sessions: [
    {
      ip: { type: String, required: true },
      userAgent: { type: String, required: true },
      location: { type: String, required: true },
      lastUsed: { type: Date, required: true, default: Date.now },
    },
  ],
  verifiedCountry: { type: String, default: null },
  documents: [
    {
      category: { type: String, enum: ["kyc", "poa", "kyb"] },
      type: {
        type: String,
        enum: [
          "passport",
          "drivers_license",
          "national_id_card",
          "utility_bill",
          "tax_bill",
          "bank_statement",
          "rental_agreement",
          "rental_agreement",
          "certificate_of_incorporation",
          "business_license",
          "articles_of_association",
          "custom",
          "merchant",
        ],
        required: false,
        default: "merchant",
      },
      document_id: { type: String, default: null },
      status: {
        type: String,
        enum: ["pending", "verified", "rejected"],
        default: "pending",
      },
      uploaded_at: { type: Date, default: Date.now },
    },
  ],
  success_url: { type: String, required: false },
  failed_url: { type: String, required: false },
  setup: { type: Boolean, default: false },
  documentVerified: { type: Boolean, default: false },
  created_at: { type: Date, required: true, default: Date.now },
  status: {
    type: String,
    required: true,
    enum: ["pending", "approved", "rejected", "suspended", "deleted"],
    default: "pending",
  },
  credit: { type: Number, default: 0 },
  passkey: { type: String, required: true, default: passkey() },
  secret_key: { type: String },
  premium: { type: Boolean, required: true, default: false },
  // test
  emailVerified: { type: Boolean, default: false },
  emailVerificationToken: { type: String, default: null },
  expiryDate: {
    type: Number,
    default: () => Math.floor(Date.now() / 1000) + 31536000,
  },
  oauth_id: { type: String },
  oauth_provider: { type: String, enum: ["google", null], default: null },
});

const Merchant = mongoose.model("Merchant", mercantSchema);
export default Merchant;
