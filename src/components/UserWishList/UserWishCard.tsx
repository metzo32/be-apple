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
    <div className="w-full h-[200px] flex items-start gap-5 border-b-2 border-cardBd relative">
      <div className="flex items-center gap-3">
        <Image
          src="/assets/images/fallback.png" // TODO: 실제 이미지로 교체
          alt="제품 이미지"
          width={250}
          height={200}
        />
        <div className="h-[170px] flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            <h3>{wishList.product.name}</h3>
            <p className="light-p">{wishList.product.generation}</p>
            <p className="light-p">{wishList.product.price}</p>
          </div>

          <Button variant="outlined">
            <Link
              href={`/search/${wishList.product.category}/${wishList.product.id}`}
            >
              제품 보기
            </Link>
          </Button>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="w-8 h-8 text-3xl flex items-center justify-center absolute top-0 right-0 text-light hover:text-mid"
      >
        <IoTrashOutline />
      </button>
    </div>
  );
}
