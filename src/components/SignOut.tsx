"use client";

import { useRouter } from "next/navigation";
import ButtonStrong from "./designs/ButtonStrong";
import { useUserStore } from "@/stores/useUserStore";

export default function SignOut() {
  const { resetUser } = useUserStore();
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    resetUser()
    alert("로그아웃 성공");

    router.push("/");
  };

  return <ButtonStrong text="로그아웃" onClick={handleSignOut} />;
}
