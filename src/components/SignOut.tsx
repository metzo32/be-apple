"use client";

import { useRouter } from "next/navigation";
import ButtonStrong from "./designs/ButtonStrong";
import { useUserInfo } from "@/stores/useUserInfo";

export default function SignOut() {
  const { resetUserInfo } = useUserInfo();
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    resetUserInfo()
    alert("로그아웃 성공");

    router.push("/");
  };

  return <ButtonStrong text="로그아웃" onClick={handleSignOut} />;
}
