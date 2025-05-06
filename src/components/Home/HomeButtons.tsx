"use client"

import { useRouter } from "next/navigation";
import ButtonStrong from "../designs/ButtonStrong";

export function GoRecommendButton() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/recommend");
  };
  return <ButtonStrong text="알맞는 상품 보러가기" onClick={handleClick} />;
}

