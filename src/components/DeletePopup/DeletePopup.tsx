"use client";

import ButtonStrong from "../designs/ButtonStrong";
import clsx from "clsx";

interface DeletePopupProps {
  isOpen: boolean;
  onUndo: () => void;
}

export default function DeletePopup({ isOpen, onUndo }: DeletePopupProps) {
  return (
    <div
      className={clsx(
        "w-full global-px fixed bottom-0 left-0 z-50 transition-transform duration-300 ease-in-out",
        isOpen ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="w-full h-[100px] flex flex-col gap-5 sm:flex-row justify-between items-center bg-white px-8 sm:px-16 py-5 shadow-light">
        <h6 className="text-sm md:text-lg">위시리스트에서 제거했습니다.</h6>
        <ButtonStrong text="취소하기" onClick={onUndo} />
      </div>
    </div>
  );
}
