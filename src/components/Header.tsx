"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import Image from "next/image";
import ButtonStrong from "./designs/ButtonStrong";
import ButtonBasic from "./designs/ButtonBasic";
import { basicDeviceData } from "../../public/fakeData/basicDeviceData";
import { IoMdPerson } from "react-icons/io";

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
      setText("내 정보");
      setNextPath("/user");
    }
  }, [user]);

  const handleClick = () => {
    router.push(nextPath);
  };

  return (
    <>
      <header className="global-px py-3 min-w-[320px] flex justify-center md:justify-between items-center bg-white">
        <button className="relative w-[18px] md:w-[40px] xl:w-[50px] aspect-square">
          <Image
            src="/assets/images/apple.png"
            alt="홈"
            fill
            className="object-cover"
            onClick={() => router.push("/")}
          />
        </button>
        <nav className="w-[200px] md:w-1/2 mx-[10px] md:m-0 flex md:items-end justify-between">
          {basicDeviceData.map((device) => (
            <ButtonBasic
              key={device.alt}
              text={device.alt}
              onClick={() => router.push(`/${device.category}`)}
            />
          ))}
        </nav>
        <span className="hidden md:block">
          <ButtonStrong text={text} onClick={handleClick} />
        </span>

        <button className="block md:hidden text-primary" onClick={handleClick}>
          <IoMdPerson />
        </button>
      </header>
    </>
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
