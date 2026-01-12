import mongoose from "mongoose";
import type { InvitationI } from "../interfaces/Invitation.interface.js";

const invitationSchema = new mongoose.Schema<InvitationI>({
  workspace_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Workspace",
    index: true,
  },
  inviter_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Merchant",
  },
  email: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "developer", "viewer"],
    required: true,
    default: "viewer",
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "suspended"],
    required: true,
    default: "pending",
  },
  token: { type: String, unique: true },
  metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  expires_at: { type: Date, default: () => new Date(Date.now() + 86400000) },
  created_at: { type: Date, default: Date.now },
});

const Invitation = mongoose.model("Invitation", invitationSchema);
export default Invitation;
