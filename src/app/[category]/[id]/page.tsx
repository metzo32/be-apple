import Image from "next/image";
import { getProductDetail } from "@/components/fetch/fetchProduct";
import ReviewClient from "@/components/ItemDetails/ReviewClient";
import { ProductDetail } from "@/types/productDetail";
import { isMacProduct } from "@/types/productTypeGurards";
import DetailPageWishButton from "@/components/ItemDetails/DetailPageWishButton";

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

  return (
    <>
      <div className="w-[100vw] -ml-5 md:-ml-20 xl:-ml-50 2xl:-ml-72">
        <section className="global-px py-12 md:py-24 relative grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-16">
          <div className="w-full flex items-center justify-center">
            {product.photos && product.photos.length > 0 ? (
              <span className="w-1/2 lg:w-full aspect-[1.726] relative">
                <Image
                  src={product.photos[0]}
                  alt="제품 이미지"
                  fill
                  className="object-cover"
                />
              </span>
            ) : (
              <span className="w-1/2 lg:w-full aspect-[1.726] bg-light" />
            )}
          </div>
          <div className="relative h-full flex flex-col gap-3 md:gap-7">
            <span className="thick-line mt-0" />
            <div className="flex items-center gap-3 md:justify-between">
              <h2 className="text-xl md:text-3xl font-bold">{product.name}</h2>
              <DetailPageWishButton productId={product.id} />
            </div>
            <p className="text-sm md:text-lg font-bold">
              {product.price.toLocaleString()}원{" "}
              <span className="font-medium text-mid text-sm">부터~</span>
            </p>

            <div className="flex gap-3 md:gap-5 p-3 md:p-5 w-full bg-bglight">
              {product.colors.map((color) => (
                <div
                  key={color.name}
                  className="w-auto flex flex-col justify-self-center items-center gap-2"
                >
                  <p className="text-[10px] md:text-sm">{color.name}</p>
                  <div
                    className="w-[10px] h-[10px]"
                    style={{ backgroundColor: color.code }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className="flex flex-col gap-3 md:gap-7">
        <span className="thick-line" />
        <h1 className="text-lg md:text-2xl">공통 옵션</h1>

        <div className="flex flex-col gap-3 md:gap-5 mb-10">
          <p>{product.generation}세대</p>
          <p>
            {product.width} * {product.height} * {product.thickness}
          </p>
          <p>{product.weight}</p>
          <p>
            해상도 {product.displayHorizontalPixel} *{" "}
            {product.displayVerticalPixel}
          </p>
          <p>화면 밝기 {product.displayBrightness}</p>
        </div>

        {/* TODO 맥 외 다른 프로덕트 옵션 추가 */}
        {isMacProduct(product) && (
          <div className="flex flex-col items-center md:grid md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10">
            {product.options
              .sort(
                (a, b) =>
                  product.price +
                  a.additionalPrice -
                  (product.price + b.additionalPrice)
              )
              .map((option) => (
                <div
                  key={option.id}
                  className="w-[150px] md:w-[200px] flex flex-col gap-1 md:gap-3"
                >
                  <span className="relative w-[150px] md:w-[200px] h-[150px] md:h-[200px]">
                    <Image
                      src={product.photos[0]}
                      alt="제품 이미지"
                      fill
                      className="object-contain"
                    />
                  </span>
                  <div className="flex flex-col items-center gap-1 md:gap-3">
                    <p className="text-lg md:text-xl font-bold">
                      저장공간 {option.storage}
                    </p>
                    <p className="text-xs md:text-sm">CPU {option.cpu}</p>
                    <p className="text-xs md:text-sm">GPU {option.gpu}</p>
                    <p className="text-xs md:text-sm">
                      Processor {option.processor}
                    </p>
                    <p className="text-xs md:text-sm">RAM {option.ram}</p>
                    <p className="text-lg md:text-xl font-bold">
                      {(
                        product.price + option.additionalPrice
                      ).toLocaleString()}
                      원
                    </p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </section>

      <div className="w-[100vw] -ml-5 md:-ml-20 xl:-ml-50 2xl:-ml-72">
        <ReviewClient product={product} productId={productId} />
      </div>
    </>
  );
}
