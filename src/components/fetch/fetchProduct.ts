import { get } from "@/api/api";
import type { GetProductResponse } from "@/types/product";
import type { ProductDetail } from "@/types/productDetail";
import {
  ProductCategoryEnum,
  ProductQueryString,
} from "@/types/productCategory";

export async function getProduct(
  category: ProductCategoryEnum,
  query?: Omit<ProductQueryString, "category">
  // ProductQueryString에서 category 를 뺀 타입.
  // 이미 첫번째 매개변수로 받고있으므로
) {
  const { data } = await get<GetProductResponse[]>("/product", {
    params: { category, ...query },
  });
  return data;
}

export async function getProductDetail(productId: number) {
  const { data } = await get<ProductDetail>(`/product/${productId}`);
  return data;
}


