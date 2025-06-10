"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSearchMutation } from "@/hooks/useProductQuery";
import {
  ProductCategoryEnum,
  ProductQueryString,
} from "@/types/productCategory";
import { IoSearchSharp } from "react-icons/io5";
import SortButton from "./SortButton";
import { ButtonBasic } from "./designs/ButtonBasic";

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
    sortBy:
      (searchParams.get("sortBy") as ProductQueryString["sortBy"]) ??
      "releasedDate",
    order: (searchParams.get("order") as ProductQueryString["order"]) ?? "desc",
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
        maxPrice: undefined,
      }));
    }
    searchMutationFn.mutate(searchForm);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSortByChange = (sortBy: ProductQueryString["sortBy"]) => {
    setSearchForm((prev) => {
      const updated = { ...prev, sortBy };
      searchMutationFn.mutate(updated); // 즉시 검색 실행
      return updated;
    });
  };

  const handleOrderChange = (order: ProductQueryString["order"]) => {
    setSearchForm((prev) => {
      const updated = { ...prev, order };
      searchMutationFn.mutate(updated); // 즉시 검색 실행
      return updated;
    });
  };

  return (
    <div
      className="px-5 w-[320px] md:w-[500px] lg:w-[885px] flex items-center mb-24 relative"
    >
      <div className="flex-1 grid grid-cols-3 grid-rows-2 gap-2 md:gap-5 ">
        <span className="searchbar-span col-span-3">
          <input
            type="text"
            name="name"
            maxLength={20}
            value={searchForm.name?.trim() ?? ""}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="제품명"
            className="w-full h-full m-0 md:mx-2 md:mb-2 placeholder-gray-400 "
          />
          <button
            onClick={handleSubmit}
            className="text-primary w-[20px] md:w-[40px] flex justify-center items-center"
          >
            <IoSearchSharp className="mr-1" />
          </button>
        </span>

        <span className="searchbar-span">
          <input
            type="text"
            name="tag"
            maxLength={20}
            value={searchForm.tag?.trim() ?? ""}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="태그"
            className="w-full h-full m-0 md:mx-2 md:mb-2 placeholder-gray-400 "
          />
        </span>

        <span className="searchbar-span">
          <input
            type="text"
            name="minPrice"
            value={searchForm.minPrice ?? ""}
            onChange={handlePriceChange}
            maxLength={8}
            onKeyDown={handleKeyDown}
            placeholder="최저가"
            className="w-full h-full m-0 md:mx-2 md:mb-2 placeholder-gray-400 "
          />
        </span>

        <span className="searchbar-span">
          <input
            type="text"
            name="maxPrice"
            value={searchForm.maxPrice ?? ""}
            onChange={handlePriceChange}
            maxLength={8}
            onKeyDown={handleKeyDown}
            placeholder="최고가"
            className="w-full h-full m-0 md:mx-2 md:mb-2 placeholder-gray-400 "
          />
        </span>
      </div>

      {/* <div className="flex flex-col items-center ml-3 md:ml-5">
        <ButtonBasic text="초기화" />
      </div> */}

      <SortButton
        onChangeSortBy={handleSortByChange}
        onChangeOrder={handleOrderChange}
        order={searchForm.order}
      />
    </div>
  );
}
