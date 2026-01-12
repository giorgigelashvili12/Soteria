import { Types } from "mongoose";

export interface MembershipI {
  workspace_id: Types.ObjectId | string;
  merchant_id: Types.ObjectId | string;
  role: "owner" | "admin" | "developer" | "viewer";
  status: "invited" | "active" | "suspended";
  joined_at: Date;
  last_active_at: Date;
}
