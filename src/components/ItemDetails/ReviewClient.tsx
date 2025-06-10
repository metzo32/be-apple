"use client";

import Link from "next/link";
import { useState } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { useProductDetailQuery } from "@/hooks/useProductDetailQuery";
import type { ProductDetail } from "@/types/productDetail";
import ReviewCard from "./ReviewCard";
import WriteReview from "./WriteReview";
import { Button } from "@mui/material";
import ButtonStrong from "../designs/ButtonStrong";
import { ButtonBasic } from "../designs/ButtonBasic";
import { FaStar } from "react-icons/fa6";

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

  const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0); // 총점
  let averageRatings = (totalRatings / reviews.length).toFixed(1).toString(); // 평균 평점

  if (reviews.length === 0) {
    averageRatings = "0.0";
  }

  const handleOpenWriteReview = () => {
    setIsWriteReviewOpen(true);
  };

  return (
    <section className="w-full flex flex-col gap-5 md:gap-10 bg-white global-px py-36 overflow-hidden">
      <div className="flex items-end gap-5">
        <h1 className="text-lg md:text-2xl">리뷰 및 평점</h1>
        <h2 className="text-sm md:text-base text-light">
          총 {product.reviews.length}명의 후기
        </h2>
      </div>

      <div className="flex gap-5 items-center">
        <p className="text-2xl md:text-4xl">{averageRatings}</p>
        <FaStar className="text-primary" />
      </div>

      {userProductId ? (
        <span className="w-[200px]">
          {writtenReview.length > 0 ? (
            <Button variant="contained" disabled>
              이미 리뷰를 작성했습니다
            </Button>
          ) : (
            <ButtonStrong
              text="나의 리뷰 작성하기"
              onClick={handleOpenWriteReview}
            />
          )}
        </span>
      ) : (
        <div className="flex items-center gap-3 md:gap-5">
          <Button variant="contained" disabled>
            {!user ? "로그인 후 이용 가능합니다" : "보유하지 않은 상품입니다"}
          </Button>

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
            <p className="text-sm md:text-base">아직 등록된 리뷰가 없습니다.</p>
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
