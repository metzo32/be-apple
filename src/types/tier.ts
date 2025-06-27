export enum TierEnum {
  BRONZE = "Bronze",
  SILVER = "Silver",
  GOLD = "Gold",
  PLATINUM = "Platinum",
  GRANDMASTER = "GrandMaster",
}

export interface TierResponse {
  // 티어
  tier: TierEnum;
  // 총합 포인트
  totalPoint: number;
  // 얼마나 많은 기기를 구매했는지 (현재보유 3점, 과거보유 1점)
  productCountPoint: number;
  // 얼마나 많은 돈을 썼는지 (100만원당 1점)
  productPricePoint: number;
  // 얼마나 오래 사용했는지 (10년당 1점)
  purchasedYearPoint: number;
  // 현재 보유 기기 기준 얼마나 많은 카테고리(생태계)를 꾸리고 있는지 (카테고리 개수의 제곱)
  categoryPoint: number;
}
