"use client";

import { useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import { useRouter, useSearchParams } from "next/navigation";

export default function CallbackGooglePage() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const token = searchParams.get("accessToken");

    useEffect(() => {
      if (token) {
        localStorage.setItem("accessToken", token);
        router.push("/")
        console.log("구글 로그인 토큰:", token);
      } else {
        router.push("/login")
      }
    }, []);

  return <LoadingScreen />;
}
