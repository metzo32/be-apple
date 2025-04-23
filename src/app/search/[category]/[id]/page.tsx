import Image from "next/image";
import type { ProductDetail } from "@/types/productDetail";
import { fetchProductDetail } from "@/components/fetch/fetchProduct";
import ReviewClient from "@/components/ItemDetails/ReviewClient";
import Link from "next/link";

interface DetailPageProps {
  params: { id: string; category: string };
}

export default async function DetailPage({ params }: DetailPageProps) {
  const paramsInfo = await params;
  const productId = Number(paramsInfo.id);
  const product: ProductDetail | null = await fetchProductDetail(productId);

  if (!product) {
    return <p>제품 상세페이지를 불러오지 못했습니다.</p>;
  }

  console.log("상세조회", product)

  return (
    <>
      <Link
        href={`/search/${params.category}`}
        className="w-[50px] text-custombg"
      >
        <Image
          src={"/assets/icons/arrow_left.svg"}
          alt="뒤로"
          width={50}
          height={50}
          // onClick={handlePrevPage}
        />
      </Link>

      <section className="flex justify-between items-center gap-10 mb-48">
        <h2>{product.name}</h2>
        <span className="w-[500px] h-[500px] relative">
          <Image
            src={"/assets/images/macbook01.png"}
            alt="제품 이미지"
            fill
            className="object-cover"
          />
        </span>
      </section>

      <section className="w-full flex flex-col gap-10 mb-48">
        <div className="w-full flex justify-between items-center">
          <h1>제품 {productId}</h1>
        </div>
        <div className="flex flex-col gap-3">
          <p>세대: {product.generation}</p>
          <p>출시일: {product.releasedDate}</p>
          <p>무게: {product.weight}</p>
          <div className="flex gap-5">
            <p>색상 옵션:</p>
            {product.colors.map((color) => (
              <p key={color.name}>
                {color.name} {color.code}
              </p>
            ))}
          </div>
          <p>디스플레이 가로: {product.displaySize}</p>
          <p>상품 스펙:</p>
          {product.specs.map((spec, index) => (
            <p key={index}>
              타입:{spec.type} 밸류:{spec.value}
            </p>
          ))}
        </div>
      </section>

      <ReviewClient product={product} productId={productId} />
    </>
  );
}
