import type { ProductDetail } from "./productDetail";
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
// export interface UpdateUserProductReqDto {
//   productId: number;
//   productOptionId: number;
//   purchasedAt: string;
//   purchasePrice: number;
//   soldAt: string;
//   status: string;
//   repurchasedCount: number;
//   condition: string;
//   memo: string;
// }

export enum UserProductStatus {
  /**
   * 사용 중
   */
  ACTIVE = "ACTIVE",
  /**
   * 미사용 중
   */
  INACTIVE = "INACTIVE",
  /**
   * 판매(처분)
   */
  SOLD = "SOLD",
}

export const UserProductStatusLabels = {
  [UserProductStatus.ACTIVE]: "현재 사용 중이예요.",
  [UserProductStatus.INACTIVE]: "가지고 있지만 사용하지 않고 있어요.",
  [UserProductStatus.SOLD]: "처분하거나 양도했어요.",
};

export enum UserProductCondition {
  /**
   * 새것
   */
  NEW = "NEW",
  /**
   * 좋음
   */
  GOOD = "GOOD",
  /**
   * 보통
   */
  FAIR = "FAIR",
  /**
   * 미흡
   */
  POOR = "POOR",
  /**
   * 손상
   */
  DAMAGED = "DAMAGED",
}

export const UserProductConditionLables = {
  [UserProductCondition.NEW]: "새것과 같아요",
  [UserProductCondition.GOOD]: "괜찮아요",
  [UserProductCondition.FAIR]: "보통이예요",
  [UserProductCondition.POOR]: "조금 낡았어요",
  [UserProductCondition.DAMAGED]: "고장났어요",
};

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
