"use client";

import { useRouter } from "next/navigation";
import { ButtonBasicLarge } from "./designs/ButtonBasic";
import {
  ProductCategoryEnum,
  ProductCategoryLabels,
} from "@/types/productCategory";

export default function Navbar() {
  const router = useRouter();

  const categories = Object.values(ProductCategoryEnum);

  return (
    <nav className="header-px w-[100vw] flex gap-3 md:gap-10 mt-0 md:mt-5 pb-3 md:pb-5 border-transparent md:border-b md:border-lineLight">
      {categories.map((category) => (
        <ButtonBasicLarge
          key={category}
          text={ProductCategoryLabels[category]}
          onClick={() => router.push(`/${category}`)}
        />
      ))}
    </nav>
  );
}
