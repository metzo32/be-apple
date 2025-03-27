"use client";

import { useRouter } from "next/navigation";
import ButtonStrong from "./designs/ButtonStrong";

export default function SignOut() {
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    alert("로그아웃 성공");

    router.push("/");
  };

  return <ButtonStrong text="로그아웃" onClick={handleSignOut} />;
}
