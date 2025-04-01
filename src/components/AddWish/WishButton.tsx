"use client";

import { useEffect } from "react";
import WishAddMemo from "./WishAddMemo";
import { PiHeartBold } from "react-icons/pi";
import { PiHeartFill } from "react-icons/pi";

interface WishButtonProps {
  id: number;
  wishList: number[];
  setWishList: React.Dispatch<React.SetStateAction<number[]>>;
  isAdded: boolean;
  setIsAdded: (value: boolean) => void;
  isMemoOpen: boolean;
  setIsMemoOpen: (value: boolean) => void;
}

export default function WishButton({
  id,
  wishList,
  setWishList,
  isAdded,
  setIsAdded,
  isMemoOpen,
  setIsMemoOpen,
}: WishButtonProps) {
  const handleAddWish = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setIsAdded(!isAdded);

    if (!isAdded) {
      //위시 추가
      setIsMemoOpen(true);
      setWishList((prev) => [...prev, id]);
    } else {
      //위시 제거
      setIsMemoOpen(false);
      setWishList((prev) => prev.filter((item) => item !== id));
    }
  };

  useEffect(() => {
    console.log(wishList);
  }, [wishList]);

  return (
    <>
      <button onClick={handleAddWish} className="absolute bottom-5 right-3 text-3xl">
        {isAdded ? <PiHeartFill className="hover:opacity-50"/> : <PiHeartBold className="hover:opacity-50"/>}
      </button>

      {isMemoOpen && (
        <WishAddMemo isMemoOpen={isMemoOpen} setIsMemoOpen={setIsMemoOpen} />
      )}
    </>
  );
}
