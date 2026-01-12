import mongoose from "mongoose";
import type { ProductI } from "../interfaces/product.interface.js";
import { CURRENCIES } from "../types/rates.type.js";

const productSchema = new mongoose.Schema<ProductI>(
  {
    id: { type: String, required: true, unique: true, immutable: true },
    merchant_id: { type: String, required: true },
    merchant_name: { type: String },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, required: true, enum: CURRENCIES },
    description: String,
    image_url: String,
    sku: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true },
);

productSchema.index({ merchant_id: 1, name: 1 }, { unique: true });

const Product = mongoose.model<ProductI>("Product", productSchema);
export default Product;
