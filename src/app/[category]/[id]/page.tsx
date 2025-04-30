import Image from "next/image";
import type {
  ProductDetail,
  ProductDetailIpad,
  ProductDetailIphone,
  ProductDetailMac,
} from "@/types/productDetail";
import { fetchProductDetail } from "@/components/fetch/fetchProduct";
import ReviewClient from "@/components/ItemDetails/ReviewClient";
import Link from "next/link";
import { ProductCategoryEnum } from "@/types/productCategory";

// 타입가드
const isMacProduct = (product: ProductDetail): product is ProductDetailMac => {
  return product.category === ProductCategoryEnum.MAC;
};

const isIpadProduct = (
  product: ProductDetail
): product is ProductDetailIpad => {
  return product.category === ProductCategoryEnum.IPAD;
};

const isIphoneProduct = (
  product: ProductDetail
): product is ProductDetailIphone => {
  return product.category === ProductCategoryEnum.IPHONE;
};

interface DetailPageProps {
  params: { id: string; category: string };
}

export default async function DetailPage({ params }: DetailPageProps) {
  const paramsInfo = params;
  const productId = Number(paramsInfo.id);
  const product: ProductDetail | null = await fetchProductDetail(productId);
  
  console.log("서버에서의 프로덕트", product)

  if (!product) {
    return <p>제품 상세페이지를 불러오지 못했습니다.</p>;
  }

  // TODO 제품 별 타입가드
  if (isMacProduct(product)) {
    return (
      <>
        <Link href={`/${params.category}`} className="w-[50px] text-custombg">
          <Image
            src={"/assets/icons/arrow_left.svg"}
            alt="뒤로"
            width={50}
            height={50}
          />
        </Link>

        <section className="flex justify-between items-center gap-10 mb-48">
          <h2>{product.name}</h2>
          <span className="w-[500px] h-[250px] relative">
            <Image
              src={"/assets/images/fallback.png"}
              alt="제품 이미지"
              fill
              className="object-cover"
            />
          </span>
        </section>

        <section className="w-full flex flex-col gap-10 mb-28 bg-white rounded-2xl p-10 overflow-hidden shadow-strong">
          <div className="w-full flex gap-5 items-end">
            <h1>{product.name}</h1>
            <p className="text-sm text-light">{product.releasedDate}</p>
          </div>
          <div className="flex flex-col gap-3">
            <p>세대: {product.generation}</p>
            <p>무게: {product.weight}</p>
            <div className="flex gap-5">
              {product.colors.map((color) => (
                <div
                  key={color.name}
                  className="flex flex-col justify-center items-center gap-2"
                >
                  <p>{color.name}</p>
                  <div
                    className="w-[10px] h-[10px]"
                    style={{ backgroundColor: color.code }}
                  />
                </div>
              ))}
            </div>
            <p>디스플레이 가로: {product.displaySize}</p>

            <p>상품 스펙:</p>
            {product.specs.map((spec, index) => (
              <p key={index}>
                타입:{spec.type} 밸류:{spec.value}
              </p>
            ))}
            <p>구매 여부 {product.isPurchased}</p>
            <p>유저 프로덕트 id {product.userProductId}</p>

            {product.options.map((option) => (
              <div key={option.id}>
                <p>차액 : {option.additionalPrice}</p>
                <p>gpu : {option.gpu}</p>
                <p>ram : {option.ram}</p>
                <p>storage : {option.storage}</p>
                <p>processor : {option.processor}</p>
          
              </div>
            ))}
          </div>
        </section>

        <ReviewClient product={product} productId={productId} />
      </>
    );

    //TODO 나머지 타입가드별 리턴문 작성할 것
  }
}
