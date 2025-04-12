import Image from "next/image";
import type { ProductDetail } from "@/types/productDetail";
import { fetchProductDetail } from "@/components/fetch/fetchProduct";
import ReviewClient from "@/components/ItemDetails/ReviewClient";

interface DetailPageProps {
  params: { id: string };
}

export default async function DetailPage({ params }: DetailPageProps) {
  const paramsInfo = await params;
  const productId = Number(paramsInfo.id);
  const product: ProductDetail | null = await fetchProductDetail(productId);

  if (!product) {
    return <p>제품 상세페이지를 불러오지 못했습니다.</p>;
  }

  return (
    <>
      <button className="w-[50px] text-custombg">
        <Image
          src={"/assets/icons/arrow_left.svg"}
          alt="뒤로"
          width={50}
          height={50}
        />
      </button>

      <section className="flex justify-between items-center gap-10 mb-20">
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

      <section className="w-full flex flex-col gap-10 mb-20">
        <div className="w-full flex justify-between items-center">
          <h1>제품 {productId}</h1>
        </div>
        <p>{product.generation}</p>
      </section>

      <ReviewClient productId={productId} reviews={product.reviews} />
    </>
  );
}
