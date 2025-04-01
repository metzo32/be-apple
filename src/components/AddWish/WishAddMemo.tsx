"use client";

import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";

interface WishAddMemoProps {
  isMemoOpen: boolean;
  setIsMemoOpen: (value: boolean) => void;
}

export default function WishAddMemo({
  setIsMemoOpen,
}: WishAddMemoProps) {
  const [isDropped, setIsDropped] = useState<boolean>(false);

  const handleDrop = () => {
    setIsDropped(!isDropped);
  };

  const handleSubmit = () => {
    setIsMemoOpen(false);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-screen h-screen fixed bg-overlay inset-0 z-20 flex justify-center items-center cursor-default"
    >
      <div className="w-[300px] md:w-[460px] p-5 flex flex-col gap-3 md:gap-5 bg-custombg shadow-2xl">
        <h3 className="font-bold">위시리스트에 추가되었습니다.</h3>
        <button onClick={handleDrop} className="w-[100px] flex gap-3 items-center">
          <h4 className="light-p">메모 남기기</h4>
          {isDropped ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </button>
        {isDropped && (
          <div className="w-full h-[150px] border-3 border-bglight">
            textarea
          </div>
        )}
        <button type="button" onClick={handleSubmit} className="submit-btn">
          확인
        </button>
      </div>
    </div>
  );
}
