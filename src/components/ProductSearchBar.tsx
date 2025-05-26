"use client";

import { useEffect, useState } from "react";
import {
  ProductCategoryEnum,
  ProductQueryString,
} from "@/types/productCategory";
import { IoSearchSharp } from "react-icons/io5";
import { ButtonMedium } from "./designs/ButtonStrong";
import { useSearchMutation } from "@/hooks/useProductQuery";

export default function ProductSearchBar({
  category,
}: {
  category: ProductCategoryEnum;
}) {
  const [searchForm, setSearchForm] = useState<ProductQueryString>({
    category: category,
  });

  useEffect(() => {
    console.log("현재 검색 데이터", searchForm);
  }, [searchForm]);

  const searchMutationFn = useSearchMutation(category);

  // TODO 값이 null일때 쿼리파라미터에 전달하지 않는 로직 추가
  // const removeKeys = (obj: ProductQueryString) => {
  //   for (const key in obj) {
  //     if (obj[key] === null) {
  //       delete obj[key];
  //     }
  //   }
  //   return obj;
  // };

  const onChangeSearchName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchForm((prev) => ({ ...prev, name: e.target.value }));
  };

  const onChangeSearchTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchForm((prev) => ({ ...prev, tag: e.target.value }));
  };

  const onChangeSearchMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!/^\d*$/.test(e.target.value)) return;
    setSearchForm((prev) => ({
      ...prev,
      minPrice: Number(e.target.value),
    }));
  };

  const onChangeSearchMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!/^\d*$/.test(e.target.value)) return;
    setSearchForm((prev) => ({
      ...prev,
      maxPrice: Number(e.target.value),
    }));
  };

  // const handleSortAsc = () => {
  //   const updated = { ...searchForm, order: "asc" };
  //   setSearchForm(updated);
  //   searchMutation.mutate(updated);
  // };

  // const handleSortDesc = () => {
  //   const updated = { ...searchForm, order: "desc" };
  //   setSearchForm(updated);
  //   searchMutation.mutate(updated);
  // };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchMutationFn.mutate(searchForm);
  };

  return (
    <span className="w-[280px] md:w-[350px] lg:w-[450px] flex justify-center items-center mb-24">
      <div className="w-full flex flex-col gap-5">
        <form onSubmit={onSubmit} className="flex flex-col gap-5 px-5 md:p-0">
          <span className="w-full h-[40px] px-3 border-2 border-custombg rounded-full bg-bglight flex justify-end">
            <input
              type="text"
              value={searchForm.name ?? ""}
              onChange={onChangeSearchName}
              className="w-full h-full text-sm mx-2 mb-2"
              placeholder="제품명"
            />

            <input
              type="text"
              value={searchForm.tag ?? ""}
              onChange={onChangeSearchTags}
              className="w-full h-full text-sm mx-2 mb-2"
              placeholder="관련 태그"
            />

            <button className="text-primary">
              <IoSearchSharp />
            </button>
          </span>

          <span className="w-full h-[40px] px-3 border-2 border-custombg rounded-full bg-bglight flex justify-end">
            <input
              type="text"
              value={searchForm.minPrice ?? ""}
              maxLength={7}
              onChange={onChangeSearchMinPrice}
              className="w-full h-full text-sm mx-2 mb-2"
              placeholder="최소가"
            />

            <input
              type="text"
              value={searchForm.maxPrice ?? ""}
              maxLength={7}
              onChange={onChangeSearchMaxPrice}
              className="w-full h-full text-sm mx-2 mb-2"
              placeholder="최대가"
            />

            <button className="text-primary">
              <IoSearchSharp />
            </button>
          </span>

          <div className="w-full flex flex-wrap gap-3 md:gap-5">
            <ButtonMedium text="오름차순" />
            <ButtonMedium text="내림차순" />
            <ButtonMedium text="최신순" />
            <ButtonMedium text="가격순" />
            <ButtonMedium text="리뷰 많은 순" />
            <ButtonMedium text="초기화" />
          </div>
        </form>
      </div>
    </span>
  );
}
