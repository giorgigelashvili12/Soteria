export interface ProductI {
  id: string;
  merchant_id: string;
  merchant_name: string;
  name: string;
  price: number;
  currency: string;
  description?: string;
  image_url?: string;
  sku: string;
  isActive?: boolean;
  metadata: Object | {};
}
