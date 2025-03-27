"use client";

import ButtonStrong from "@/components/designs/ButtonStrong";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <div className="py-80 flex flex-col items-center justify-center gap-15">
      <h1 className="text-4xl font-bold">잘못된 페이지입니다.</h1>
      <ButtonStrong onClick={handleClick} text="홈으로" />
    </div>
  );
}
