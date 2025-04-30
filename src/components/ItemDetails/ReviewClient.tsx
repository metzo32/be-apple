"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/useUserStore";
import type { ProductDetail } from "@/types/productDetail";
import type { Review } from "@/types/Review";
import { fetchUserProduct } from "../fetch/fetchUserProduct";
import ReviewCard from "./ReviewCard";
import WriteReview from "./WriteReview";
import { fetchProductDetail } from "../fetch/fetchProduct";
import { CreateUserProductReqDto } from "@/types/userProduct";
import { Button } from "@mui/material";
import ButtonStrong from "../designs/ButtonStrong";
import ButtonBasic from "../designs/ButtonBasic";
import Link from "next/link";

interface ReviewClientProps {
  product: ProductDetail;
  productId: number | null; // params에서 가져온 제품 id
}

interface fetchedDataProps {
  userProductArr: CreateUserProductReqDto[] | [];
  productDetailData: ProductDetail | null;
}

export default function ReviewClient({
  product,
  productId, // 이 페이지의 프로덕트id
}: ReviewClientProps) {
  const { user } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isWritten, setIsWritten] = useState<boolean>(false);
  const [myProduct, setMyProduct] = useState<number | null>(null);
  const [reviewsArr, setReviewsArr] = useState<Review[]>(product.reviews); // 리렌더링을 위해 리뷰배열 상태 관리

  const [fetchedDataArr, setFetchedDataArr] = useState<fetchedDataProps>({
    userProductArr: [],
    productDetailData: null,
  });

  useEffect(() => {
    const getData = async () => {
      if (!productId) return;

      try {
        const [userProducts, productsDetail] = await Promise.all([
          fetchUserProduct(), // 유저 보유목록 가져오기
          fetchProductDetail(productId), // 현재 페이지의 제품 id
        ]);

        if (!userProducts) {
          console.error("보유목록 불러오기 실패");
          return;
        }

        if (!productsDetail) {
          console.error("상세목록 불러오기 실패");
          return;
        }

        console.log("유저 보유 목록:", userProducts);
        console.log("이 페이지의 제품 상세 정보:", productsDetail);

        setFetchedDataArr((prev) => ({
          ...prev,
          userProductArr: userProducts,
          productDetailData: productsDetail,
        }));

        // userProduct를 순회하여 어떤 요소의 product 객체의 id가 productsDetail.id 와 일치하는지 추적
        const productUserHave = userProducts.find(
          //TODO
          (userProduct: any) => userProduct.product.id === productsDetail.id
        );

        setMyProduct(productUserHave.id);

        // 이미 리뷰를 썼는지 여부
        const hasWrittenReview = product.reviews.find(
          (review) => review.userId.toString() === user?.id.toString()
        );

        if (!hasWrittenReview) {
          setIsWritten(false);
        } else if (hasWrittenReview && hasWrittenReview.content === undefined) {
          setIsWritten(false);
        } else {
          setIsWritten(true);
        }
      } catch (error) {
        console.error("데이터 가져오기 실패", error);
      }
    };

    getData();
  }, [product.reviews, productId, user?.id]);

  const handleWriteReview = () => {
    if (isWritten) return;
    setIsOpen(true);
  };

  // 리뷰 삭제
  const deleteReviewFromList = (reviewId: number) => {
    setReviewsArr((prev) => prev.filter((review) => review.id !== reviewId));
  };

  return (
    <section className="w-full flex flex-col gap-10 mb-20 bg-white  shadow-strong rounded-2xl p-10 overflow-hidden">
      <div className="flex items-end gap-5">
        <h1 className="text-2xl">구매자들의 리뷰</h1>
        <h2 className="text-base text-light">
          총 {product.reviews.length}명의 후기
        </h2>
      </div>

      {myProduct ? (
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

      {isOpen && (
        <WriteReview
          myProduct={myProduct}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10">
        {product.reviews.length === 0 ? (
          <div className="h-[300px]">
            <p>등록된 리뷰가 없습니다.</p>
          </div>
        ) : (
          product.reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onDelete={deleteReviewFromList}
            />
          ))
        )}
      </div>
    </section>
  );
}
