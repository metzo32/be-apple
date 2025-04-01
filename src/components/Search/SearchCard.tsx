"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import WishButton from "../Wish/WishButton";

interface SearchCardProps {
  id: number;
  category: string;
  children: ReactNode;
}

export default function SearchCard({
  id,
  category,
  children,
}: SearchCardProps) {
  const router = useRouter();
  const handleRoute = () => {
    router.push(`/search/${category}/${id}`);
  };

  return (
    <div
      onClick={handleRoute}
      className="shrink-0 flex flex-col items-center gap-3 cursor-pointer relative"
    >
      {children}

      <WishButton id={id}/>
    </div>
  );
}
