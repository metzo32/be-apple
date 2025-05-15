import Image from "next/image";
import Link from "next/link";
import { fetchProductDetail } from "@/components/fetch/fetchProduct";
import ReviewClient from "@/components/ItemDetails/ReviewClient";
import { ProductDetail } from "@/types/productDetail";
import { isMacProduct } from "@/types/productTypeGurards";
import ButtonStrong from "@/components/designs/ButtonStrong";
import { FaStar } from "react-icons/fa6";

interface DetailPageProps {
  params: { id: string; category: string };
}

export default async function DetailPage({ params }: DetailPageProps) {
  const paramsInfo = params;
  const productId = Number(paramsInfo.id);
  const product: ProductDetail | null = await fetchProductDetail(productId);

  console.log("서버에서의 프로덕트", product);

  if (!product) {
    return <p>제품 상세 페이지를 불러오지 못했습니다.</p>;
  }
  // TODO 서버 컴포넌트라서 현재 보유여부 & 위시여부 가져오지 못하고 있다. 한번 더 페칭하는 방법 생각해보자.

  if (isMacProduct(product)) {
    return (
      <div className="w-[100vw] mb-24 -ml-5 md:-ml-20 xl:-ml-50 2xl:-ml-72">
        {/* <Link href={`/${params.category}`} className="w-[50px] text-custombg">
          <Image
            src={"/assets/icons/arrow_left.svg"}
            alt="뒤로"
            width={50}
            height={50}
          />
        </Link> */}

        <section className="global-px py-24 relative bg-bglight grid grid-cols-2 gap-16">
          <span className="block w-full aspect-[1.726] relative">
            <Image
              src={"/assets/images/macbook_m3_air_example.png"}
              alt="제품 이미지"
              fill
              className="object-cover"
            />
          </span>
          <div className="relative h-full flex flex-col gap-7">
            <h2 className="text-3xl font-bold">{product.name}</h2>
            <div className="flex items-center gap-5">
              <div className="flex gap-1 text-primary">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
            </div>

            <p>₩{product.price.toLocaleString()} 부터~</p>

            <div className="flex gap-5 bg-white p-5 rounded-lg shadow-light">
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

            {/* TODO 이미 위시에 추가되었는지 확인 */}
            <ButtonStrong text="위시리스트에 추가" type="button" />
          </div>
        </section>

        <section className="flex justify-center">
          <div className="w-[1000px] grid grid-cols-3 py-36 justify-center items-center">
            {product.options.map((option, index) => (
              <div
                key={option.id}
                className="w-[200px] h-[300px] p-5 rounded-xl bg-white shadow-strong flex flex-col gap-3"
              >
                <h5 className="text-2xl font-bold">옵션 {index + 1}</h5>
                <p>CPU {option.cpu}</p>
                <p>GPU {option.gpu}</p>
                <p>Processor {option.processor}</p>
                <p>RAM {option.ram}</p>
                <p>Storage {option.storage}</p>
              </div>
            ))}
          </div>
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

        <ReviewClient product={product} productId={productId} />
      </div>
    );

    //TODO 나머지 타입가드별 리턴문 작성할 것
  }
}
