import { get, post, deleteCall, patch } from "@/api/api";
import { ProductCategoryEnum } from "@/types/productCategory";

// 상품 추천 생성 (상품 추천 시작) → 카테고리 응답
export async function createNewRecommend() {
  const response = await post(`/product-recommendation`, { force: "t" });

  return response.data.productRecommendationId;
}
// 작성 중 이탈 시 완료되지 않은 추천이 있다는 것을 보여주는게 force: "f",
// 그거 날리고 처음부터 하겠다 force "t"

// 1단계: 카테고리 선택 → 사용목적 리스트 응답
export async function postRecommend01(
  productRecommendationId: number,
  args: {
    step: "STEP_1";
    productCategory: ProductCategoryEnum;
  }
) {
  const { data } = await patch<{
    productRecommendationId: number;
    nextStep: "STEP_2";
    tags: string[];
  }>(`/product-recommendation/${productRecommendationId}`, args);

  console.log("1단계 데이터", data);
  return data;
}

// 2단계: 사용 목적 선택 → 최소최대가 응답
export async function postRecommend02(
  productRecommendationId: number,
  args: {
    step: "STEP_2";
    tags: string[]; 
  }
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

// 3단계: 최소최대가 선택 → 최소출시일 응답
export async function postRecommend03(
  productRecommendationId: number,
  args: {
    step: "STEP_3";
    minPrice: number;
    maxPrice: number;
  }
) {
  const { data } = await patch<{
    productRecommendationId: number;
    nextStep: "STEP_4";
    minReleasedDate: string | null;
  }>(`/product-recommendation/${productRecommendationId}`, args);

  console.log("3단계 데이터", data);
  return data;
}

// 4단계: 최소출시일 선택 - 스펙 리스트 응답
export async function postRecommend04(
  productRecommendationId: number,
  args: {
    step: "STEP_4";
    minReleasedDate: string | null;
  }
) {
  const { data } = await patch<{
    productRecommendationId: number;
    nextStep: "STEP_5";
    specs: { type: string; value: string }[];
  }>(`/product-recommendation/${productRecommendationId}`, args);

  console.log("4단계 데이터", data);
  return data;
}

// 5단계: 선택된 스펙 전송 - 완료 응답
export async function postRecommend05(
  productRecommendationId: number,
  args: {
    step: "STEP_5";
    specs: { type: string; value: string }[];
  }
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
