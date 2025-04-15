"use client";

import { useUserStore } from "@/stores/useUserStore";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { fetchUserProduct } from "../fetch/fetchUserProduct";
import { GetProductResponse } from "@/types/product";

export default function PurchasedIcon({
  product,
}: {
  product: GetProductResponse;
}) {
  const { user } = useUserStore();
  const [isYours, setIsYours] = useState(false);

  // TODO 모든 카드에 한번씩 실행되고 있으니, 상단으로 useEffect문 옮길 것
  useEffect(() => {
    // 유저 보유 목록 불러오기
    const getUserProduct = async () => {
      const userProducts = await fetchUserProduct();

      if (!userProducts) {
        console.log("보유목록 불러오기 실패");
      }

      if (product.id === userProducts.id) {
        setIsYours(true);
      }
    };
    getUserProduct();
  }, [user?.id]);

  return isYours ? <FaCheck /> : null;
}
