"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";
import { useUserInfo } from "@/stores/useUserInfo";

export default function CallbackKakaoPage() {
  const { setUserInfo } = useUserInfo();
  const router = useRouter();

  const searchParams = useSearchParams();
  const token = searchParams.get("accessToken");

  useEffect(() => {
    if (token) {
      localStorage.setItem("accessToken", token);
      router.push("/")
      console.log("카카오 로그인 토큰:", token);
    } else {
      router.push("/login")
    }
  }, []);

  return <LoadingScreen />;
}
