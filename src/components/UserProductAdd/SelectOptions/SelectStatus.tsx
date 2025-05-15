import {
  UserProductStatus,
  UserProductStatusLabels,
} from "@/types/userProduct";
import PickDate from "../PickDate";
import { FaCheck } from "react-icons/fa6";
import { formateStringToDate } from "@/module/formatDate";
import OptionTitle from "./OptionTitleForm";

interface SelectStatusProps {
  selectedStatus: string;
  onStatusChange: (value: UserProductStatus) => void;
  purchasedDate?: string;
}

export default function SelectStatus({
  onStatusChange,
  selectedStatus,
  purchasedDate,
}: SelectStatusProps) {
  const currentStatus = Object.values(UserProductStatus);

  const minDate = purchasedDate
    ? formateStringToDate(purchasedDate)
    : new Date();

  return (
    <OptionTitle title="이 제품을...">
      <ul className="w-full flex flex-col xl:flex-row gap-3 xl:gap-36">
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

      {/* <div className="w-full flex justify-end">
        {selectedStatus === "SOLD" && (
          <div className="absolute bottom-0 right-0 transform translate-y-full">
            <h4>판매 시기</h4>
            <PickDate
              pickedDate={soldDate}
              changeDate={onSoldDateChange}
              minDate={minDate}
            />
          </div>
        )}
      </div> */}
    </OptionTitle>
  );
}
