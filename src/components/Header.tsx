"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import ButtonBasic from "./designs/ButtonMild";
import ButtonStrong from "./designs/ButtonStrong";
import { useUserInfo } from "@/stores/useUserInfo";
import Image from "next/image";

interface HeaderDataProps {
  text: string;
  route: string;
}

type HeaderText = " " | "로그인" | "내 페이지";

export default function Header() {
  const [text, setText] = useState<HeaderText>(" ");
  const userData = useUserInfo((state) => state.userInfo);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (userData) {
      setText("내 페이지");
    } else {
      setText("로그인");
    }
    console.log("헤더데이터", userData);
  }, [userData]);

  const handleClick = () => {
    if (path === "/user") {
      return;
    } else {
      router.push("/login");
    }
  };

  return (
    <header className="global-px py-6 flex justify-between items-center">
      <button className="relative w-[40px] h-[40px] xl:w-[50px] xl:h-[50px]">
        <Image
          src="/assets/images/apple.png"
          alt="홈"
          fill
          className="object-cover"
          onClick={() => router.push("/")}
        />
      </button>

      <ButtonStrong text={text} onClick={handleClick} />
    </header>
  );
}
