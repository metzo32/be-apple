import { get, post, deleteCall, patch } from "@/api/api";
import { ProductCategoryEnum } from "@/types/productCategory";

// 상품 추천 목록 조회

// 상품 추천 생성 (상품 추천 시작)
// TODO 임시로 "t" 설정해둔 것 수정하기
export async function createNewRecommend() {
  const response = await post(`/product-recommendation`, { force: "t" });
}
// 작성 중 이탈 시 완료되지 않은 추천이 있다는 것을 보여주는게 force: "f",
// 그거 날리고 처음부터 하겠다 force "t"

export async function editRecommend01(
  productId: number,
  args: { step: "STEP_1"; productCategory: ProductCategoryEnum }
) {
  const { data } = await patch<{
    productRecommendationId: number;
    nextStep: "STEP_2";
    tags: string[]; // 관련된 태그들을 미리 보내줍니다 10개
  }>(`/product-recommendation/${productId}`, args);
  return true;
}

export async function editRecommend02(
  productId: number,
  args: { step: "STEP_2"; tags?: string[] }
) {
  const { data } = await patch<{
    productRecommendationId: number;
    nextStep: "STEP_3";
    minPrice: number;
    maxPrice: number;
  }>(`/product-recommendation/${productId}`, args);
  return true;
}

export async function editRecommend03(
  productId: number,
  arg: { step: "STEP_3"; minPrice?: number; maxPrice?: number }
) {
  const { data } = await patch<{
    productRecommendationId: number;
    nextStep: "STEP_4";
    minReleasedDate: string | null;
  }>(`/product-recommendation/${productId}`, arg);

  return true;
}

export async function editRecommend04(
  productId: number,
  args: { step: "STEP_4"; minReleasedDate?: string }
) {
  const { data } = await patch<{
    productRecommendationId: number;
    nextStep: "STEP_5";
    specs: { type: string; value: string }[];
  }>(`/product-recommendation/${productId}`, args);
  return true;
}

export async function editRecommend05(
  productId: number,
  args: { step: "STEP_5"; specs?: { type: string; value: string }[] }
) {
  const { data } = await patch<{
    productRecommendationId: number;
    nextStep: null;
  }>(`/product-recommendation/${productId}`, args);
  return true;
}
