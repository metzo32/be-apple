"use client";

import Image from "next/image";
import type { GetWishResponse } from "@/types/wishlist";
import Link from "next/link";
import { IoCloseOutline } from "react-icons/io5";

interface WishCardProps {
  wishList: GetWishResponse;
  onDelete: () => void;
}

export default function UserWishCard({ wishList, onDelete }: WishCardProps) {
  return (
    <div className="w-[500px] h-[250px] flex flex-col gap-5">
      <div className="flex items-center gap-3 relative">
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
          <Link
            href={`/search/${wishList.product.category}/${wishList.product.id}`}
            className="btn-strong"
          >
            제품 보기
          </Link>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="w-8 h-8 text-4xl flex items-center justify-center absolute top-0 right-0 bg-bglight text-custombg hover:bg-light"
        >
          <IoCloseOutline />
        </button>
      </div>

      <div className="w-full h-[50px]">
        {wishList.memo && (
          <p className="light-p whitespace-pre-line">{wishList.memo}</p>
        )}
      </div>
    </div>
  );
}
