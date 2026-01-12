import mongoose from "mongoose";
import type { WorkspaceI } from "../interfaces/Workspace.interface.js";

const workspaceSchema = new mongoose.Schema<WorkspaceI>({
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Merchant",
    required: true,
  },
  name: { type: String, required: true },
  status: {
    type: String,
    enum: ["playground", "test", "live"],
    default: "playground",
  },
  branding: {
    icon_url: { type: String },
    description: { type: String },
    primary_color: { type: String, default: "#10b981" },
  },
  created_at: { type: Date, default: Date.now },
});

const Workspace = mongoose.model("Workspace", workspaceSchema);
export default Workspace;
