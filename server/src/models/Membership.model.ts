import type { MembershipI } from "../interfaces/Membership.interface.js";
import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema<MembershipI>({
  workspace_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workspace",
    required: true,
  },
  merchant_id: {
    type: String,
    ref: "Merchant",
    required: true,
  },
  role: {
    type: String,
    enum: ["owner", "admin", "developer", "support", "analyst", "viewer"],
    default: "viewer",
  },
  status: {
    type: String,
    enum: ["invited", "active", "suspended"],
    default: "invited",
  },
  joined_at: {
    type: Date,
    default: Date.now,
  },
  last_active_at: { type: Date },
});

membershipSchema.index({ merchant_id: 1, workspace_id: 1 }, { unique: true });

const Membership = mongoose.model("Membership", membershipSchema);
export default Membership;
