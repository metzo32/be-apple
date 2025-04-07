import { Review } from "./Review";
import { ProductCategoryEnum } from "./productCategory";


export interface ProductDetailMac {
  // Product ID
  id: number;

  // 상품명
  name: string;

  // 상품 카테고리
  category: ProductCategoryEnum.MAC;

  // 세대 Ex) 1
  generation: string;

  // 출시일
  releasedDate: string;

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

  // 상품 리뷰 목록
  reviews: Review[]; // 여기까지 공통@@@@@@

  // 디스플레이 사이즈 ex) 15inch
  displaySize: string | null;

  // 디스플레이 가로 픽셀 ex) 1920px
  displayHorizontalPixel: string | null;

  // 디스플레이 세로 픽셀 ex) 1080px
  displayVerticalPixel: string | null;

  // 디스플레이 밝기 ex) 500nit
  displayBrightness: string | null;

  // 상품 스펙 목록
  specs: { type: string; value: string }[];

  // 옵션 목록
  options: MacOption[];

  // 상품 1개 조회할 때는 항상 null로 옵니다
  myOption: MacOption | null;
}

export interface MacOption {
  // 상품옵션ID (ProductOptionId)
  id: number;
  // 추가금액
  additionalPrice: number;
  // 옵션 스펙 목록
  optionSpecs: { type: string; value: string }[];
  // CPU ex) 10core
  cpu: string;
  // GPU ex) 10core
  gpu: string;
  // RAM ex) 16GB
  ram: string;
  // 저장장치 ex) 512GB
  storage: string;
  // 프로세서 ex) M1
  processor: string;
}

export interface ProductDetailIpad {
  // Product ID
  id: number;

  // 상품명
  name: string;

  // 상품 카테고리
  category: ProductCategoryEnum.IPAD;

  // 세대 Ex) 1
  generation: string;

  // 출시일
  releasedDate: string;

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

  // 상품 리뷰 목록
  reviews: Review[];

  // 프로세서 ex) A17
  processor: string | null;

  // 네트워크 ex) WiFi, WiFi + Cellular
  network: string | null;

  // 디스플레이 사이즈 ex) 15inch
  displaySize: string | null;

  // 디스플레이 가로 픽셀 ex) 1920px
  displayHorizontalPixel: string | null;

  // 디스플레이 세로 픽셀 ex) 1080px
  displayVerticalPixel: string | null;

  // 디스플레이 밝기 ex) 500nit
  displayBrightness: string | null;

  // 상품 스펙 목록
  specs: { type: string; value: string }[];

  // 옵션 목록
  options: IpadOption[];

  // 상품 1개 조회할 때는 항상 null로 옵니다
  myOption: IpadOption | null;
}

interface IpadOption {
  // 상품옵션ID (ProductOptionId)
  id: number;
  // 추가금액
  additionalPrice: number;
  // 옵션 스펙 목록
  optionSpecs: { type: string; value: string }[];
  // 용량
  storage: string;
}

export interface ProductDetailIphone {
  // Product ID
  id: number;

  // 상품명
  name: string;

  // 상품 카테고리
  category: ProductCategoryEnum.IPHONE;

  // 세대 Ex) 1
  generation: string;

  // 출시일
  releasedDate: string;

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

  // 상품 리뷰 목록
  reviews: Review[];

  // 프로세서 ex) A17
  processor: string | null;

  // 네트워크 ex) WiFi, WiFi + Cellular
  network: string | null;

  // 디스플레이 사이즈 ex) 15inch
  displaySize: string | null;

  // 디스플레이 가로 픽셀 ex) 1920px
  displayHorizontalPixel: string | null;

  // 디스플레이 세로 픽셀 ex) 1080px
  displayVerticalPixel: string | null;

  // 디스플레이 밝기 ex) 500nit
  displayBrightness: string | null;

  // 상품 스펙 목록
  specs: { type: string; value: string }[];

  // 옵션 목록
  options: IphoneOption[];

  // 상품 1개 조회할 때는 항상 null로 옵니다
  myOption: IphoneOption | null;
}

interface IphoneOption {
  // 상품옵션ID (ProductOptionId)
  id: number;
  // 추가금액
  additionalPrice: number;
  // 옵션 스펙 목록
  optionSpecs: { type: string; value: string }[];

  // 용량
  storage: string;
}

export type ProductDetail =
  | ProductDetailMac
  | ProductDetailIpad
  | ProductDetailIphone;
