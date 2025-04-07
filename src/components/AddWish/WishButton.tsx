"use client";

import { useState, useEffect } from "react";
import { PiHeartBold, PiHeartFill } from "react-icons/pi";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { fetchAddWish, fetchRemoveWish } from "../fetch/fetchWishList";
import type { ProductDetail } from "@/types/productDetail";

interface WishButtonProps {
  id: number;
  wishList: number[];
  setWishList: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function WishButton({
  id,
  wishList,
  setWishList,
}: WishButtonProps) {
  const [isAdded, setIsAdded] = useState<boolean>(false); // 하트버튼 눌렸는지 여부
  const [isMemoOpen, setIsMemoOpen] = useState<boolean>(false); // 메모 팝업
  const [isDropped, setIsDropped] = useState<boolean>(false); // 메모 드랍다운 메뉴
  const [memo, setMemo] = useState<string>(""); // 메모 내용

  const handleAddWish = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setIsAdded(true);
    setWishList((prev) => [...prev, id]);
    setIsMemoOpen(true);

    console.log(isMemoOpen);
  };
  

  const handleRemoveWish = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  
    const success = await fetchRemoveWish(id);
    if (success) {
      const updatedList = wishList.filter(item => item !== id);
      setWishList(updatedList);
      setIsAdded(false);
      setIsMemoOpen(false);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetchAddWish({ productId: id, memo }); // memo가 빈 문자열일 수도 있음

    setIsMemoOpen(false);
    setIsDropped(false);
    setMemo("");
  };

  const handleDrop = () => {
    setIsDropped((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(e.target.value);
  };

  useEffect(() => {
    setIsAdded(wishList.includes(id));
  }, [wishList, id]);

  return (
    <>
      {/* 하트 버튼 */}
      {!isAdded ? (
        <button
          onClick={handleAddWish}
          className="text-xl sm:text-3xl z-10"
        >
          <PiHeartBold className="hover:opacity-50" />
        </button>
      ) : (
        <button
          onClick={handleRemoveWish}
          className="text-xl sm:text-3xl z-10"
        >
          <PiHeartFill className="hover:opacity-50" />
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
