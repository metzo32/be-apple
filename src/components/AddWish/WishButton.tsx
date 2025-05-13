"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useWishAddMutation,
  useWishDeleteMutation,
} from "@/hooks/useWishQuery";
import type { GetProductResponse } from "@/types/product";
import { useUserStore } from "@/stores/useUserStore";
import useModal from "@/hooks/useModal";
import Modal from "../Modal/Modal";
import ButtonStrong from "../designs/ButtonStrong";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { GoHeart, GoHeartFill } from "react-icons/go";

interface WishButtonProps {
  product: GetProductResponse;
}

export default function WishButton({ product }: WishButtonProps) {
  const [isFullHeart, setIsFullHeart] = useState<boolean>(product.isInWish); // 하트버튼 눌렸는지 여부
  const [isMemoOpen, setIsMemoOpen] = useState<boolean>(false); // 메모 팝업
  const [isDropped, setIsDropped] = useState<boolean>(false); // 메모 드랍다운 메뉴
  const [memo, setMemo] = useState<string>(""); // 메모 내용
  const { user } = useUserStore();
  const { isModalOpen, openModal, closeModal } = useModal();
  const router = useRouter();

  const addWish = useWishAddMutation();
  const deleteWish = useWishDeleteMutation();

  const productId = product.id;
  const wishId = product.wishId;

  const handleRoute = () => {
    router.push("/login");
  };

  // 위시 추가 트라이 (memo 입력창 열기)
  const handleAddWish = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!user) {
      openModal();
      return;
    }
    setIsMemoOpen(true);
    setIsFullHeart(true);
  };

  // confirm하면 memo가 전달되고, 비로소 위시리스트가 서버에 저장된다.
  const handleSubmit = () => {
    // memo는 빈 문자열일 수도 있음

    setIsMemoOpen(false);
    setIsDropped(false);
    addWish.mutate({ memo, productId });
  };

  const handleDeleteWish = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    deleteWish.mutate(wishId!);
    setIsFullHeart(false);

    if (!user) {
      console.log("로그인 해주세요");
      return;
    }
    if (!wishId) {
      console.log("삭제 실패: wishId 없음");
      return;
    }
  };

  const handleDrop = () => {
    setIsDropped((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(e.target.value);
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          onClose={close}
          onConfirm={handleRoute}
          onCancel={closeModal}
          title={"앗!"}
          content={"로그인이 필요한 서비스입니다."}
          confirmBtnText={"로그인하러 가기"}
        />
      )}

      {/* 하트 버튼 */}
      {!isFullHeart ? (
        <button onClick={handleAddWish} className="text-2xl hover:opacity-70">
          <GoHeart className="text-primary" />
        </button>
      ) : (
        <button
          onClick={handleDeleteWish}
          className="text-2xl hover:opacity-70"
        >
          <GoHeartFill className="text-primary" />
        </button>
      )}

      {/* 메모 입력 모달 */}
      {isMemoOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-screen h-screen fixed bg-overlay inset-0 z-20 flex justify-center items-center cursor-default"
        >
          <div className="w-[300px] md:w-[460px] p-5 md:p-8 flex flex-col gap-3 md:gap-5 rounded-xl bg-white shadow-2xl">
            <h3 className="font-bold">위시리스트에 추가되었습니다.</h3>
            <button
              type="button"
              onClick={handleDrop}
              className="w-[100px] flex gap-2 items-center light-p font-medium"
            >
              메모 남기기
              {isDropped ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </button>

            {isDropped && (
              <div className="flex flex-col gap-1">
                <textarea
                  id="memo"
                  value={memo}
                  onChange={handleChange}
                  maxLength={100}
                  placeholder="나만의 메모를 남겨보세요"
                  className="w-full h-[150px] p-3 border-3 border-bglight text-xs md:text-base resize-none"
                />
                <p className="text-xs md:text-sm text-gray-500 text-right mt-1">
                  {memo.length} / 100자
                </p>
              </div>
            )}

            <ButtonStrong text={"확인"} onClick={handleSubmit} />
          </div>
        </div>
      )}
    </>
  );
}
