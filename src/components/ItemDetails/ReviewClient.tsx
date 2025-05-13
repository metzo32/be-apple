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
import ButtonBasic from "../designs/ButtonBasic";
import { FaStar } from "react-icons/fa6";

interface ReviewClientProps {
  product: ProductDetail;
  productId: number | null; // params에서 가져온 제품 id
}

export default function ReviewClient({
  product,
  productId, // 이 페이지의 프로덕트id
}: ReviewClientProps) {
  const { user } = useUserStore();
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);

  const { data: productDetail } = useProductDetailQuery(productId);
  const userProductId = productDetail?.userProductId ?? null;

  const handleWriteReview = () => {
    if (isWritten) return;
    setIsWriteReviewOpen(true);
  };

  const reviews = productDetail ? productDetail.reviews : product.reviews;

  const isWritten = reviews.some((review) => review.userId === user?.id);

  const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);

  let averageRatings = (totalRatings / reviews.length).toFixed(1).toString();

  if (reviews.length === 0) {
    averageRatings = "0.0"
  }

  return (
    <section className="w-full flex flex-col gap-10 bg-white global-px py-36 overflow-hidden">
      <div className="flex items-end gap-5">
        <h1 className="text-2xl">리뷰 및 평점</h1>
        <h2 className="text-base text-light">
          총 {product.reviews.length}명의 후기
        </h2>
      </div>

      <div className="flex gap-5 items-center">
        <p className="text-4xl">{averageRatings}</p>
        <FaStar className="text-primary" />
      </div>

      {userProductId ? (
        <span className="w-[200px]">
          {isWritten ? (
            <Button variant="contained" disabled>
              이미 리뷰를 작성했습니다
            </Button>
          ) : (
            <ButtonStrong
              text="나의 리뷰 작성하기"
              onClick={handleWriteReview}
            />
          )}
        </span>
      ) : (
        <div className="flex items-center gap-5">
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

      {isWriteReviewOpen && (
        <WriteReview
          userProductId={userProductId}
          isWriteReviewOpen={isWriteReviewOpen}
          setIsOpen={setIsWriteReviewOpen}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-5 lg:gap-10">
        {product.reviews.length === 0 ? (
          <div className="h-[300px]">
            <p>아직 등록된 리뷰가 없습니다.</p>
          </div>
        ) : (
          reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        )}
      </div>
    </section>
  );
}
