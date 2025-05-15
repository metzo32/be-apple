import { get } from "@/api/api";
import type { GetProductResponse } from "@/types/product";
import type { ProductDetail } from "@/types/productDetail";
import { ProductCategoryEnum } from "@/types/productCategory";

export async function getProduct(category: ProductCategoryEnum) {
  const { data } = await get<GetProductResponse[]>(
    `/product?category=${category}`
  );
  return data;
}

export async function getProductDetail(productId: number) {
  const { data } = await get<ProductDetail>(`/product/${productId}`);
  return data;
}
