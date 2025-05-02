"use client";

import type { GetWishResponse } from "@/types/wishlist";
import Link from "next/link";
import { ButtonMedium } from "../designs/ButtonStrong";
import { IoTrashOutline } from "react-icons/io5";
import { IoDocumentOutline } from "react-icons/io5";
import { useState } from "react";

interface WishCardProps {
  wishList: GetWishResponse;
  onDelete: () => void;
}

export default function UserWishCard({ wishList, onDelete }: WishCardProps) {
  const [isMemoOpen, setIsMemoOpen] = useState(false);

  const handleOpenMemo = () => {
    setIsMemoOpen(!isMemoOpen);
  };

  return (
    <div className="w-full p-5 rounded-3xl border-2 border-bglight flex items-center gap-5 bg-bglight hover:bg-bglightHover hover:border-secondaryLight">
      <span className="w-[160px] aspect-square rounded-2xl bg-gray-300" />

      {/* TODO: 실제 이미지로 교체
        <Image
          src="/assets/images/fallback.png"
          alt="제품 이미지"
          width={250}
          height={150}
        /> */}

      <div className="h-[160px] flex flex-col justify-between flex-1/2">
        <div className="h-full flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">{wishList.product.name}</h3>

            <div className="flex items-center gap-5 relative">
              {/* 메모 버튼 */}
              {wishList.memo.length !== 0 && (
                <>
                  <button
                    onClick={handleOpenMemo}
                    className="w-8 h-8 text-3xl flex items-center justify-center text-light hover:text-mid "
                  >
                    <IoDocumentOutline />
                  </button>
                  {isMemoOpen && (
                    <span
                      onClick={() => setIsMemoOpen(!isMemoOpen)}
                      className="select-none absolute top-full transform translate-y-4 w-[300px] h-[120px] bg-white p-5 rounded-xl border-2 border-secondaryLight shadow-strong"
                    >
                      <p className="text-sm text-mid">{wishList.memo}</p>
                    </span>
                  )}
                </>
              )}

              {/* 삭제 버튼 */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className="w-8 h-8 text-3xl flex items-center justify-center text-light hover:text-mid"
              >
                <IoTrashOutline />
              </button>
            </div>
          </div>
          <p className="light-p">{wishList.product.generation}</p>
          <p className="light-p">{wishList.product.price.toLocaleString()}원</p>
        </div>

        <span>
          <Link href={`/${wishList.product.category}/${wishList.product.id}`}>
            <ButtonMedium text="제품 보기" />
          </Link>
        </span>
      </div>
    </div>
  );
}
