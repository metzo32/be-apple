"use client";

import { useEffect, useState } from "react";
import { fetchUserProduct } from "../fetch/fetchUserProduct";
import type { Review } from "@/types/Review";
import type { GetProductResponse } from "@/types/product";
import ReviewCard from "./ReviewCard";
import WriteReview from "./WriteReview";

interface ReviewClientProps {
  productId: number; // params에서 가져온 제품 id
  reviews: Review[]; // fetchProductDetail 중 product의 review
}

export default function ReviewClient({
  productId,
  reviews,
}: ReviewClientProps) {
  const [isOpen, setIsOpen] = useState(false); // 리뷰 작성창 오픈 여부
  const [userProductsArr, setUserProductsArr] = useState<GetProductResponse[]>(
    []
  );

  // 유저 보유 목록 불러오기
  useEffect(() => {
    const getUserProduct = async () => {
      const userProducts = await fetchUserProduct();

      if (!userProducts) {
        console.log("보유목록 로드 중 문제가 발생했습니다.");
      } else {
        setUserProductsArr(userProducts);
        console.log("리뷰에서 확인하는 보유목록", userProductsArr)
      }
    };
    getUserProduct();
  }, []);

  // 리뷰 작성하기 클릭한 경우
  const handleWriteReview = () => {
    // if (reviews.userId) // TODO 해당 제품 보유했는지 체크, 이미 리뷰를 작성했는지 체크

    setIsOpen(true);
  };

  return (
    <section className="w-full flex flex-col gap-10 mb-20 ">
      <h1>리뷰</h1>
      <button
        onClick={handleWriteReview}
        className="w-[200px] bg-mid text-custombg p-2 hover:bg-textHover"
      >
        나도 리뷰 작성하기
      </button>

      {isOpen && (
        <WriteReview
          productId={productId}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-20">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
}
