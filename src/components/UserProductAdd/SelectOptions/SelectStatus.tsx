import {
  UserProductStatus,
  UserProductStatusLabels,
} from "@/types/userProduct";
import PickDate from "../PickDate";
import { FaCheck } from "react-icons/fa6";
import { formatStringToDate } from "@/module/formatDate";
import OptionTitle from "./OptionTitleForm";
import { useEffect } from "react";

interface SelectStatusProps {
  selectedStatus: string;
  onStatusChange: (value: UserProductStatus) => void;
  soldDate?: string;
  purchasedAt?: string;
  onSoldDateChange: (date: Date) => void;
}

export default function SelectStatus({
  onStatusChange,
  selectedStatus,
  soldDate,
  purchasedAt,
  onSoldDateChange,
}: SelectStatusProps) {
  const currentStatus = Object.values(UserProductStatus);

  // 구매일이 등록되어 있다면 구매일 기준, 없다면 전체 시기
  const minDate = purchasedAt ? formatStringToDate(purchasedAt) : new Date();

  return (
    <OptionTitle title="이 제품을...">
      <ul className="select-ul">
        {currentStatus.map((status) => (
          <li
            key={status}
            onClick={() => onStatusChange(status)}
            className={`text-sm md:text-base cursor-pointer select-none flex items-center gap-3 hover:text-mid ${
              selectedStatus === status ? "text-green-600" : ""
            }`}
          >
            <span className="w-[20px] aspect-square">
              {selectedStatus === status && (
                <FaCheck className="text-green-500" />
              )}
            </span>
            {UserProductStatusLabels[status]}
          </li>
        ))}
      </ul>

      {selectedStatus === UserProductStatus.SOLD && (
        <>
          {/* xl이하 뷰 */}
          <div
            className="w-[200px] md:w-auto block xl:hidden absolute bottom-0 transform 
                 left-0 translate-x-[15%] translate-y-[120%]"
          >
            <h4>판매 시기</h4>
            <PickDate
              pickedDate={soldDate ? formatStringToDate(soldDate) : null}
              changeDate={onSoldDateChange}
               minDate={minDate ?? new Date("April 11, 1976")}
            />
          </div>

          {/* xl이상 뷰 */}
          <div
            className="hidden xl:block absolute bottom-0 transform 
                 right-0 -translate-x-3/4 translate-y-[120%]"
          >
            <h4>판매 시기</h4>
            <PickDate
              pickedDate={soldDate ? formatStringToDate(soldDate) : null}
              changeDate={onSoldDateChange}
              minDate={minDate ?? new Date("April 11, 1976")}
            />
          </div>
        </>
      )}
    </OptionTitle>
  );
}
