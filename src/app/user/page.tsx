"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import LoadingScreen from "@/components/LoadingScreen";
import UserWishList from "@/components/UserWishList/UserWishList";
import SignOut from "@/components/SignOut";
import UserProduct from "@/components/UserProduct/UserProduct";

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

  return (
    <div className="relative">
      <section className="py-24 flex flex-col items-center gap-10">
        <h1 className="text-4xl font-bold">안녕하세요, {user?.name} 님.</h1>
        <SignOut setIsSigningOut={setIsSigningOut} />
      </section>

      <section className="userSection">
        <UserProduct />
      </section>

      {/* <section className="userSection pb-0"> */}
        <UserWishList />
      {/* </section> */}
    </div>
  );
}
