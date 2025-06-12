import { useState } from "react";
import { ProductQueryString } from "@/types/productCategory";
import { ButtonBasic } from "./designs/ButtonBasic";
import { RiArrowDownSFill } from "react-icons/ri";

interface SortButtonProps {
  onChangeSortBy: (sortBy: ProductQueryString["sortBy"]) => void;
  onChangeOrder: (order: ProductQueryString["order"]) => void;
  order: string | undefined;
}

export default function SortButton({
  onChangeSortBy,
  onChangeOrder,
  order,
}: SortButtonProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState<
    ProductQueryString["sortBy"] | null
  >(null);

  const sortOptions: { label: string; value: ProductQueryString["sortBy"] }[] =
    [
      { label: "출시일 순", value: "releasedDate" },
      { label: "가격 순", value: "price" },
      { label: "리뷰 많은 순", value: "reviewCount" },
    ];

  const handleSortSelect = (option: ProductQueryString["sortBy"]) => {
    setSelectedSortOption(option);
    onChangeSortBy(option);
    setIsDropdownOpen(false);
  };

  const selectedLabel =
    sortOptions.find((opt) => opt.value === selectedSortOption)?.label ||
    "정렬";

  return (
    <div className="w-full flex justify-end relative z-30 my-10">
      <ButtonBasic
        text={
          <span className="flex items-center gap-1">
            {selectedLabel} <RiArrowDownSFill />
          </span>
        }
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      />

      {isDropdownOpen && (
        <div className="absolute bg-white shadow-md p-5 w-36 box-border">
          <span className="bg-gray-500">X</span>
          {sortOptions.map((option) => (
            <li key={option.value} className="p-3">
              <ButtonBasic
                onClick={() => handleSortSelect(option.value)}
                text={option.label}
              />
            </li>
          ))}
        </div>
      )}
    </div>
  );
}
