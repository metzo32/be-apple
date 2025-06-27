"use client";

import { useState } from "react";
import { useWishDeleteMutation, useWishLoadQuery } from "@/hooks/useWishQuery";
import type { GetWishResponse } from "@/types/wishlist";
import UserWishCard from "./UserWishCard";
import DeletePopup from "../DeletePopup/DeletePopup";

interface UserProduct {
  userId: number | null;
}

export default function UserWishList({ userId }: UserProduct) {
  const [pendingDeleteIds, setPendingDeleteIds] = useState<number[]>([]);
  const [recentlyDeleted, setRecentlyDeleted] =
    useState<GetWishResponse | null>(null);
  const [deleteTimer, setDeleteTimer] = useState<NodeJS.Timeout | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [openMemoId, setOpenMemoId] = useState<number | null>(null);

  const { data: wishList } = useWishLoadQuery(userId);

  const deleteWishMutation = useWishDeleteMutation();

  if (!wishList) return null;
  const sortedWishList = [...wishList].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const handleToggle = (id: number) => {
    setOpenMemoId((prev) => (prev === id ? null : id));
  };

  const handleDelete = (wish: GetWishResponse) => {
    setPendingDeleteIds((prev) => [...prev, wish.id]);
    setRecentlyDeleted(wish);
    setIsPopupOpen(true);

    const timer = setTimeout(() => {
      deleteWishMutation.mutate(wish.id);
      setPendingDeleteIds((prev) => prev.filter((id) => id !== wish.id));
      setIsPopupOpen(false);
      setRecentlyDeleted(null);
    }, 3000);

    setDeleteTimer(timer);
  };

  const handleUndo = () => {
    if (deleteTimer) clearTimeout(deleteTimer);
    if (recentlyDeleted) {
      setPendingDeleteIds((prev) =>
        prev.filter((id) => id !== recentlyDeleted.id)
      );
      setRecentlyDeleted(null);
      setIsPopupOpen(false);
    }
  };

  return (
    <section className="my-18">
      <div className="min-h-[200px] md:min-h-[300px]">
        <h2 className="user-h2">내 위시리스트 {wishList.length}</h2>
        {/* 구분선 */}
        <span className="thick-line" />
        {wishList.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-10 ">
            {sortedWishList.map((wish) => {
              const isPendingDelete = pendingDeleteIds.includes(wish.id);
              return (
                <div
                  key={wish.id}
                  className={`justify-self-center ${
                    isPendingDelete
                      ? "saturate-0 opacity-30 pointer-events-none"
                      : ""
                  }`}
                >
                  <UserWishCard
                    key={wish.id}
                    wishList={wish}
                    onDelete={() => handleDelete(wish)}
                    isOpen={!!(openMemoId === wish.id)}
                    onToggle={() => handleToggle(wish.id)}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <p className="light-p mt-10">위시리스트가 비어있습니다.</p>
        )}
      </div>

      <DeletePopup isOpen={isPopupOpen} onUndo={handleUndo} />
    </section>
  );
}
