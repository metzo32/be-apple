"use client";

import { basicDeviceData } from "../../../public/fakeData/basicDeviceData";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

export default function SearchHeader() {
  const router = useRouter();

  return (
    <nav className="pb-12 flex items-end justify-between">
      {basicDeviceData.map((item) => (
        <Button
          key={item.id}
          variant="text"
          size="large"
          onClick={() => router.push(`/search/${item.category}`)}
        >
          {item.alt}
        </Button>
      ))}
      {/* {basicDeviceData.map((item) => (
        <button
          key={item.id}
          className="group relative w-[150px] h-[150px] md:w-[300px] md:h-[300px] rounded-xl bg-custombg hover:bg-bglight shadow-strong flex flex-col justify-center items-center gap-5"
          onClick={() => router.push(`/search/${item.category}`)}
        >
          <h2 className="font-bold text-lg md:text-5xl text-textHover transform -rotate-90 transition-transform duration-300 ease-in-out translate-x-0 group-hover:-translate-x-20">
            {item.alt}
          </h2>

          <Image
            src={item.image}
            alt={item.alt}
            fill
            className="object-cover saturate-0 group-hover:saturate-100"
          />
        </button>
      ))} */}
    </nav>
  );
}
