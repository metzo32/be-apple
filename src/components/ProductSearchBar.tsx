"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSearchMutation } from "@/hooks/useProductQuery";
import {
  ProductCategoryEnum,
  ProductQueryString,
} from "@/types/productCategory";
import { IoSearchSharp } from "react-icons/io5";

export default function ProductSearchBar({
  category,
}: {
  category: ProductCategoryEnum;
}) {
  const searchParams = useSearchParams();
  const searchMutationFn = useSearchMutation(category);

  const [searchForm, setSearchForm] = useState<ProductQueryString>({
    category,
    name: searchParams.get("name") || "",
    tag: searchParams.get("tag") || "",
    minPrice: searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : undefined,
    maxPrice: searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSearchForm((prev) => ({
      ...prev,
      [name]:
        name === "minPrice" || name === "maxPrice"
          ? Number(value) || undefined
          : value,
    }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (!/^\d*$/.test(value)) return;

    setSearchForm((prev) => ({
      ...prev,
      [name]:
        name === "minPrice" || name === "maxPrice"
          ? Number(value) || undefined
          : value,
    }));
  };

  const handleSubmit = () => {
    if (
      searchForm.minPrice &&
      searchForm.maxPrice &&
      searchForm.minPrice >= searchForm.maxPrice
    ) {
      alert("최대값은 최소값보다 커야합니다.");
      setSearchForm((prev) => ({
        ...prev,
        maxPrice: undefined
      }))
    }
    searchMutationFn.mutate(searchForm);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="global-px w-[320px] md:w-full flex items-center mb-24">
      <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-5 ">
        <span className="w-full h-[30px] md:h-[40px] px-2 border-2 border-custombg rounded-md bg-bglight flex justify-end">
          <input
            type="text"
            name="name"
            value={searchForm.name?.trim() ?? ""}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="제품명"
            className="w-full h-full m-0 md:mx-2 md:mb-2"
          />
        </span>

        <span className="w-full h-[30px] md:h-[40px] px-2 border-2 border-custombg rounded-md bg-bglight flex justify-end">
          <input
            type="text"
            name="tag"
            value={searchForm.tag?.trim() ?? ""}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="태그"
            className="w-full h-full m-0 md:mx-2 md:mb-2"
          />
        </span>

        <span className="w-full h-[30px] md:h-[40px] px-2 border-2 border-custombg rounded-md bg-bglight flex justify-end">
          <input
            type="text"
            name="minPrice"
            value={searchForm.minPrice ?? ""}
            onChange={handlePriceChange}
            maxLength={8}
            onKeyDown={handleKeyDown}
            placeholder="최저가"
            className="w-full h-full m-0 md:mx-2 md:mb-2"
          />
        </span>

        <span className="w-full h-[30px] md:h-[40px] px-2 border-2 border-custombg rounded-md bg-bglight flex justify-end">
          <input
            type="text"
            name="maxPrice"
            value={searchForm.maxPrice ?? ""}
            onChange={handlePriceChange}
            maxLength={8}
            onKeyDown={handleKeyDown}
            placeholder="최고가"
            className="w-full h-full m-0 md:mx-2 md:mb-2"
          />
        </span>
      </div>
      <button
        onClick={handleSubmit}
        className="text-primary w-[20px] aspect-square md:w-[40px] flex justify-center items-center"
      >
        <IoSearchSharp className="mr-1" />
      </button>
    </div>
  );
}
