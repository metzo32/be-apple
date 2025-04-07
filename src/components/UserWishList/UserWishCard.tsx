"use client";

import Image from "next/image";
import RouteButton from "./RouteButton";
import type { GetWishResponse } from "@/types/wishlist";
import type { GetProductResponse } from "@/types/product";

interface WishCardProps {
  id: number;
  memo: string;
  createdAt: Date;
  productId: number;
  product: GetProductResponse;
  onDelete: () => void;
}

export default function UserWishCard({
  id,
  memo,
  createdAt,
  productId,
  product,
  onDelete,
}: WishCardProps) {
  return (
    <div className="flex flex-col items-center gap-2 shrink-0 cursor-pointer relative">
      <Image
        src="/assets/images/macbook01.png" // TODO: 실제 이미지로 교체
        alt="제품 이미지"
        width={250}
        height={200}
      />
      <h3>{product.name}</h3>
      <p className="light-p">M4칩, 256GB</p>
      <p className="light-p">{createdAt?.toString()}</p>
      <p className="light-p">프로덕트ID: {productId}</p>
      <p className="light-p">위시ID: {product.wishId}</p>
      <RouteButton id={id} />
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="absolute top-0 right-0 -translate-x-7 -translate-y-3 hover:brightness-110"
      >
        <Image
          src={"/assets/icons/remove.svg"}
          alt="삭제"
          width={35}
          height={35}
        />
      </button>
      <p className="light-p">메모: {memo}</p>
    </div>
  );
}
