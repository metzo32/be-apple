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
import { ButtonBasic } from "@/components/designs/ButtonBasic";
import GradeChart from "@/components/UserPage/GradeChart";
import { useUserTierQuery } from "@/hooks/useTierQuery";

export default function UserPage() {
  const { user } = useUserStore();
  const [checking, setChecking] = useState(true);
  const [isGradeOpen, setIsGradeOpen] = useState(false);

  const { data: tierData } = useUserTierQuery();

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

  const handleClose = () => {
    setIsGradeOpen(false);
  };

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
          {user?.name}
          <span className="font-medium text-lg md:text-xl text-light ml-1">
            님
          </span>
        </h1>

        <div className="hidden md:flex flex-col gap-3 items-start">
          <h2 className="md:text-lg font-bold">나의 등급</h2>
          <p className="text-primary">{tierData?.tier ?? "등급 없음"}</p>

          <span className="relative">
            <ButtonBasic
              text="등급표 확인하기"
              onClick={() => setIsGradeOpen(!isGradeOpen)}
            />
            <GradeChart
              isGradeOpen={isGradeOpen}
              onClose={handleClose}
              isWideView
            />
          </span>
        </div>

        <div className="hidden md:flex flex-col gap-3 items-start">
          <h2 className="md:text-lg font-bold">나의 계정정보</h2>
          <ChangePassword />
          <SignOut />
        </div>
      </section>

      {/* md 미만 뷰 */}
      <div className="w-full">
        <UserInfo
          userId={userId}
          tierData={tierData}
          isGradeOpen={isGradeOpen}
          setIsGradeOpen={setIsGradeOpen}
          onClose={handleClose}
        />

        <UserProduct userId={userId} />

        <UserWishList userId={userId} />

        <UserAuth userId={userId} />
      </div>
    </div>
  );
}
