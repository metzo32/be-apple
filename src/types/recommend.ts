// 추천 POST 첫 요청
export interface CreateProductRecommendationReqDto {
  force: "f" | "t";
  //강제 생성 여부입니다. 기존에 생성된 상품 추천이 완료되지 않았어도 t를 입력할 경우 새로운 상품 추천을 생성합니다.
}

export interface GetProductRecommendationResDto {
  id: number;
  createdAt: string;
  updated: string;
  isCompleted: boolean;
  category: string;
  minPrice: number;
  maxPrice: number;
  minReleasedDate: string;
  tags: ["사무용", "영상 편집", "좌청룡"];
  specs: { type: string; value: string }[];
  products: { type: string; value: string }[];
}
