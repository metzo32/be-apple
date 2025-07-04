"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import { get } from "@/api/api";

export default function CallbackKakaoInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("accessToken");

  const { setUserInfo } = useUserStore();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (token) {
        localStorage.setItem("accessToken", token);
        try {
          const res = await get("/user/me");
          setUserInfo(res.data);
          router.push("/user");
        } catch (error) {
          console.error("유저정보 로드 실패:", error);
          localStorage.removeItem("accessToken");
          router.push("/login");
        }
      } else {
        router.push("/login");
      }
    };

    fetchUserInfo();
  }, []);

  return null;
}
