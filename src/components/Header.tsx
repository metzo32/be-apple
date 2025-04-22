"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ButtonStrong from "./designs/ButtonStrong";
import { useUserStore } from "@/stores/useUserStore";
import Image from "next/image";
import { Button, TextField } from "@mui/material";

type HeaderText = " " | "로그인" | "내 페이지";

export default function Header() {
  const [text, setText] = useState<HeaderText>(" ");
  const [nextPath, setNextPath] = useState<string>("/login");
  const router = useRouter();
  const { user } = useUserStore();

  useEffect(() => {
    if (!user) {
      setText("로그인");
      setNextPath("/login");
    } else {
      setText("내 페이지");
      setNextPath("/user");
    }
  }, [user]);

  const handleClick = () => {
    router.push(nextPath);
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

      <form className="flex gap-5">
        <TextField
          // value={"입력값"}
          placeholder="검색어를 입력하세요..."
          variant="outlined"
          // onChange={handleMultiplePurchased}
          size="small"
          sx={{
            width: "600px",
          }}
        />
        <Button variant="outlined">검색</Button>
      </form>

      <ButtonStrong text={text} onClick={handleClick} />
    </header>
  );
}
