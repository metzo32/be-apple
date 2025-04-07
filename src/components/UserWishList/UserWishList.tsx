"use client";

import { useEffect, useState } from "react";
import type { GetWishResponse } from "@/types/wishlist";
import { fetchRemoveWish, fetchWishList } from "../fetch/fetchWishList";
import UserWishCard from "./UserWishCard";
import DeletePopup from "../DeletePopup/DeletePopup";

export default function UserWishList() {
  const [wishList, setWishList] = useState<GetWishResponse[]>([]);
  const [visibleList, setVisibleList] = useState<GetWishResponse[]>([]);
  const [recentlyDeleted, setRecentlyDeleted] =
    useState<GetWishResponse | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [deleteTimer, setDeleteTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadWishList = async () => {
      const data = await fetchWishList();
      if (data) {
        setWishList(data);
        setVisibleList(data);
      }
    };
    loadWishList();
  }, []);

  const handleDelete = (id: number) => {
    const target = wishList.find((item) => item.id === id);
    if (!target) return;

    // 시각적으로만 제거
    setVisibleList((prev) => prev.filter((item) => item.id !== id));
    setRecentlyDeleted(target);
    setIsPopupOpen(true);

    // 3초 뒤 데이터 상에서 샂게
    const timer = setTimeout(async () => {
      await fetchRemoveWish(id);
      setWishList((prev) => prev.filter((item) => item.id !== id));
      setIsPopupOpen(false);
      setRecentlyDeleted(null);
    }, 3000);

    setDeleteTimer(timer);
  };

  const handleUndo = () => {
    if (recentlyDeleted) {
      if (deleteTimer) clearTimeout(deleteTimer); // 타이머 중도 취소하기

      setVisibleList((prev) => [recentlyDeleted, ...prev]); // 화면에 다시 보이게
      setIsPopupOpen(false);
      setRecentlyDeleted(null);
    }
  };

  return (
    <>
      {visibleList.length > 0 ? (
        <div className="w-full h-[400px] flex items-center gap-5 lg:gap-20 overflow-x-scroll">
          {visibleList.map((wish) => (
            <UserWishCard
              key={wish.id}
              {...wish}
              onDelete={() => handleDelete(wish.id)}
            />
          ))}
        </div>
      ) : (
        <p>위시리스트가 비어있습니다.</p>
      )}

      <DeletePopup isOpen={isPopupOpen} onUndo={handleUndo} />
    </>
  );
}
