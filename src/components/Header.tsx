"use client";

import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import Image from "next/image";
import ButtonStrong from "./designs/ButtonStrong";
import { IoMdPerson } from "react-icons/io";

export default function Header() {
  const router = useRouter();
  const { user } = useUserStore();

  const handleClick = (path: string) => {
    router.push(`/${path}`);
  };

  return (
    <>
      <header className="header-px py-3 min-w-[320px] flex justify-between items-center bg-white">
        <button className="relative w-[18px] md:w-[30px] xl:w-[35px] aspect-square">
          <Image
            src="/assets/images/icon.png"
            alt="홈"
            fill
            className="object-cover"
            onClick={() => router.push("/")}
          />
        </button>

        <span className="hidden md:block w-[80px]">
          {user ? (
            <ButtonStrong text="내 정보" onClick={() => handleClick("user")} />
          ) : (
            <ButtonStrong text="로그인" onClick={() => handleClick("login")} />
          )}
        </span>

        {user ? (
          <button
            className="block md:hidden text-primary"
            onClick={() => handleClick("user")}
          >
            <IoMdPerson />
          </button>
        ) : (
          <button
            className="block md:hidden text-primary text-xl"
            onClick={() => handleClick("login")}
          >
            <IoMdPerson />
          </button>
        )}
      </header>
    </>
  );
}
