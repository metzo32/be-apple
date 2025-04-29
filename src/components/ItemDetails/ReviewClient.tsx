"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/useUserStore";
import type { ProductDetail } from "@/types/productDetail";
import { fetchUserProduct } from "../fetch/fetchUserProduct";
import ReviewCard from "./ReviewCard";
import WriteReview from "./WriteReview";
import { fetchProductDetail } from "../fetch/fetchProduct";
import { CreateUserProductReqDto } from "@/types/userProduct";
import { Button } from "@mui/material";
import ButtonStrong from "../designs/ButtonStrong";

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
  productId,
}: ReviewClientProps) {
  const { user } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isAlreadyWritten, setIsWritten] = useState<boolean>(false);
  const [myProduct, setMyProduct] = useState<number | null>(null);

  const [fetchedDataArr, setFetchedDataArr] = useState<fetchedDataProps>({
    userProductArr: [],
    productDetailData: null,
  });

  console.log("이 페이지의 productId", productId)

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

        // 유저 프로덕트id 와 디테일id 중 일치하는지
        const productUserHave = userProducts.find(
          (currentItem: ProductDetail) => currentItem.id === productsDetail.userProductId
        );

        console.log("보유 상품:", productUserHave.id);
        setMyProduct(productUserHave.id);

        // 이미 리뷰를 썼는지
        const hasWritten = product.reviews.find(
          (review) => review.userId.toString() === user?.id.toString()
        );
        console.log("이미 작성한 리뷰 내용:", hasWritten); // 없으면 undefined

        if (!hasWritten) {
          setIsWritten(false);
        } else if (hasWritten && hasWritten.content === undefined) {
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
    if (isAlreadyWritten) return;
    setIsOpen(true);
  };

  return (
    <section className="w-full flex flex-col gap-10 mb-20 bg-white  shadow-strong rounded-2xl p-10 overflow-hidden">
      <h1 className="text-2xl">구매자들의 리뷰</h1>

      {myProduct ? (
        <span className="w-[200px]">
          {isAlreadyWritten ? (
            <Button variant="contained" disabled>
              이미 작성했습니다
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
            <ReviewCard key={review.id} review={review} />
          ))
        )}
      </div>
    </section>
  );
}
