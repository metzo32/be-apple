"use client"

import { useRouter } from "next/navigation";
import ButtonStrong from "../designs/ButtonStrong";

export default function GoSearchButton() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/user");
  };
  return <ButtonStrong text="점수 확인하러 가기" onClick={handleClick} />;
}
