"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { ProductDetailMac, ReviewType } from "@/types/product";
import { fetchProductDetail } from "@/components/fetch/fetchProduct";
import Image from "next/image";
import Review from "@/components/ItemDetails/Review";
import WriteReview from "@/components/ItemDetails/WriteReview";
import LoadingScreen from "@/components/LoadingScreen";
import ButtonBasic from "@/components/designs/ButtonMild";

// 상품 상세 페이지
export default function DetailPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [productDetail, setProductDetail] = useState<ProductDetailMac | null>(
    null
  );
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const router = useRouter();
  const params = useParams();

  const productId = Number(params.id);

  //제품 상세 정보 불러오기
  useEffect(() => {
    const getProductDetail = async () => {
      try {
        const product = await fetchProductDetail(productId);
        if (product) {
          // 이 id에 대해
          setProductDetail(product);
          setReviews(product.reviews);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("제품 상세 불러오기 실패", error);
      }
    };
    getProductDetail();
  }, [productId]);

  const handleOpenComment = () => {
    setIsOpen(true);
  };

  const handleBack = () => {
    router.back();
  };

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <>
      <button
        type="button"
        onClick={handleBack}
        className="w-[50px] text-custombg"
      >
        <Image
          src={"/assets/icons/arrow_left.svg"}
          alt="뒤로"
          width={50}
          height={50}
        />
      </button>

      <section className="flex flex-col items-center gap-10 mb-20">
        <Image
          src={"/assets/images/fallback.png"}
          alt="제품 이미지"
          width={800}
          height={400}
        />
      </section>

      <section className="w-full flex flex-col gap-10 mb-20">
        <div className="w-full flex justify-between items-center">
          <h1>제품 {productId}</h1>
          <ButtonBasic text="이 제품을 위시리스트에 추가" />
        </div>
        <p>제품 {productId} 에 대한 설명</p>
      </section>

      <section className="w-full flex flex-col gap-10 mb-20">
        <h1>리뷰</h1>
        <button
          onClick={handleOpenComment}
          className="w-[200px] bg-mid text-custombg p-2 hover:bg-textHover"
        >
          나도 리뷰 작성하기
        </button>

        {/* 리뷰 작성 팝업 */}
        {isOpen && (
          <WriteReview
            productId={productId}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        )}

        {/* 리뷰 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-20">
          {reviews &&
            reviews.map((review) => <Review key={review.id} review={review} />)}
        </div>
      </section>
    </>
  );
}

// 최초에는 상품이 없고, 업데이트 되는것.
// productDetail 이 없는 경우 화면 따로
// productDetail 이 상태에 담기면 detail 화면 보여주기
