
// 프로덕트 리스트 호출 응답
export interface GetProductResponse {
  // Product ID
id: number;

// 상품명
name: string;

// 상품 카테고리
category: string;

// 세대 Ex) 1
generation: string;

// 출시일
releasedDate: string;

// 리뷰 수 
reviewCount: number;

// 상품 기본가격
price: number;

// 두께
thickness: string;

// 무게
weight: string;

// 너비
width: string;

// 높이
height: string;

// 색상 목록
colors: { name: string; code: string }[];

// 상품 사진 목록
photos: string[];

// 상품 태그 목록
tags: string[];

// 보유 여부 (미로그인시 false)
isPurchased: boolean;

// 유저 보유 상품 ID (미로그인 또는 미보유시 null)
userProductId: number | null;

// 유저 위시리스트 포함 여부 (미로그인시 false)
isInWish: boolean;

// 유저 위시리스트 ID (위시에 없거나 미로그인시 null)
wishId: number | null;
}
