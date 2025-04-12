"use client";

import { useEffect, useState } from "react";
import { addWish, deleteWish } from "../fetch/fetchWishList";
import { PiHeartBold, PiHeartFill } from "react-icons/pi";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useUserStore } from "@/stores/useUserStore";
import useModal from "@/hooks/useModal";
import Modal from "../Modal/Modal";
import { useRouter } from "next/navigation";

// 자식 컴포넌트에 무엇이 필요한지 알고, 그 의도에 맞게 props를 정하자. 그냥 때려넣지 마세요
interface WishButtonProps {
  wishId: number | null; // 특히 여기.
  isInWish: boolean;
  productId: number;
}

export default function WishButton({
  wishId,
  isInWish,
  productId,
}: WishButtonProps) {
  const [isAdded, setIsAdded] = useState<boolean>(isInWish); // 하트버튼 눌렸는지 여부
  const [isMemoOpen, setIsMemoOpen] = useState<boolean>(false); // 메모 팝업
  const [isDropped, setIsDropped] = useState<boolean>(false); // 메모 드랍다운 메뉴
  const [memo, setMemo] = useState<string>(""); // 메모 내용
  const { user } = useUserStore();
  const { isModalOpen, openModal, closeModal } = useModal();
  const router = useRouter();

  const handleAddWish = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!user) {
      openModal();
      return;
    }

    setIsMemoOpen(true);
  };

  const handleRemoveWish = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!user) {
      return;
    }

    if (wishId) {
      const success = await deleteWish(wishId);
      if (success) {
        setIsAdded(false);
        setIsMemoOpen(false);
      }
    }
  };

  const handleRoute = () => {
    router.push("/login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // memo가 빈 문자열일 수도 있음
    const success = await addWish({ productId, memo });
    if (success) {
      setIsMemoOpen(false);
      setIsDropped(false);
      setMemo("");
      setIsAdded(true);
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
      {!isAdded ? (
        <button
          onClick={handleAddWish}
          className="text-xl sm:text-2xl p-3 bg-custombg rounded-full shadow-light hover:shadow-strong hover:text-light"
        >
          <PiHeartBold/>
        </button>
      ) : (
        <button
          onClick={handleRemoveWish}
          className="text-xl sm:text-2xl p-3 bg-custombg rounded-full shadow-light hover:shadow-strong hover:text-light"
        >
          <PiHeartFill/>
        </button>
      )}

      {/* 메모 입력 모달 */}
      {isMemoOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-screen h-screen fixed bg-overlay inset-0 z-20 flex justify-center items-center cursor-default"
        >
          <form
            onSubmit={handleSubmit}
            className="w-[300px] md:w-[460px] p-5 flex flex-col gap-3 md:gap-5 bg-custombg shadow-2xl"
          >
            <h3 className="font-bold">위시리스트에 추가되었습니다.</h3>
            <button
              type="button"
              onClick={handleDrop}
              className="w-[100px] flex gap-3 items-center"
            >
              <label className="light-p cursor-pointer">메모 남기기</label>
              {isDropped ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </button>

            {isDropped && (
              <div className="flex flex-col gap-1">
                <textarea
                  id="memo"
                  value={memo}
                  onChange={handleChange}
                  maxLength={150}
                  placeholder="나만의 메모를 남겨보세요"
                  className="w-full h-[150px] p-3 border-3 border-bglight text-base"
                />
                <p className="text-sm text-gray-500 text-right mt-1">
                  {memo.length} / 150자
                </p>
              </div>
            )}

            <button type="submit" className="submit-btn">
              확인
            </button>
          </form>
        </div>
      )}
    </>
  );
}
