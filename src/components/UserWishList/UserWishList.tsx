"use client";

import { useEffect, useState } from "react";
import type { GetWishResponse } from "@/types/wishlist";
import { deleteWish, fetchWishList } from "../fetch/fetchWishList";
import UserWishCard from "./UserWishCard";
import DeletePopup from "../DeletePopup/DeletePopup";

export default function UserWishList() {
  const [wishList, setWishList] = useState<GetWishResponse[]>([]);
  const [pendingDeleteIds, setPendingDeleteIds] = useState<number[]>([]);
  const [recentlyDeleted, setRecentlyDeleted] =
    useState<GetWishResponse | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [deleteTimer, setDeleteTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadWishList = async () => {
      const data = await fetchWishList();
      if (data) {
        const sorted = data.sort(
          // 위시목록 최신순 정렬하기
          (a: GetWishResponse, b: GetWishResponse) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setWishList(sorted);
      }
    };
    loadWishList();
  }, []);

  const handleDelete = (id: number) => {
    const target = wishList.find((item) => item.id === id);
    if (!target) return;

    setPendingDeleteIds((prev) => [...prev, id]); 
    setRecentlyDeleted(target);
    setIsPopupOpen(true);

    // 3초 뒤 데이터 상에서도 삭제
    const timer = setTimeout(async () => {
      await deleteWish(id);
      setWishList((prev) => prev.filter((item) => item.id !== id));
      setIsPopupOpen(false);
      setRecentlyDeleted(null);
    }, 3000);

    setDeleteTimer(timer);
  };

  const handleUndo = () => {
    if (recentlyDeleted) {
      if (deleteTimer) clearTimeout(deleteTimer); // 타이머 중도 취소하기

      setPendingDeleteIds(
        (prev) => prev.filter((id) => id !== recentlyDeleted.id) // 취소한 id를 뺀 나머지 배열 요소만 남기기
      );
      setIsPopupOpen(false);
      setRecentlyDeleted(null);
    }
  };

  return (
    <section className="mt-12">
      <div className="bg-white min-h-[500px] p-12 rounded-t-3xl shadow-light">
        <h2 className="font-bold mb-10">내 위시리스트</h2>
        {wishList.length > 0 ? (
          <div className="flex flex-col gap-5">
            {wishList.map((wish) => {
              const isPendingDelete = pendingDeleteIds.includes(wish.id);
              return (
                <div
                  key={wish.id}
                  className={
                    isPendingDelete
                      ? "saturate-0 opacity-30 pointer-events-none"
                      : ""
                  }
                >
                  <UserWishCard
                    wishList={wish}
                    onDelete={() => handleDelete(wish.id)}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <p className="light-p">위시리스트가 비어있습니다.</p>
        )}
      </div>

      <DeletePopup isOpen={isPopupOpen} onUndo={handleUndo} />
    </section>
  );
}
