"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function WishButton({ id }: { id: number }) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [wishList, setWishList] = useState<number[]>([]);

  const handleAddWish = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setWishList((prev) => [...prev, id]);
  };

  useEffect(() => {
    console.log(wishList);
  }, [wishList]);

  return (
    <button onClick={handleAddWish} className="absolute bottom-5 right-3">
      {isLiked ? (
        <Image
          src="/assets/icons/heart_active.svg"
          alt="위시"
          width={35}
          height={35}
        />
      ) : (
        <Image
          src="/assets/icons/heart_passive.svg"
          alt="취소"
          width={35}
          height={35}
        />
      )}
    </button>
  );
}
