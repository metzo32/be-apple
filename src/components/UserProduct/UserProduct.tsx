"use client";

import { useEffect, useState } from "react";
import UserProductCard from "./UserProductCard";
import type { GetUserProductResponse } from "@/types/userProduct";
import { fetchUserProduct } from "../fetch/fetchUserProduct";
import AddButton from "./AddButton";

export default function UserProduct() {
  const [userProductList, setUserProductList] = useState<
    GetUserProductResponse[]
  >([]);

  // 유저 보유 목록 불러오기
  useEffect(() => {
    const getUserProduct = async () => {
      try {
        const userProductData = await fetchUserProduct();
        console.log("유저 보유 목록", userProductData);
        setUserProductList(userProductData);
      } catch (error) {
        console.error("유저 보유 목록 불러오기 실패", error);
      }
    };
    getUserProduct();
  }, []);
  
  return (
    <>
      <AddButton />
      {userProductList && userProductList.length > 0 ? (
        <div className="w-full h-[400px] pr-5 flex flex-col gap-5 lg:gap-20 bg-gray-100">
          {userProductList.map((userProduct) => (
            <UserProductCard key={userProduct.id} userProduct={userProduct} />
          ))}
        </div>
      ) : (
        <p>등록된 장비가 없습니다.</p>
      )}
    </>
  );
}
