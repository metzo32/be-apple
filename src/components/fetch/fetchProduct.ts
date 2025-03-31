import { get } from "@/api/api";

interface ProductCategory {
  category: string;
}
export async function fetchProduct({ category }: ProductCategory) {
  try {
    const response = await get(`/product?category=${category}`);
    console.log("제품목록 불러오기 성공:", response.data);

    const productInfo = response.data;

    return productInfo;
  } catch (error: any) {
    console.error("불러오기 실패:", error.response?.data || error.message);
    return null;
  }
}
