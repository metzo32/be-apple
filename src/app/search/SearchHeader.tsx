"use client";

import Image from "next/image";
import { basicDeviceData } from "../../../public/fakeData/basicDeviceData";
import { useRouter } from "next/navigation";

export default function SearchHeader() {
  const router = useRouter();

  const pathArr = ["Mac", "iPhone", "iPad",];

// Watch, AirPods

  return (
    <div className="pb-12 border-b-2 border-light flex items-end justify-center gap-2 lg:gap-20">
      {basicDeviceData.map((item, index) => (
        <button
          key={item.id}
          className="flex flex-col justify-center items-center gap-5"
          onClick={() => router.push(`/search/${pathArr[index]}`)}
        >
          <Image
            src={item.image}
            alt={item.alt}
            width={200}
            height={50}
            style={{ objectFit: "contain" }}
          />
          <h3>{item.title}</h3>
        </button>
      ))}
    </div>
  );
}
