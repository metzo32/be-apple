"use client";

import Image from "next/image";
import Link from "next/link";
import type { GetWishResponse } from "@/types/wishlist";
import { IoDocumentOutline } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";

interface WishCardProps {
  wishList: GetWishResponse;
  onDelete: () => void;
  isOpen: boolean;
  onToggle: (id: number | null) => void;
}

export default function UserWishCard({
  wishList,
  onDelete,
  isOpen,
  onToggle,
}: WishCardProps) {
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete();
  };

  console.log(wishList)

  return (
    <div className="flex flex-col w-[110px] md:w-[240px] aspect-2/3 ">
      <Link
        href={`/${wishList.product.category}/${wishList.product.id}`}
        className="w-full max-w-[240px] aspect-square relative"
      >
        {/* <Image
          src={wishList.product.photos[0]}
          alt="제품 이미지"
          width={250}
          height={150}
        /> */}
        <button
          onClick={handleDelete}
          className="absolute bottom-0 right-0 w-8 md:w-12 aspect-square text-base md:text-3xl p-2"
        >
          <GoHeartFill className="text-primary" />
        </button>
      </Link>

      {/* TODO: 실제 이미지로 교체 */}

      <div className="h-[100px] md:h-[120px] p-3 flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-xs md:text-base">
            {wishList.product.name}
          </h3>
          <p className="light-p">{wishList.product.generation}</p>
        </div>
        <div className="flex justify-between items-center relative">
          <p className="light-p">{wishList.product.price.toLocaleString()}원</p>

          {wishList.memo.length !== 0 && (
            <>
              <button
                onClick={() => onToggle(wishList.id)}
                className="user-wishcard-btn"
              >
                <IoDocumentOutline />
              </button>
              {isOpen && (
                <span className="select-none absolute top-full transform translate-y-0 md:translate-y-4 -translate-x-0  md:translate-x-0 z-30 w-[200px] xl:w-[300px] h-[120px] bg-white p-5 border-2 border-secondaryLight shadow-strong">
                  <p className="text-xs md:text-sm text-mid">{wishList.memo}</p>
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
