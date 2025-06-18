"use client";

import { useState } from "react";
import { ProductQueryString } from "@/types/productCategory";
import { RiArrowDownSFill } from "react-icons/ri";
import { useSearchParams } from "next/navigation";

interface SortButtonProps {
  onChangeSortBy: (sortBy: ProductQueryString["sortBy"]) => void;
  onChangeOrder: (order: ProductQueryString["order"]) => void;
  order: string | undefined;
}

export default function SortButton({
  onChangeSortBy,
  onChangeOrder,
}: SortButtonProps) {
  const searchParams = useSearchParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentSortBy = searchParams.get("sortBy") as ProductQueryString["sortBy"];
  const currentOrder = searchParams.get("order") as ProductQueryString["order"];

  const sortOptions: {
    label: string;
    value: ProductQueryString["sortBy"];
    order: ProductQueryString["order"];
  }[] = [
    { label: "등록순", value: undefined, order: undefined },
    { label: "출시일순", value: "releasedDate", order: "desc" },
    { label: "오래된순", value: "releasedDate", order: "asc" },
    { label: "높은가격순", value: "price", order: "desc" },
    { label: "낮은가격순", value: "price", order: "asc" },
    { label: "리뷰많은순", value: "reviewCount", order: "desc" },
  ];

  const handleSortSelect = (
    option: ProductQueryString["sortBy"],
    order: ProductQueryString["order"]
  ) => {
    onChangeSortBy(option);
    onChangeOrder(order);
    setIsDropdownOpen(false);
  };

  const selectedLabel =
    sortOptions.find(
      (option) => option.value === currentSortBy && option.order === currentOrder
    )?.label || sortOptions[0].label;

  return (
    <div className="w-full flex justify-end relative h-[65px] md:h-[110px]">
      <div
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className="absolute top-0 right-0 z-10 w-[80px] md:w-[120px] my-5 md:my-10 border border-lineLight bg-white flex flex-col items-start"
      >
        <button className="btn w-full flex items-center justify-between px-2 py-1 md:px-3 md:py-2">
          <span>{selectedLabel}</span>
          <RiArrowDownSFill />
        </button>

        {isDropdownOpen && (
          <>
            {sortOptions.map((option) => (
              <button
                key={option.label}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSortSelect(option.value, option.order);
                }}
                className="btn w-full px-2 py-1 md:px-3 md:py-2 flex items-center justify-between hover:bg-bglightHover"
              >
                {option.label}
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
