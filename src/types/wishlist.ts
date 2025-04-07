import { GetProductResponse } from "./product";

// 위시리스트 추가
export interface CreateWishRequest {
  memo: string;
  productId: number;
}

//위시 리스트 요청 응답
export interface GetWishResponse {
  // Wish ID
  id: number;

  // WIsh 생성일
  createdAt: Date;

  // 사용자 메모s
  memo: string;

  // 상품ID
  productId: number;

  // 상품
  product: GetProductResponse;
}
