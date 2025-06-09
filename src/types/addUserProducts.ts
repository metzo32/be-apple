export interface ProductSelectInfoProps {
  productId: number | null;
  productOptionId: number | null;
}

export interface UserProductFormData {
  productId: number | undefined;
  productOptionId: number | undefined;
  purchasedAt: string | undefined;
  purchasePrice: number;
  soldAt: string | undefined;
  status: string;
  repurchasedCount: number;
  condition: string;
  memo: string;
}
