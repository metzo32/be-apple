import { get } from "@/api/api";
import type { GetProductResponse } from "@/types/product";
import type { ProductDetail } from "@/types/productDetail";
import { isAxiosError } from "axios";

interface ProductCategory {
  category: string;
}
export async function fetchProduct({ category }: ProductCategory) {
  try {
    const { data } = await get<GetProductResponse[]>(
      `/product?category=${category}`
    );
    return data;
  } catch (error) {
    throw error;
    console.error("불러오기 실패:", error);
    // return null; -- react query는 null을 반환하지 않으므로, error를 던져준다.
  }
}

export async function fetchProductDetail(productId: number) {
  try {
    const { data } = await get<ProductDetail>(`/product/${productId}`);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data.message);
    }
    console.error("제품 상세 불러오기 실패:", error);
    return null;
  }
}
