import { ProductQueryString } from "@/types/productCategory";
import { ButtonBasic } from "./designs/ButtonBasic";
import { RiArrowUpSFill, RiArrowDownSFill } from "react-icons/ri";

interface SortButtonProps {
  onChangeSortBy: (sortBy: ProductQueryString["sortBy"]) => void;
  onChangeOrder: (order: ProductQueryString["order"]) => void;
  order: any,
}

export default function SortButton({
  onChangeSortBy,
  onChangeOrder,
  order
}: SortButtonProps) {

  const sortOptions: { label: string; value: ProductQueryString["sortBy"] }[] =
    [
      { label: "출시일 순", value: "releasedDate" },
      { label: "가격 순", value: "price" },
      { label: "리뷰 많은 순", value: "reviewCount" },
    ];

  const orderOptions: { label: string; value: ProductQueryString["order"] }[] =
    [
      { label: "오름차순", value: "asc" },
      { label: "내림차순", value: "desc" },
    ];

  return (
    <div className="absolute -bottom-24 right-0 md:-bottom-30 flex gap-5 z-30">
      <div className="flex flex-col p-3 bg-white shadow-strong">
        {sortOptions.map((sortOption) => (
          <span key={sortOption.label} className="flex items-center gap-2">
            <ButtonBasic
              text={sortOption.label}
              onClick={() => onChangeSortBy(sortOption.value)}
            />
            <div className="w-[15px] flex flex-col">
              {order === "asc" ? (
                <ButtonBasic
                  text={<RiArrowUpSFill />}
                  onClick={() => onChangeOrder(orderOptions[0].value)}
                />
              ) : (
                <ButtonBasic
                  text={<RiArrowDownSFill />}
                  onClick={() => onChangeOrder(orderOptions[1].value)}
                />
              )}
            </div>
          </span>
        ))}
      </div>
    </div>
  );
}
