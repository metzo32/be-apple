"use client";

import { useState } from "react";
import {
  ProductCategoryEnum,
  ProductQueryString,
} from "@/types/productCategory";
import { IoSearchSharp } from "react-icons/io5";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { isEqual } from "lodash";
import { ButtonMedium } from "./designs/ButtonStrong";

export default function ProductSearchBar({
  category,
}: {
  category: ProductCategoryEnum;
}) {
  const { query, push } = useRouterQuery();

  const [searchForm, setSearchForm] = useState<ProductQueryString>({
    category: category,
  });

  const initialForm = { category: category };

  // searchForm객체를 query string으로 바꿔주는 로직 추가

  const onChangeSearchName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchForm((prev) => ({ ...prev, name: e.target.value }));
  };

  const onChangeSearchTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchForm((prev) => ({ ...prev, tag: e.target.value }));
  };

  const onChangeSearchMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchForm((prev) => ({ ...prev, minPrice: Number(e.target.value) }));
  };

  const onChangeSearchMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchForm((prev) => ({ ...prev, maxPrice: Number(e.target.value) }));
  };

  const handleSortAsc = () => {
    setSearchForm((prev) => ({ ...prev, order: "asc" }));
    push(`/${category}`, searchForm);
  };

  const handleSortDesc = () => {
    setSearchForm((prev) => ({ ...prev, order: "desc" }));
    push(`/${category}`, searchForm);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEqual(initialForm, searchForm)) return; // 아무것도 수정되지 않은 경우

    push(`/${category}`, searchForm);
  };

  return (
    <div className="flex flex-col gap-5">
      <form
        onSubmit={onSubmit}
        className="w-full h-[40px] px-3 border-2 border-custombg rounded-full bg-bglight flex justify-end"
      >
        <input
          type="text"
          value={query.name}
          onChange={onChangeSearchName}
          className="w-full h-full text-sm mx-2 mb-2"
          placeholder="제품명"
        />

        <input
          type="text"
          value={query.tag}
          onChange={onChangeSearchTags}
          className="w-full h-full text-sm mx-2 mb-2"
          placeholder="관련 태그"
        />

        <input
          type="text"
          value={query.minPrice}
          maxLength={7}
          onChange={onChangeSearchMinPrice}
          className="w-full h-full text-sm mx-2 mb-2"
          placeholder="최소가"
        />

        <input
          type="text"
          value={query.maxPrice}
          maxLength={7}
          onChange={onChangeSearchMaxPrice}
          className="w-full h-full text-sm mx-2 mb-2"
          placeholder="최대가"
        />

        <button className="text-primary">
          <IoSearchSharp />
        </button>
      </form>

      <div className="w-full flex justify-center  items-center gap-5 global-px">
        <ButtonMedium text="오름차순" onClick={handleSortAsc} />
        <ButtonMedium text="내림차순" onClick={handleSortDesc} />
      </div>
    </div>
  );
}
