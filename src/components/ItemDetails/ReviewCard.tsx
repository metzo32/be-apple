"use client";

import Image from "next/image";
import { useState } from "react";
import type { Review } from "@/types/Review";
import useModal from "@/hooks/useModal";
import { formatDate } from "@/module/formatDate";
import { useUserStore } from "@/stores/useUserStore";
import Modal from "../Modal/Modal";
import { FaStar } from "react-icons/fa6";
import { useDeleteReviewMutation } from "@/hooks/useReviewsQuery";
import WriteReview from "./WriteReview";

interface ReviewCardProps {
  review: Review;
  productId: number; // 부모 컴포넌트에서 전달 필요
}

export default function ReviewCard({ review, productId }: ReviewCardProps) {
  const { user } = useUserStore();
  const currentUserId = user?.id;
  const { isModalOpen, openModal, closeModal } = useModal();

  const [isEditOpen, setIsEditOpen] = useState(false);

  const { mutate: deleteReviewMutationFn } = useDeleteReviewMutation();

  const handleEditReview = () => {
    setIsEditOpen(true);
  };

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
    <div className="w-full flex flex-col gap-3">
      <div
        className={`w-full p-5 border-2 ${
          review.userId === Number(currentUserId)
            ? "border-secondaryLight shadow-light"
            : "border-bglight"
        } rounded-xl flex flex-col gap-3 lg:gap-5 bg-bglight`}
      >
        <div className="flex justify-between">
          <div className="flex items-center gap-5">
            <h2 className="text-sm md:text-lg">{maskedName}</h2>
            {review.createdAt !== review.updatedAt && <p className="text-sm text-light">{updatedTime} (수정됨)</p>} 
          </div>
          <p className="text-sm text-light">{createdTime}</p>
        </div>

        <p className="light-p">{review.content}</p>

        <div className="flex">
          {Array.from({ length: review.rating }).map((_, index) => (
            <FaStar key={index} className="text-primary" />
          ))}
        </div>

        {/* TODO: 실제 옵션 데이터로 바꾸기 */}
        <p className="text-sm text-light break-words break-keep">
          Macbook Air 13inch 10코어 CPU 10코어 GPU 16GB 통합 메모리 512GB SSD
        </p>

        {review.photos && review.photos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {review.photos.map((photo, index) => (
              <span
                key={index}
                className="relative w-full aspect-[3/2] rounded-lg overflow-hidden"
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

      {review.userId === Number(currentUserId) && (
        <div className="w-full h-[20px] pr-5">
          <div className="flex justify-end items-center gap-5">
            <button
              onClick={handleEditReview}
              className="text-sm text-light hover:text-mid"
            >
              수정
            </button>
            <button
              onClick={openModal}
              className="text-sm text-light hover:text-mid"
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
