"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import WishButton from "../AddWish/WishButton";

interface SearchCardProps {
  id: number;
  category: string;
  children: ReactNode;
  wishList: number[];
  setWishList: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function SearchCard({
  id,
  category,
  children,
  wishList,
  setWishList,
}: SearchCardProps) {
  
  const router = useRouter();
  const handleRoute = () => {
    router.push(`/search/${category}/${id}`);
  };

  return (
    <div
      onClick={handleRoute}
      className="shrink-0 flex flex-col items-center gap-3 cursor-pointer relative"
    >
      {/* 서버컴포넌트 */}
      {children}

      {/* 위시 버튼 */}
      <WishButton
        id={id}
        wishList={wishList}
        setWishList={setWishList}
      />
    </div>
  );
}
