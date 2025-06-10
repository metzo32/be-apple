export enum ProductCategoryEnum {
  MAC = "Mac",
  IPAD = "iPad",
  IPHONE = "iPhone",
  WATCH = "Watch",
  AIRPODS = "AirPods",
}

export const ProductCategoryLabels = {
  [ProductCategoryEnum.MAC]: "맥",
  [ProductCategoryEnum.IPAD]: "아이패드",
  [ProductCategoryEnum.IPHONE]: "아이폰",
  [ProductCategoryEnum.WATCH]: "애플워치",
  [ProductCategoryEnum.AIRPODS]: "에어팟",
};

export interface ProductQueryString {
  // 상품 카테고리
  category: ProductCategoryEnum;
  // 태그
  tag?: string;
  // 상품명
  name?: string;
  // 최소가격
  minPrice?: number;
  // 최대가격
  maxPrice?: number;
  // 정렬 기준 (default: releasedDate)
  sortBy?: "releasedDate" | "price" | "reviewCount";
  // 정렬 순서 (default: desc)
  order?: "asc" | "desc";
}
