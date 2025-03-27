"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import ButtonBasic from "./designs/ButtonMild";
import ButtonStrong from "./designs/ButtonStrong";

interface HeaderDataProps {
  text: string;
  route: string;
}

type HeaderText = " " | "로그인" | "내 페이지";

export default function Header() {
  const [text, setText] = useState<HeaderText>(" ");
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setText("내 페이지");
    } else {
      setText("로그인");
    }
  }, []);

  const headerBtnData: HeaderDataProps[] = [
    {
      text: "홈",
      route: "/",
    },
    {
      text: "검색",
      route: "/search",
    },
    {
      text: "상세",
      route: "/details",
    },
  ];

  const handleClick = () => {
    if (path === "/user") {
      return;
    } else {
      router.push("login");
    }
  };

  return (
    <header className="global-px py-5 flex justify-between">
      {headerBtnData.map((item, index) => (
        <ButtonBasic
          key={index}
          text={item.text}
          onClick={() => router.push(item.route)}
        />
      ))}

      <ButtonStrong text={text} onClick={handleClick} />
    </header>
  );
}
