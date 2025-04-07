import { get } from "@/api/api";
import { isAxiosError } from "axios";

interface ProductCategory {
  category: string;
}
export async function fetchProduct({ category }: ProductCategory) {
  try {
    const response = await get(`/product?category=${category}`);

    const productInfo = response.data;

    return productInfo;
  } catch (error) {
    console.error("불러오기 실패:", error);
    return null;
  }
}

export async function fetchProductDetail(productId: number) {
  try {
    const response = await get(`/product/${productId}`);

    const productInfo = response.data;

    return productInfo;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data.message);
    }
    console.error("제품 상세 불러오기 실패:", error);
    return null;
  }
}
