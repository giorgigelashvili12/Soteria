// analytics model
import { Types } from "mongoose";

export interface InvitationI {
  workspace_id: Types.ObjectId | string;
  inviter_id: Types.ObjectId | string;
  email: string;
  role: "admin" | "developer" | "viewer";
  status: "pending" | "accepted" | "suspended";
  token: string; // url.params
  metadata: Object;
  expires_at: Date;
  created_at: Date;
}
