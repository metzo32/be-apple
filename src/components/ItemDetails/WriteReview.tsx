"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { CreateNewReviewReq } from "@/types/Review";
import { fetchNewReview } from "../fetch/fetchReview";
import { fetchUploadPhoto } from "../fetch/fetchUploadPhoto";
import { fetchUserProduct } from "../fetch/fetchUserProduct";

interface WriteReviewProps {
  productId: number;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function WriteReview({
  productId,
  isOpen,
  setIsOpen,
}: WriteReviewProps) {
  const [review, setReview] = useState<string>("");
  const [rate, setRate] = useState<number>(1);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);

  const maxLength = 200;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (review.length === 0) return;

    const reviewData: CreateNewReviewReq = {
      userProductId: productId,
      rating: rate,
      content: review,
      photos: uploadedPhotos,
    };

    const uploadReview = await fetchNewReview(productId, reviewData);

    if (uploadReview) {
      console.log("리뷰 등록 성공:", uploadReview);
      setIsOpen(false);
    } else {
      console.error("리뷰 등록 실패");
    }
  };

  const handleAddPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await fetchUploadPhoto(file);
      setUploadedPhotos([...uploadedPhotos, file.toString()]);
      console.log(uploadedPhotos);
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
      <form
        onSubmit={handleSubmit}
        className="w-[300px] md:w-[460px] p-5 flex flex-col gap-3 md:gap-5 bg-custombg shadow-2xl"
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

        <h3 className="font-bold">
          해당 제품을 사용해보셨다면 리뷰를 남겨주세요.
        </h3>

        <textarea
          id="review"
          value={review}
          onChange={handleChange}
          maxLength={maxLength}
          placeholder="리뷰 남기기"
          className="w-full h-[250px] p-5 border-3 border-bglight text-base resize-none"
        />
        <p className="text-sm text-gray-500 text-right mt-1">
          {review.length} / {maxLength}자
        </p>

        <h3 className="font-bold">포토</h3>
        <div className="flex gap-5 w-full">
          {[1, 2].map((_, index) => (
            <div
              key={index}
              className="cursor-pointer w-[200px] aspect-square bg-bglight"
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleAddPhoto}
                className="cursor-pointer bg-amber-800 w-[200px] aspect-square"
              />

              {uploadedPhotos && (
                <Image
                  src={uploadedPhotos[0]}
                  alt="추가"
                  width={50}
                  height={50}
                />
              )}
            </div>
          ))}
        </div>

        <button type="submit" className="submit-btn">
          등록
        </button>
      </form>
    </div>
  );
}
