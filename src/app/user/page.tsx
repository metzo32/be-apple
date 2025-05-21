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

export default function UserPage() {
  const { user } = useUserStore();
  const [checking, setChecking] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);

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

  if (checking || isSigningOut) return <LoadingScreen />;

  const userId: number | null = user?.id ?? null;

  return (
    <div className="relative">
      <section className="pt-12 md:py-24 flex flex-col items-center gap-5 md:gap-10">
        <h1>안녕하세요, {user?.name} 님.</h1>
        <div className="flex items-center gap-10">
          <ChangePassword />
          <SignOut setIsSigningOut={setIsSigningOut} />
        </div>
      </section>

      <UserInfo/>

      <UserProduct userId={userId}/>

      <UserWishList userId={userId}/>
    </div>
  );
}
