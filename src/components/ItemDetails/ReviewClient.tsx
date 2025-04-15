"use client";

import { useEffect, useState } from "react";
import { fetchUserProduct } from "../fetch/fetchUserProduct";
import { useUserStore } from "@/stores/useUserStore";
import ReviewCard from "./ReviewCard";
import WriteReview from "./WriteReview";
import { ProductDetail } from "@/types/productDetail";

interface ReviewClientProps {
  product: ProductDetail;
  productId: number; // params에서 가져온 제품 id
}

export default function ReviewClient({
  product,
  productId,
}: ReviewClientProps) {
  const { user } = useUserStore();
  const [isOpen, setIsOpen] = useState(false); // 리뷰 작성창 오픈 여부
  const [isYours, setIsYours] = useState(product.isPurchased); // 보유목록에 있는지 여부
  const [isAlreadyWritten, setIsAlreadyWritten] = useState<boolean | null>(
    null
  ); // 이미 리뷰를 쓴 제품인지 여부

  useEffect(() => {
    // 유저 보유 목록 불러오기
    const getUserProduct = async () => {
      const userProducts = await fetchUserProduct();

      if (!userProducts) {
        console.log("보유목록 불러오기 실패");
      } else {
        // reviews[] 내에 현재 userId와 일치하는 항목 찾기
        console.log("보유 여부", isYours);
        console.log("리뷰 목록", product.reviews, "유저아이디", user?.id);

        const hasWritten = product.reviews.some(
          (review) => review.userId.toString() === user?.id.toString()
        );
        console.log("썼는지 여부", hasWritten);
        setIsAlreadyWritten(hasWritten);
      }
    };
    getUserProduct();
  }, [product.reviews, user?.id]);

  // 리뷰 작성하기 클릭한 경우
  const handleWriteReview = () => {
    if (isAlreadyWritten) return;
    setIsOpen(true);
  };

  return (
    <section className="w-full flex flex-col gap-10 mb-20">
      <h1>리뷰</h1>
      {isYours ? (
        <button
          onClick={handleWriteReview}
          className="w-[200px] bg-mid text-custombg p-2 hover:bg-textHover"
        >
          {isAlreadyWritten
            ? "이미 리뷰를 작성했습니다."
            : "나도 리뷰 작성하기"}
        </button>
      ) : (
        <div className="flex items-center gap-5">
          <button className="w-[200px] bg-light text-bglight p-2">
            보유하지 않은 상품
          </button>
          <button className="text-lg text-light hover:text-mid">
            상품 등록하러 가기
          </button>
        </div>
      )}

      {isOpen && (
        <WriteReview
          productId={productId}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-20">
        {product.reviews.length === 0 ? (
          <p>등록된 리뷰가 없습니다.</p>
        ) : (
          product.reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        )}
      </div>
    </section>
  );
}
