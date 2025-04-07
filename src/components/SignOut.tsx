"use client";

import { useRouter } from "next/navigation";
import ButtonStrong from "./designs/ButtonStrong";
import { useUserStore } from "@/stores/useUserStore";
import { fetchSignOut } from "./fetch/fetchSignOut";

interface SignOutProps {
  setIsSigningOut: (value: boolean) => void;
}

export default function SignOut({ setIsSigningOut }: SignOutProps) {
  const { resetUser } = useUserStore();
  const router = useRouter();

  const handleSignOut = async () => {
    setIsSigningOut(true);

    await fetchSignOut();
    resetUser(); // zustand 상태 초기화

    router.push("/");
  };

  return <ButtonStrong text="로그아웃" onClick={handleSignOut} />;
}
