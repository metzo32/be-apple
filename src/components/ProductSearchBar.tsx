"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProductCategoryEnum } from "@/types/productCategory";
import { IoSearchSharp } from "react-icons/io5";

export default function ProductSearchBar({
  category,
}: {
  category: ProductCategoryEnum;
}) {
  const [search, setSearch] = useState("");
  
  const router = useRouter();

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/${category}?q=${search}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full h-[40px] px-3 border-2 border-custombg rounded-full bg-bglight flex justify-end"
    >
      <input
        type="text"
        value={search}
        onChange={onChangeSearch}
        className="w-full h-full text-sm mx-2 mb-2"
      />
      <button className="text-primary">
        <IoSearchSharp />
      </button>
    </form>
  );
}
