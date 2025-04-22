"use client";

import { useEffect, useState } from "react";
import type { GetUserProductResponse } from "@/types/userProduct";
import { fetchUserProduct } from "../fetch/fetchUserProduct";
import UserProductCard from "./UserProductCard";
import AddButton from "./AddButton";

export default function UserProduct() {
  const [userProducts, setUserProducts] = useState<GetUserProductResponse[]>(
    []
  );

  // 유저 보유 목록 불러오기
  useEffect(() => {
    const getUserProduct = async () => {
      try {
        const userProductData = await fetchUserProduct();
        console.log("유저 보유 목록", userProductData);
        setUserProducts(userProductData);
      } catch (error) {
        console.error("유저 보유 목록 불러오기 실패", error);
      }
    };
    getUserProduct();
  }, []);

  return (
    <>
      <h2 className="font-bold mb-5">내 정보</h2>
      <div className="grid grid-cols-2 gap-10">
        <div className="h-[300px] bg-white rounded-2xl p-12 shadow-light flex flex-col justify-between items-center">
          <h3>당신의 티어는 모시깽입니다.</h3>
          <AddButton />
        </div>

        <div className="h-[300px] bg-white rounded-2xl p-12 shadow-light">
          {userProducts && userProducts.length > 0 ? (
            <div className="w-full h-[400px] pr-5 flex flex-col gap-5 lg:gap-20 bg-gray-100">
              {userProducts.map((userProduct) => (
                <UserProductCard
                  key={userProduct.id}
                  userProduct={userProduct}
                />
              ))}
            </div>
          ) : (
            <p>등록된 장비가 없습니다.</p>
          )}
        </div>
      </div>
    </>
  );
}
