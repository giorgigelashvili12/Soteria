import { Types } from "mongoose";

export interface WorkspaceI {
  owner_id: Types.ObjectId | string;
  name: string;
  status: "playground" | "test" | "live";
  branding: {
    icon_url?: string;
    description?: string;
    primary_color?: string;
  };
  created_at: Date;
}
