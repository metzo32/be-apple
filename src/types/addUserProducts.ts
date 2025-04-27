export interface ProductSelectInfoProps {
  productId: number | null;
  productOptionId: number | null;
}

export interface UserProductFormData {
  productId: number | null;
  productOptionId: number | null;
  purchasedAt: string;
  purchasePrice: number;
  soldAt: string;
  status: string;
  repurchasedCount: number;
  condition: string;
  memo: string;
}
