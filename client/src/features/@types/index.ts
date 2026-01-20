export interface UserI {
  legalName?: string;
  documentVerified?: boolean;
}

export interface WorkspaceI {
  name: string;
}

export interface MembershipI {
  role?: string;
  workspace_id?: WorkspaceI;
}

export interface BusinessProps {
  user: UserI;
  membership: MembershipI;
}

export interface ProductI {
  id?: string;
  _id?: { toString: () => string } | string;
  name: string;
  price: number;
  currency: string;
  sku: string;
}

export type Product = {
  id: string;
  name: string;
  price: number;
  currency: string;
  sku: string;
};

export type Role = "viewer" | "developer" | "admin" | "owner";

export interface ChangeRoleProps {
  membershipId: string;
  currentRole: Role;
  onRefresh: () => void;
}

export interface RemoveMemberProps {
  member: {
    _id: string;
    merchant_id: {
      name: string;
    };
  };
  onRefresh: () => void;
}

interface Merchant {
  legalName: string;
  email: string;
}

export interface Member {
  _id: string;
  role: string;
  merchant_id: Merchant;
  joined_at?: string;
}

export interface UserMembership {
  workspace_id?: { _id: string } | string;
  role: string;
}

export interface WorkspaceI {
  _id: string;
  name: string;
  owner_id: string;
  status: "playground" | "test" | "live";
  branding: {
    icon_url?: string;
    description?: string;
    primary_color?: string;
  };
  created_at: Date;
}

interface LineItem {
  name: string;
  quantity: number;
  price: number;
}

export interface IntentDetails {
  amount: number;
  currency: string;
  items: LineItem[];
  merchantName: string;
  merchantVerified: boolean;
  merchantLevel: number;
  metadata: object;
  success_url: string;
  failed_url: string;
  base_redirect: string;
}

interface BalanceEntry {
  amount: number;
  currency: string;
  type?: string;
}

export interface Transaction {
  id: string;
  object: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
}

export interface FinanceStats {
  balance: {
    available: BalanceEntry[];
    pending: BalanceEntry[];
    reserved: BalanceEntry[];
  };
  transactions: Transaction[];
  totalVolume: number;
}
