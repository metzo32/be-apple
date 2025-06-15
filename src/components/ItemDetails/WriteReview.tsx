"use client";

import Image from "next/image";
import { useState } from "react";
import useModal from "@/hooks/useModal";
import type { CreateNewReviewReq } from "@/types/Review";
import { fetchUploadPhoto } from "../fetch/fetchUploadPhoto";
import ButtonStrong from "../designs/ButtonStrong";
import Modal from "../Modal/Modal";
import { TfiPlus } from "react-icons/tfi";
import {
  useAddReviewMutation,
  useEditReviewMutation,
} from "@/hooks/useReviewsQuery";
import StarRate from "../designs/StarRate";
import CloseButton from "../designs/CloseButton";

interface WriteReviewProps {
  productId: number;
  userProductId: number | null;
  setIsOpen: (value: boolean) => void;
  existingReview?: {
    id: number;
    content: string;
    rating: number;
    photos: string[];
  };
}

export default function WriteReview({
  productId,
  userProductId,
  setIsOpen,
  existingReview,
}: WriteReviewProps) {
  const { isModalOpen, openModal, closeModal } = useModal();
  const isEditMode = !!existingReview;

  const [review, setReview] = useState<string>(existingReview?.content ?? "");
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>(
    existingReview?.photos ?? []
  );
  const [rating, setRating] = useState<number | null>(
    existingReview?.rating ?? null
  );

  const MAX_LENGTH = 200;

  const { mutate: createReviewMutationFn } = useAddReviewMutation(productId);
  const { mutate: editReviewMutationFn } = useEditReviewMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 유저 프로덕트 id를 가져오지 못한 경우
    if (!userProductId) {
      console.error("리뷰를 등록할 수 없습니다.");
      return;
    }

    // 아무것도 입력하지 않은 경우 + 별점도 설정 안된 경우
    const isReviewEmpty = review.trim().length === 0;
    const isRatingNull = rating === null;

    if (isReviewEmpty && isRatingNull) {
      openModal();
      return;
    }

    const reviewData: CreateNewReviewReq = {
      userProductId: userProductId,
      rating: rating ?? 0,
      content: review,
      photos: uploadedPhotos,
    };

    // 수정 모드에서 실제 변경이 일어났는지 확인
    if (isEditMode && existingReview) {
      const hasChanged =
        existingReview.rating !== rating || existingReview.content !== review;

      // 수정사항 없으면 창 닫기
      if (!hasChanged) {
        setIsOpen(false);
        return;
      }

      editReviewMutationFn({
        id: existingReview.id,
        reviewData,
      });
    } else {
      createReviewMutationFn(reviewData);
    }

    setIsOpen(false);
  };

  // 리뷰 사진 추가하기
  const handleAddPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const imageUrl = await fetchUploadPhoto(file);
      setUploadedPhotos([...uploadedPhotos, imageUrl]);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };

  return (
    <div className="overlay flex justify-center items-center">
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={closeModal}
          onCancel={closeModal}
          title={"잠깐!"}
          content={"리뷰 내용을 작성해주세요."}
          confirmBtnText={"확인"}
          hideCancel={true}
        />
      )}

      <form
        onSubmit={handleSubmit}
        className="relative w-[300px] md:w-[480px] p-7 md:p-10 bg-white flex flex-col gap-3 md:gap-5"
      >
        <CloseButton onClick={handleClose} />

        <div className="border-b border-lineLight flex flex-col gap-3 pb-3">
          <h3 className="text-base md:text-lg font-semibold">
            해당 제품에 대한 리뷰를 남겨주세요.
          </h3>

          <textarea
            id="review"
            value={review}
            onChange={handleChange}
            maxLength={MAX_LENGTH}
            placeholder="리뷰 남기기"
            className="w-full h-[200px] p-3 md:p-5 border-2 bg-bglight border-bglight text-sm md:text-base resize-none focus:bg-bglightHover focus:border-secondaryLight"
          />
          <p className="text-gray-500 text-xs md:text-sm text-right mt-1">
            {review.length} / {MAX_LENGTH}자
          </p>
        </div>

        <div className="border-b border-lineLight flex flex-col gap-3 pb-3">
          <h3 className="font-semibold">평점</h3>
          <StarRate value={rating} onChange={setRating} />
        </div>

        <div className="flex items-center gap-3">
          <h3 className="font-semibold">포토</h3>
          {isEditMode && (
            <p className="text-sm text-light">사진은 수정할 수 없습니다.</p>
          )}
        </div>
        <div className="flex gap-5 w-full">
          {uploadedPhotos.map((photo, index) => (
            <div key={index} className="w-[200px] aspect-square relative">
              <Image
                src={photo}
                alt={`이미지 ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}

          {!isEditMode &&
            [0, 1].slice(uploadedPhotos.length).map((_, index) => (
              <div key={index} className="w-[200px] aspect-square relative">
                <input
                  type="file"
                  accept="image/*"
                  id={`file-input-${index}`}
                  onChange={handleAddPhoto}
                  className="hidden"
                />
                <label
                  htmlFor={`file-input-${index}`}
                  className="cursor-pointer w-full h-full bg-bglight flex items-center justify-center hover:bg-bglightHover"
                >
                  <span className="text-gray-400 text-2xl">
                    <TfiPlus />
                  </span>
                </label>
              </div>
            ))}
        </div>

        <ButtonStrong text="등록" type="submit" />
      </form>
    </div>
  );
}
