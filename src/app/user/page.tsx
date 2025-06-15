"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import LoadingScreen from "@/components/LoadingScreen";
import UserWishList from "@/components/UserWishList/UserWishList";
import SignOut from "@/components/SignOut";
import UserInfo from "@/components/UserProductAdd/UserInfo";
import UserProduct from "@/components/UserProduct/UserProduct";
import ChangePassword from "@/components/ChangePassword";
import UserAuth from "@/components/UserPage/UserAuth";

export default function UserPage() {
  const { user } = useUserStore();
  const [checking, setChecking] = useState(true);

  const router = useRouter();

  // 유저 인증
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token || !user) {
      router.replace("/login");
    } else {
      setChecking(false);
    }
  }, [user]);

  if (checking) return <LoadingScreen />;

  const userId: number | null = user?.id ?? null;

  return (
    <div className="relative flex flex-col md:flex-row md:gap-10 pt-5 md:py-12">
      <section
        className="
          min-w-[320px] w-[100vw] md:min-w-[180px] md:w-1/5
          h-[120px] md:h-auto
          -mx-5 md:mx-0
          p-5 md:p-0
          flex flex-col 
          justify-center md:justify-normal
          gap-3 md:gap-10
          bg-primary md:bg-transparent
        "
      >
        
        <h1 className="text-2xl md:text-3xl text-white md:text-text">
          {user?.name} <span className="font-medium text-lg md:text-xl text-light">님</span>
        </h1>

        <div className="hidden md:flex flex-col gap-3 items-start">
          <h2 className="md:text-lg font-bold">나의 등급</h2>
          <p className="text-[10px] md:text-[14px]">모시깽</p>
          <p className="text-[10px] md:text-[14px]">등급표 확인하기</p>
        </div>

        <div className="hidden md:flex flex-col gap-3 items-start">
          <h2 className="md:text-lg font-bold">나의 계정정보</h2>
          <ChangePassword />
          <SignOut />
        </div>
      </section>

      <div className="w-full">
        <UserInfo userId={userId} />

        <UserProduct userId={userId} />

        <UserWishList userId={userId} />

        <UserAuth userId={userId} />
      </div>
    </div>
  );
}
