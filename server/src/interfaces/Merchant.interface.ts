export interface MerchantI {
  id: string;
  email: string;
  password: string;
  legalName: string;
  phone?: string | null;
  country: string;
  lastLoginIp: string;
  sessions: [
    {
      ip: string;
      userAgent: string;
      location: string;
      lastUsed: Date;
    },
  ];
  verifiedCountry: string;
  documents: Array<{
    category?: "kyc" | "poa" | "kyb";
    type?:
      | "passport"
      | "drivers_license"
      | "national_id_card"
      | "utility_bill"
      | "tax_bill"
      | "bank_statement"
      | "rental_agreement"
      | "certificate_of_incorporation"
      | "business_license"
      | "articles_of_association"
      | "merchant"
      | "custom";
    document_id?: string | null;
    status?: "pending" | "verified" | "rejected";
    uploaded_at: Date;
  }>;
  documentVerified: Boolean;
  created_at: Date;
  status: "pending" | "approved" | "rejected" | "suspended" | "deleted";
  credit?: number;
  passkey: string;
  secret_key: string;
  premium: boolean;
  emailVerified?: boolean;
  emailVerificationToken?: string | null;
  expiryDate?: number;
  oauth_id: string;
  oauth_provider: "google" | null;
}
