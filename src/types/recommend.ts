import { ProductCategoryEnum } from "./productCategory";

export interface Product {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  generation: string;
  releasedDate: string;
  price: number;
  thickness: string;
  weight: string;
  width: string;
  height: string;
}

// 추천 POST 첫 요청
export interface CreateProductRecommendationReqDto {
  force: "f" | "t";
  //강제 생성 여부입니다. 기존에 생성된 상품 추천이 완료되지 않았어도 t를 입력할 경우 새로운 상품 추천을 생성합니다.
}

export interface GetProductRecommendationResDto {
  // ProductRecommendation ID
  id: number;
  // 상품추천 생성 일시
  createdAt: Date;
  // 수정일시
  updatedAt: Date;
  // 상품 추천 완료 여부
  isCompleted: boolean;
  // 카테고리
  category: ProductCategoryEnum | null;
  // 최소 가격
  minPrice: number | null;
  // 최대 가격
  maxPrice: number | null;
  // 최소 출시일
  minReleasedDate: string | null;
  // 태그 목록
  tags: string[];
  // 스펙 목록
  specs: { type: string; value: string }[];
  // 추천 상품 목록 (isCompleted가 false면 빈 배열입니다)
  // ex)
  // {
  //    id: 15,
  //    createdAt: '2025-03-23T02:33:35.924Z',
  //    updatedAt: '2025-03-23T02:33:35.924Z',
  //    name: '테스트맥상품',
  //    generation: '테스트세대',
  //    releasedDate: '1996-04-11',
  //    price: 1400000,
  //    thickness: '1.5cm',
  //    weight: '1.5kg',
  //    width: '33cm',
  //    height: '20cm',
  //  }[]
  products: Product[];
}[];
