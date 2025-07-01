"use client";

import Image from "next/image";
import { useState } from "react";
import type { Review } from "@/types/Review";
import useModal from "@/hooks/useModal";
import { formatDate } from "@/module/formatDate";
import { useUserStore } from "@/stores/useUserStore";
import Modal from "../Modal/Modal";
import { useDeleteReviewMutation } from "@/hooks/useReviewsQuery";
import WriteReview from "./WriteReview";
import { BsStarFill } from "react-icons/bs";
import { ProductDetail } from "@/types/productDetail";

interface ReviewCardProps {
  review: Review;
  productId: number;
  product: ProductDetail;
}

export default function ReviewCard({
  review,
  productId,
  product,
}: ReviewCardProps) {
  const { user } = useUserStore();
  const currentUserId = user?.id;
  const { isModalOpen, openModal, closeModal } = useModal();

  const [isEditOpen, setIsEditOpen] = useState(false);

  const { mutate: deleteReviewMutationFn } = useDeleteReviewMutation();

  const handleEditReview = () => {
    setIsEditOpen(true);
  };

  console.log("리뷰카드의 프로덕트", product)

  // TODO product - 각 reviews - userId를 바탕으로 userProduct 호출 - 가지고 있는 옵션 추출
  
  const createdTime = formatDate(review.createdAt, "yyyy년 M월 d일 E요일");
  const updatedTime = formatDate(review.updatedAt, "yyyy년 M월 d일 E요일");

  const maskedName = review.userName
    .split("")
    .map((char, index) => {
      if (index === 0 || index === review.userName.length - 1) return char;
      return "*";
    })
    .join("");

  return (
    <div className="w-full flex flex-col gap-3 border-b border-lineLight pb-3 mt-15">
      <div className="w-full flex flex-col gap-3">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <div className="flex text-xs gap-[1px]">
              {Array.from({ length: review.rating }).map((_, index) => (
                <BsStarFill key={index} className="text-text" />
              ))}
            </div>
            <h2 className="text-xs md:text-sm text-light">{maskedName}</h2>
          </div>

          {review.createdAt !== review.updatedAt ? (
            <p className="text-xs text-mid">{updatedTime} (수정됨)</p>
          ) : (
            <p className="text-xs text-mid">{createdTime}</p>
          )}
        </div>

        {/* TODO: 실제 옵션 데이터로 바꾸기 */}
        <p className="text-xs text-light break-words break-keep">
          Macbook Air 13inch 10코어 CPU 10코어 GPU 16GB 통합 메모리 512GB SSD
        </p>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-3">
          <p className="text-xs md:text-sm">{review.content}</p>

          {review.photos && review.photos.length > 0 && (
            <div className="w-full grid grid-cols-2 gap-3">
              {review.photos.map((photo, index) => (
                <span
                  key={index}
                  className="relative w-full aspect-[3/2] overflow-hidden"
                >
                  <Image
                    src={photo}
                    alt={`제품 이미지 ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {review.userId === Number(currentUserId) && (
        <div className="w-full h-[20px]">
          <div className="flex justify-end items-center gap-3 md:gap-5">
            <button
              onClick={handleEditReview}
              className="text-xs md:text-sm text-light hover:text-mid"
            >
              수정
            </button>
            <button
              onClick={openModal}
              className="text-xs md:text-sm text-light hover:text-mid"
            >
              삭제
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={() => deleteReviewMutationFn(review.id)}
          onCancel={closeModal}
          title={"잠깐!"}
          content={"정말 리뷰를 삭제할까요?"}
          confirmBtnText={"확인"}
        />
      )}

      {isEditOpen && (
        <WriteReview
          productId={productId}
          userProductId={review.userId}
          setIsOpen={setIsEditOpen}
          existingReview={{
            id: review.id,
            content: review.content,
            rating: review.rating,
            photos: review.photos,
          }}
        />
      )}
    </div>
  );
}
