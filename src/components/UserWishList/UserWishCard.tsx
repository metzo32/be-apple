"use client";

import Image from "next/image";
import { useState } from "react";
import type { GetWishResponse } from "@/types/wishlist";
import Link from "next/link";
import { ButtonMedium } from "../designs/ButtonStrong";
import { IoTrashOutline } from "react-icons/io5";
import { IoDocumentOutline } from "react-icons/io5";

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
    <div className="w-full p-5 rounded-3xl border-2 border-bglight flex flex-col items-center gap-5 bg-bglight hover:bg-bglightHover hover:border-secondaryLight md:flex-row">
      <span className="w-full max-w-[160px] aspect-square rounded-2xl bg-gray-300" />
      {/* TODO: 실제 이미지로 교체 */}
      
      {/* <Image
        src={wishList.product.photos[0]}
        alt="제품 이미지"
        width={250}
        height={150}
      /> */}

      <div className="h-[160px] flex flex-col justify-between flex-1/2">
        <div className="h-full flex flex-col gap-1 md:gap-2">
          <div className="flex justify-between items-center">
            <h3 className="font-bold">{wishList.product.name}</h3>

            <div className="flex items-center gap-3 relative">
              {/* 메모 버튼 */}
              {wishList.memo.length !== 0 && (
                <>
                  <button
                    onClick={handleOpenMemo}
                    className="user-wishcard-btn"
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
                className="user-wishcard-btn"
              >
                <IoTrashOutline />
              </button>
            </div>
          </div>
          <p className="light-p">{wishList.product.generation}</p>
          <p className="light-p">{wishList.product.price.toLocaleString()}원</p>
        </div>

        <span className="mt-4 md:mt-0">
          <Link href={`/${wishList.product.category}/${wishList.product.id}`}>
            <ButtonMedium text="제품 보기" />
          </Link>
        </span>
      </div>
    </div>
  );
}
