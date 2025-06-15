"use client";

import Link from "next/link";
import { useState } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { useProductDetailQuery } from "@/hooks/useProductDetailQuery";
import type { ProductDetail } from "@/types/productDetail";
import ReviewCard from "./ReviewCard";
import WriteReview from "./WriteReview";
import ButtonStrong, { ButtonDisabled } from "../designs/ButtonStrong";
import { ButtonBasic } from "../designs/ButtonBasic";
import { BsStarFill, BsStar, BsStarHalf } from "react-icons/bs";

interface ReviewClientProps {
  product: ProductDetail;
  productId: number; // params에서 가져온 제품 id
}

export default function ReviewClient({
  product,
  productId, // 이 페이지의 프로덕트id
}: ReviewClientProps) {
  const { user } = useUserStore();
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);

  const { data: productDetail } = useProductDetailQuery(productId);
  const userProductId = productDetail?.userProductId ?? null;

  const reviews = productDetail?.reviews; // 리뷰 배열
  const sortedReviews = reviews?.slice().sort((a, b) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  if (!reviews) return [];

  const writtenReview = reviews.filter((review) => review.userId === user?.id); // 내가 쓴 리뷰 객체

  const totalRatings =
    reviews?.reduce((sum, review) => sum + review.rating, 0) ?? 0;
  const averageRatings =
    reviews && reviews.length > 0
      ? (totalRatings / reviews.length).toFixed(1)
      : "0.0";

  const num = Number(averageRatings);
  const naturalNum = Math.floor(num); // 정수 부분
  const hasHalf = num - naturalNum >= 0.5; // 반개 조건
  const emptyCount = 5 - naturalNum - (hasHalf ? 1 : 0); // 빈 별 개수

  const fullStars = Array.from({ length: naturalNum }, (_, i) => (
    <BsStarFill key={`full-${i}`} className="text-primary" />
  ));

  const halfStar = hasHalf ? (
    <BsStarHalf key="half" className="text-primary" />
  ) : null;

  const emptyStars = Array.from({ length: emptyCount }, (_, i) => (
    <BsStar key={`empty-${i}`} className="text-primary" />
  ));

  const handleOpenWriteReview = () => {
    setIsWriteReviewOpen(true);
  };

  return (
    <section className="w-full flex flex-col gap-3 md:gap-5 bg-white global-px py-36 overflow-hidden">
      <span className="thick-line" />
      <div className="flex items-end gap-5">
        <h1 className="text-lg md:text-2xl">리뷰 및 평점</h1>
        <h2 className="text-sm md:text-base text-light">
          총 {product.reviews.length}명의 후기
        </h2>
      </div>

      {/* 리뷰 평균 */}
      <div className="flex gap-3 items-center">
        <p className="text-2xl md:text-4xl">{averageRatings}</p>
        <div className="flex items-center gap-[1px]">
          {reviews && reviews.length > 0 ? (
            <>
              {fullStars}
              {halfStar}
              {emptyStars}
            </>
          ) : (
            Array.from({ length: 5 }, (_, i) => (
              <BsStar key={`empty-review-${i}`} className="text-primary" />
            ))
          )}
        </div>
      </div>

      {userProductId ? (
        <span className="w-[200px]">
          {writtenReview.length > 0 ? (
            <ButtonDisabled text="이미 리뷰를 작성했습니다" />
          ) : (
            <ButtonStrong
              text="나의 리뷰 작성하기"
              onClick={handleOpenWriteReview}
            />
          )}
        </span>
      ) : (
        <div className="flex items-center gap-3 md:gap-5">
          <ButtonDisabled
            text={
              !user ? "로그인 후 이용 가능합니다" : "보유하지 않은 상품입니다"
            }
          />

          {user && (
            <Link href={"/user"}>
              <ButtonBasic type="button" text="상품 등록하러 가기" />
            </Link>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-5 lg:gap-10">
        {product.reviews.length === 0 ? (
          <div className="h-[300px]">
            <p className="text-sm md:text-base mt-15">아직 등록된 리뷰가 없습니다.</p>
          </div>
        ) : (
          sortedReviews?.map((review) => (
            <ReviewCard key={review.id} review={review} productId={productId} />
          ))
        )}
      </div>

      {isWriteReviewOpen && (
        <WriteReview
          productId={productId}
          userProductId={userProductId}
          setIsOpen={setIsWriteReviewOpen}
        />
      )}
    </section>
  );
}
