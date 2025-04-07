import { get } from "@/api/api";

export async function fetchUserProduct() {
  try {
    const response = await get("/user-product");
    const productInfo = response.data;

    return productInfo;

  } catch (error) {
    console.error("유저 보유 목록 불러오기 실패:", error);
    return null;
  }
}
