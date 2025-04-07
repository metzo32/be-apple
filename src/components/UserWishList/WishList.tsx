"use client";

import { useEffect, useState } from "react";
import { fetchWishList } from "../fetch/fetchWishList";
import WishCard from "./WishCard";
import { ProductDetailMac } from "@/types/product";

export default function WishList() {
  // 이 부분 타입 Mac 외 다른 카테고리 처리 어떻게 할 것인지?
  const [wishList, setWishList] = useState<ProductDetailMac[]>([]);

  useEffect(() => {
    const loadWishList = async () => {
      const wishListData = await fetchWishList();
      if (wishListData) {
        setWishList(wishListData);
        console.log("메모는 어디에?", wishListData);
      }
    };
    loadWishList();
  }, []);

  return wishList.length !== 0 ? (
    <div className="w-full h-[400px] flex items-center gap-5 lg:gap-20 overflow-x-scroll">
      {wishList.map((wish) => (
        <WishCard
          key={wish.id}
          id={wish.id}
          // memo={wish.memo}
          wishList={wishList}
          setWishList={setWishList}
        />
      ))}
    </div>
  ) : (
    <p>위시리스트가 비어있습니다.</p>
  );
}
