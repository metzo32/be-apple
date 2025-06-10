import Image from "next/image";
import Link from "next/link";
import { getProductDetail } from "@/components/fetch/fetchProduct";
import ReviewClient from "@/components/ItemDetails/ReviewClient";
import { ProductDetail } from "@/types/productDetail";
import { isMacProduct } from "@/types/productTypeGurards";
import ButtonStrong from "@/components/designs/ButtonStrong";
import { GoArrowLeft } from "react-icons/go";

interface DetailPageProps {
  params: { id: string; category: string };
}

export default async function DetailPage({ params }: DetailPageProps) {
  const productId = Number(params.id);
  const product: ProductDetail | null = await getProductDetail(productId);

  console.log("서버에서의 프로덕트", product);

  if (!product) {
    return <p>제품 상세 페이지를 불러오지 못했습니다.</p>;
  }
  // TODO 서버 컴포넌트라서 현재 보유여부 & 위시여부 가져오지 못하고 있다. 한번 더 페칭하는 방법 생각해보자.

  if (isMacProduct(product)) {
    return (
      <>
        <div className="w-[100vw] -ml-5 md:-ml-20 xl:-ml-50 2xl:-ml-72">
          <Link
            href={`/${params.category}`}
            className="inline-flex items-center justify-center w-[50px] h-[50px] ml-5 md:ml-20"
          >
            <GoArrowLeft className="text-lg md:text-2xl text-mid hover:text-textHover" />
          </Link>

          <section className="global-px py-12 md:py-24 relative bg-bglight grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-16">
            <span className="block w-full aspect-[1.726] relative">
              <Image
                src={"/assets/images/macbook_m3_air_example.png"}
                alt="제품 이미지"
                fill
                className="object-cover"
              />
            </span>
            <div className="relative h-full flex flex-col gap-5 md:gap-7">
              <h2 className="text-xl md:text-3xl font-bold">{product.name}</h2>
              <p className="text-sm md:text-base">₩{product.price.toLocaleString()} 부터~</p>

              <div className="flex justify-between gap-5 bg-white p-5 rounded-lg shadow-light w-fit max-w-full">
                {product.colors.map((color) => (
                  <div
                    key={color.name}
                    className="w-auto flex flex-col justify-center items-center gap-2"
                  >
                    <p className="text-xs md:text-sm">{color.name}</p>
                    <div
                      className="w-[10px] h-[10px]"
                      style={{ backgroundColor: color.code }}
                    />
                  </div>
                ))}
              </div>

              {/* TODO 이미 위시에 추가되었는지 확인 */}
              <ButtonStrong text="위시리스트에 추가" type="button" />
            </div>
          </section>
        </div>

        <section className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-10 place-items-center py-12 md:py-36">
          {product.options.map((option, index) => (
            <div
              key={option.id}
              className="w-[150px] h-[225px] md:w-[200px] md:h-[300px] p-3 md:p-5 bg-white shadow-strong flex flex-col gap-1 md:gap-3"
            >
              <h5 className="text-lg md:text-2xl font-bold">
                옵션 {index + 1}
              </h5>
              <p className="text-xs md:text-sm">CPU {option.cpu}</p>
              <p className="text-xs md:text-sm">GPU {option.gpu}</p>
              <p className="text-xs md:text-sm">Processor {option.processor}</p>
              <p className="text-xs md:text-sm">RAM {option.ram}</p>
              <p className="text-xs md:text-sm">Storage {option.storage}</p>
            </div>
          ))}
        </section>

        {/* 
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
        </section> */}

        <div className="w-[100vw] -ml-5 md:-ml-20 xl:-ml-50 2xl:-ml-72">
          <ReviewClient product={product} productId={productId} />
        </div>
      </>
    );

    //TODO 나머지 타입가드별 리턴문 작성할 것
  }
}
