"use client";

import { useRouter } from "next/navigation";
import { basicDeviceData } from "../../public/fakeData/basicDeviceData";
import { ButtonBasicLarge } from "./designs/ButtonBasic";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="header-px w-[160px] md:w-1/2 flex gap-5 md:gap-10 mt-0 md:mt-5">
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
