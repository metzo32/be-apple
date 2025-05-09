"use client";

import Image from "next/image";
import { useState } from "react";
import useModal from "@/hooks/useModal";
import type { CreateNewReviewReq } from "@/types/Review";
import { createNewReview } from "../fetch/fetchReview";
import { fetchUploadPhoto } from "../fetch/fetchUploadPhoto";
import ButtonStrong from "../designs/ButtonStrong";
import Modal from "../Modal/Modal";
import { Rating } from "@mui/material";
import { LuPlus } from "react-icons/lu";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface WriteReviewProps {
  userProductId: number | null;
  isWriteReviewOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function WriteReview({
  userProductId,
  isWriteReviewOpen,
  setIsOpen,
}: WriteReviewProps) {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [review, setReview] = useState<string>("");
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [value, setValue] = useState<number>(2);

  const MAX_LENGTH = 200;

  const queryClient = useQueryClient()

  const { mutate: createReviewMutationFn } = useMutation({
    mutationFn: (reviewData: CreateNewReviewReq) => {
      if (!userProductId) {
        return Promise.reject(new Error('no userProductId! UserProduct를 생성 안하면 리뷰도 생성 못 한다 이자식아'))
      }
      return createNewReview(userProductId, reviewData)
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        refetchType: 'all',
        queryKey: ['productDetail'],
      }) // ProductDetail의 쿼리키를 갱신해서 새로운 데이터를 받아온다. 새로고침 안해도됨 나이스
      setIsOpen(false)
    },
    onError: (error) => {
      console.error('리뷰 생성 중 에러가 발생했습니다. 에러, 너의 이름은', error)
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 아무것도 입력하지 않은 경우
    if (review.length === 0) {
      openModal();
      return;
    }

    // 유저 프로덕트 id를 가져오지 못한 경우
    if (!userProductId) {
      console.error("리뷰를 등록할 수 없습니다.");
      return;
    }

    const reviewData: CreateNewReviewReq = {
      userProductId: userProductId,
      rating: value,
      content: review,
      photos: uploadedPhotos,
    };

    createReviewMutationFn(reviewData)
  };

  // 리뷰 사진 추가하기
  const handleAddPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("파일", file);

    if (file) {
      const imageUrl = await fetchUploadPhoto(file);
      setUploadedPhotos([...uploadedPhotos, imageUrl]);
    }
  };

  const handleBack = () => {
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
        className="w-[300px] md:w-[480px] p-5 md:p-10 bg-white rounded-2xl shadow-2xl flex flex-col gap-3 md:gap-5"
      >
        <button
          type="button"
          onClick={handleBack}
          className="w-[50px] text-custombg"
        >
          <Image
            src={"/assets/icons/arrow_left.svg"}
            alt="뒤로"
            width={50}
            height={50}
          />
        </button>

        <h3 className="text-lg font-semibold">
          해당 제품을 사용해보셨다면 리뷰를 남겨주세요.
        </h3>

        <textarea
          id="review"
          value={review}
          onChange={handleChange}
          maxLength={MAX_LENGTH}
          placeholder="리뷰 남기기"
          className="w-full h-[250px] p-5 border-3 rounded-2xl bg-bglight border-bglight text-base resize-none focus:bg-bglightHover focus:border-secondaryLight"
        />
        <p className="text-sm text-gray-500 text-right mt-1">
          {review.length} / {MAX_LENGTH}자
        </p>

        <h3 className="font-semibold">평점</h3>
        <div className="bg-amber-200">
          <Rating
            // TODO review 점수값이 1로 넘어감
            value={value}
            max={5}
            onChange={(event, newValue) => {
              if (typeof newValue === "number") {
                setValue(newValue);
              }
            }}
            size="large"
            sx={{
              "& label": {
                width: "20px",
              },
              "& label > span": {
                width: "100%",
                display: "flex",
                justifyContent: "center",
              },
              "& label > span > svg": {
                fontSize: "20px", // 별 자체 크기 조정
              },
            }}
          />
        </div>

        <h3 className="font-semibold">포토</h3>
        <div className="flex gap-5 w-full">
          {[0, 1].map((_, index) => (
            <div key={index} className="w-[200px] aspect-square relative">
              <input
                type="file"
                accept="image/*"
                id={`file-input-${index}`}
                onChange={(e) => handleAddPhoto(e)}
                className="hidden"
              />

              <label
                htmlFor={`file-input-${index}`}
                className="cursor-pointer w-full h-full bg-bglight rounded-2xl flex items-center justify-center hover:bg-bglightHover"
              >
                {uploadedPhotos && uploadedPhotos[index] ? (
                  <Image
                    src={uploadedPhotos[index]}
                    alt="업로드된 이미지"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-4xl">
                    <LuPlus />
                  </span>
                )}
              </label>
            </div>
          ))}
        </div>

        <ButtonStrong text="등록" type="submit" />
      </form>
    </div>
  );
}
