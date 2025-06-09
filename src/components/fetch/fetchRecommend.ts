import { get, post, deleteCall, patch } from "@/api/api";
import { ProductCategoryEnum } from "@/types/productCategory";

// 상품 추천 생성 (상품 추천 시작)
// TODO 임시로 "t" 설정해둔 것 수정하기
export async function createNewRecommend() {
  const response = await post(`/product-recommendation`, { force: "t" });

  return response.data.productRecommendationId;
}
// 작성 중 이탈 시 완료되지 않은 추천이 있다는 것을 보여주는게 force: "f",
// 그거 날리고 처음부터 하겠다 force "t"

// 단계별 요청
export async function postRecommend01(
  productRecommendationId: number,
  args: { step: "STEP_1"; productCategory: ProductCategoryEnum }
) {
  const { data } = await patch<{
    productRecommendationId: number;
    nextStep: "STEP_2";
    tags: string[]; // 관련된 태그들을 미리 보내줍니다 10개
  }>(`/product-recommendation/${productRecommendationId}`, args);
  console.log("1단계 데이터", data);
  return data;
}

export async function postRecommend02(
  productRecommendationId: number,
  args: { step: "STEP_2"; tags?: string[] }
) {
  const { data } = await patch<{
    productRecommendationId: number;
    nextStep: "STEP_3";
    minPrice: number;
    maxPrice: number;
  }>(`/product-recommendation/${productRecommendationId}`, args);
  console.log("2단계 데이터", data);
  return data;
}

export async function postRecommend03(
  productRecommendationId: number,
  args: { step: "STEP_3"; minPrice?: number; maxPrice?: number }
) {
  const { data } = await patch<{
    productRecommendationId: number;
    nextStep: "STEP_4";
    minReleasedDate: string | null;
  }>(`/product-recommendation/${productRecommendationId}`, args);
  console.log("3단계 데이터", data);
  return data;
}

export async function postRecommend04(
  productRecommendationId: number,
  args: { step: "STEP_4"; minReleasedDate: string | null}
) {
  const { data } = await patch<{
    productRecommendationId: number;
    nextStep: "STEP_5";
    specs: { type: string; value: string }[];
  }>(`/product-recommendation/${productRecommendationId}`, args);
  console.log("4단계 데이터", data);
  return data;
}

// 사용하지 않음
export async function postRecommend05(
  productRecommendationId: number,
  args: { step: "STEP_5"; specs?: { type: string; value: string }[] }
) {
  const { data } = await patch<{
    productRecommendationId: number;
    nextStep: null;
  }>(`/product-recommendation/${productRecommendationId}`, args);
  console.log("5단계 데이터", data);
  return data;
}

// 추천 완료
export async function postRecommendComplete(productRecommendationId: number) {
  return post(
    `product-recommendation/${productRecommendationId}/complete`,
    null
  );
}

// 추천 목록 받아오기
export async function getRecommendDetailItem(recommendId: number) {
  const response = await get(`/product-recommendation/${recommendId}`);
  console.log("추천된 목록", response.data);
  return response.data;
}
