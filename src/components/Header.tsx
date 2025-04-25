"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import Image from "next/image";
import { Button, TextField } from "@mui/material";
import ButtonStrong from "./designs/ButtonStrong";
import ButtonBasic from "./designs/ButtonBasic";
import { basicDeviceData } from "../../public/fakeData/basicDeviceData";

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
    <header className="global-px py-3 flex justify-between items-center bg-white">
      <button className="relative w-[40px] h-[40px] xl:w-[50px] xl:h-[50px]">
        <Image
          src="/assets/images/apple.png"
          alt="홈"
          fill
          className="object-cover"
          onClick={() => router.push("/")}
        />
      </button>
      <nav className="w-1/2 flex items-end justify-between">
        {basicDeviceData.map((device) => (
          <ButtonBasic
            key={device.alt}
            text={device.alt}
            onClick={() => router.push(`/${device.category}`)}
          />
        ))}
      </nav>

      {/* 
      <form className="flex gap-1">
        <TextField
          // value={"입력값"}
          color="secondary"
          placeholder="검색어를 입력하세요..."
          variant="outlined"
          // onChange={handleMultiplePurchased}
          size="small"
          sx={{
            width: "600px",
          }}
        />
        <ButtonBasic text="검색" />
      </form> */}
      <ButtonStrong text={text} onClick={handleClick} />
    </header>
  );
}

// import { basicDeviceData } from "../../../public/fakeData/basicDeviceData";
// import { useRouter } from "next/navigation";
// import { Button } from "@mui/material";

// export default function SearchHeader() {
//   const router = useRouter();

//   return (
//     <nav className="py-12 flex items-end justify-between">
//       {basicDeviceData.map((item) => (
//         <button
//           key={item.id}
//           onClick={() => router.push(`/search/${item.category}`)}
//           className="text-mid rounded-lg border-b-3 border-transparent px-5 py-2 hover:bg-[#C466F333] hover:text-white hover:border-secondary"
//         >
//           {item.alt}
//         </button>
//       ))}
//     </nav>
//   );
// }
