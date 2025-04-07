import type { ProductDetail } from "./product";
import type { Review } from "./Review";

// 유저 프로덕트 생성 요청 타입
export interface CreateUserProductReqDto {
  productId: number;
  productOptionId: number;
  purchasedAt: string;
  purchasePrice: number;
  soldAt: string;
  status: string;
  repurchasedCount: number;
  condition: string;
  memo: string;
}

// 유저 프로덕트 수정 요청 타입
export interface UpdateUserProductReqDto {
  productId: number;
  productOptionId: number;
  purchasedAt: string;
  purchasePrice: number;
  soldAt: string;
  status: string;
  repurchasedCount: number;
  condition: string;
  memo: string;
}

export enum UserProductStatus {
  /**
   * 사용 중
   */
  ACTIVE = 'ACTIVE',
  /**
   * 미사용 중
   */
  INACTIVE = 'INACTIVE',
  /**
   * 판매(처분)
   */
  SOLD = 'SOLD',
}

export enum UserProductCondition {
  /**
   * 새것
   */
  NEW = 'NEW',
  /**
   * 좋음
   */
  GOOD = 'GOOD',
  /**
   * 보통
   */
  FAIR = 'FAIR',
  /**
   * 미흡
   */
  POOR = 'POOR',
  /**
   * 손상
   */
  DAMAGED = 'DAMAGED',
}

// 유저 프로덕트 조회 응답 타입
export interface GetUserProductResponse {
  id: number;

  purchasedAt: string | null;

  purchasePrice: number | null;

  soldAt: string | null;

  status: UserProductStatus;

  repurchasedCount: number;

  condition: UserProductCondition;

  memo: string | null;

  product: ProductDetail;

  reviews: Review[];
}
 