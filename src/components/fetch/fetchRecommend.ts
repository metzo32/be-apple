import { get, post, deleteCall, patch } from "@/api/api";

// 상품 추천 생성 (상품 추천 시작)
export async function createNewRecommend() {
  try {
    const response = await post(`/product-recommendation`, { force: "f" });
    return true;
  } catch (error) {
    console.error("리뷰 생성 실패:", error);
    return false;
  }
}
