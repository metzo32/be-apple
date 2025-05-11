import { get } from "@/api/api";
import type { GetProductResponse } from "@/types/product";
import type { ProductDetail } from "@/types/productDetail";
import { ProductCategoryEnum } from "@/types/productCategory";

// interface ProductCategory {
//   category: string;
// }

export async function fetchProduct(category: ProductCategoryEnum) {
  const { data } = await get<GetProductResponse[]>(
    `/product?category=${category}`
  );
  return data;
}

export async function fetchProductDetail(productId: number) {
  const { data } = await get<ProductDetail>(`/product/${productId}`);
  return data;
}
