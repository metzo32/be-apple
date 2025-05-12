import Image from "next/image";
import type { CreateNewReviewReq, Review } from "@/types/Review";
import useModal from "@/hooks/useModal";
import { formatDate } from "@/module/formatDate";
import { useUserStore } from "@/stores/useUserStore";
import { deleteReview, editReview } from "../fetch/fetchReview";
import Modal from "../Modal/Modal";
import { FaStar } from "react-icons/fa6";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const { user } = useUserStore(); // 현재 접속 중인 유저id
  const { isModalOpen, openModal, closeModal } = useModal();
  const currentUserId = user?.id;

  const createdTime = formatDate(review.createdAt, "yyyy년 M월 d일 E요일");

  const queryClient = useQueryClient();

  const { mutate: deleteReviewMutationFn } = useMutation({
    mutationFn: (id: number) => {
      if (review.userId === currentUserId) {
        return deleteReview(id);
      } else {
        return Promise.reject(new Error("내가 쓴 리뷰가 아닙니다."));
      }
    },

    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        refetchType: "all",
        queryKey: ["productDetail"],
      });
    },
    onError: (error) => {
      console.log("리뷰 삭제 도중 오류가 발생했습니다.", error);
    },
  });

  //TODO 수정 로직 추가하기
  const { mutate: editReviewMutationFn } = useMutation({
    mutationFn: ({
      id,
      reviewData,
    }: {
      id: number;
      reviewData: Partial<CreateNewReviewReq>;
    }) => {
      if (review.userId === currentUserId) {
        return editReview(id, reviewData);
      } else {
        return Promise.reject(new Error("리뷰 수정에 실패했습니다."));
      }
    },

    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        refetchType: "all",
        queryKey: ["productDetail"],
      });
    },

    onError: (error) => {
      console.log("리뷰 수정 도중 오류가 발생했습니다.", error);
    },
  });

  const maskedName = review.userName
    .split("")
    .map((char, index) => {
      if (index < 1) return char;
      if (index === review.userName.length - 1) return char;
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
          <h2 className="text-sm md:text-lg">{maskedName}</h2>
          <p className="text-sm text-light">{createdTime}</p>
        </div>
        <p className="light-p">{review.content}</p>

        <div className="flex">
          {Array.from({ length: review.rating }).map((_, index) => (
            <FaStar key={index} className="text-primary" />
          ))}
        </div>

        {/* TODO 실제 옵션 데이터로 바꾸기*/}
        <p className="text-sm text-light break-words break-keep">
          Macbook Air 13inch 10코어 CPU 10코어 GPU 16GB 통합 메모리 512GB SSD
        </p>

        {review.photos && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {review.photos.map((photo, index) => (
              <span
                key={index}
                className="relative w-full aspect-[3/2] rounded-lg overflow-hidden"
              >
                <Image
                  src={review.photos[index]}
                  alt={`제품 이미지 ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 이 리뷰가 현재 로그인한 유저가 작성한 것이라면 */}
      <div className="w-full h-[20px] pr-5 ">
        {review.userId === Number(currentUserId) && (
          <div className="flex justify-end items-center gap-5">
            <button
              // onClick={() => editReviewMutationFn(review.id, reviewData)}
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
        )}
      </div>

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
    </div>
  );
}
