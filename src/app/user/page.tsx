"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type {
  CreateUserProductReqDto,
  GetUserProductResponse,
} from "@/types/userProduct";
import UserProductCard from "@/components/UserProduct/UserProductCard";
import SelectComp from "@/components/UserProduct/SelectComp";
import LoadingScreen from "@/components/LoadingScreen";
import WishList from "@/components/UserWishList/WishList";
import AddButton from "@/components/UserProduct/AddButton";
import SignOut from "@/components/SignOut";
import { useUserStore } from "@/stores/useUserStore";
import { fetchUserProduct } from "@/components/fetch/fetchUserProduct";
import { differenceInMonths, startOfToday } from "date-fns";
import Modal from "@/components/Modal/Modal";

export default function UserPage() {
  const { user } = useUserStore();
  const [checking, setChecking] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [userProductList, setUserProductList] = useState<
    GetUserProductResponse[]
  >([]);
  const router = useRouter();

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

  // 유저 인증
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token || !user) {
      router.replace("/login");
    } else {
      setChecking(false);
    }
  }, [user]);

  const calculateMonths = (start: string) => {
    const today = startOfToday();
    const monthsDiff = differenceInMonths(new Date(today), new Date(start));
    return monthsDiff;
  };

  if (checking || isSigningOut) return <LoadingScreen />;

  return (
    <div className="relative">
      {/* <Modal/> */}
      {/* 위시리스트의 제품 정보 */}
      {/* <WishDetails />  */}
      <section className="userSection flex flex-col items-center gap-10">
        <h1 className="text-4xl font-bold">안녕하세요, {user?.name} 님.</h1>
        <SignOut setIsSigningOut={setIsSigningOut} />
      </section>

      <section className="userSection">
        <h1 className="text-4xl font-bold mb-10">내 제품 목록</h1>
        {/* <AddButton /> */}
        {userProductList.length > 0 ? (
          <div className="w-full h-[400px] pr-5 flex items-center gap-5 lg:gap-20 overflow-x-scroll">
            {userProductList.map((userProduct) => (
              <UserProductCard key={userProduct.id} userProduct={userProduct} />
            ))}
          </div>
        ) : (
          <p>등록된 장비가 없습니다.</p>
        )}
      </section>

      <section className="userSection">
        <h1 className="text-4xl font-bold mb-10">내 위시리스트</h1>
        <WishList />
      </section>

      <SelectComp />
    </div>
  );
}
