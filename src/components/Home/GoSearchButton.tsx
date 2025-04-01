"use client"

import { useRouter } from "next/navigation";
import ButtonStrong from "../designs/ButtonStrong";

export default function GoSearchButton() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/search");
  };
  return <ButtonStrong text="제품 둘러보러 가기" onClick={handleClick} />;
}
