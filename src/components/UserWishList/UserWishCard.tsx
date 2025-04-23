"use client";

import Image from "next/image";
import type { GetWishResponse } from "@/types/wishlist";
import Link from "next/link";
import { IoTrashOutline } from "react-icons/io5";
import { Button } from "@mui/material";

interface WishCardProps {
  wishList: GetWishResponse;
  onDelete: () => void;
}

export default function UserWishCard({ wishList, onDelete }: WishCardProps) {
  return (
    <div className="w-full h-[200px] flex items-center gap-5">
      <span className="w-[200px] aspect-square rounded-2xl bg-gray-300" />

      {/* TODO: 실제 이미지로 교체
        <Image
          src="/assets/images/fallback.png"
          alt="제품 이미지"
          width={250}
          height={200}
        /> */}

      <div className="h-[200px] flex flex-col justify-between flex-1/2 border-b-2 border-cardBd">
        <div className="h-full flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">{wishList.product.name}</h3>
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
          <p className="light-p">{wishList.product.generation}</p>
          <p className="light-p">{wishList.product.price.toLocaleString()}원</p>
        </div>

        <span className="mb-5">
          <Button variant="outlined">
            <Link
              href={`/search/${wishList.product.category}/${wishList.product.id}`}
            >
              제품 보기
            </Link>
          </Button>
        </span>
      </div>
    </div>
  );
}
