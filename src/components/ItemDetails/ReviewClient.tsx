"use client";

import { useState } from "react";
import { useUserStore } from "@/stores/useUserStore";
import type { ProductDetail } from "@/types/productDetail";
import ReviewCard from "./ReviewCard";
import WriteReview from "./WriteReview";
import { Button } from "@mui/material";
import ButtonStrong from "../designs/ButtonStrong";
import ButtonBasic from "../designs/ButtonBasic";
import Link from "next/link";
import { useProductDetailQuery } from "@/hooks/useProductDetailQuery";

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

  const { data: productDetail } = useProductDetailQuery(productId)
  const userProductId = productDetail?.userProductId ?? null

  const handleWriteReview = () => {
    if (isWritten) return;
    setIsWriteReviewOpen(true);
  };

  const reviews = productDetail ? productDetail.reviews : product.reviews

  const isWritten = reviews.some(
    (review) => review.userId === user?.id
  );

  return (
    <section className="w-full flex flex-col gap-10 mb-20 bg-white  shadow-strong rounded-2xl p-10 overflow-hidden">
      <div className="flex items-end gap-5">
        <h1 className="text-2xl">구매자들의 리뷰</h1>
        <h2 className="text-base text-light">
          총 {product.reviews.length}명의 후기
        </h2>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10">
        {product.reviews.length === 0 ? (
          <div className="h-[300px]">
            <p>등록된 리뷰가 없습니다.</p>
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
