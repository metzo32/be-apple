"use client";

import { useRouter } from "next/navigation";
import { basicDeviceData } from "../../public/fakeData/basicDeviceData";
import { ButtonBasicLarge } from "./designs/ButtonBasic";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="header-px w-[100vw] flex gap-5 md:gap-10 mt-0 md:mt-5 pb-3 md:pb-5 border-transparent md:border-b md:border-lineLight">
      {basicDeviceData.map((device) => (
        <ButtonBasicLarge
          key={device.alt}
          text={device.alt}
          onClick={() => router.push(`/${device.category}`)}
        />
      ))}
    </nav>
  );
}
