import OptionTitle from "./OptionTitleForm";
import { FaCheck } from "react-icons/fa6";

interface SelectMultiplePurchasedProps {
  isMultiplePurchased: boolean;
  value: number | string;
  handleRepurchasedCountChange: (count: number) => void;
  handleMultiplePurchased: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMultiplePurchasedBlur: () => void;
}

export default function SelectMultiplePurchased({
  isMultiplePurchased,
  value,
  handleRepurchasedCountChange,
  handleMultiplePurchased,
  handleMultiplePurchasedBlur,
}: SelectMultiplePurchasedProps) {

  return (
    <OptionTitle title="이 제품을 재구매한 적 있나요?">
      <ul className="h-[30px] flex flex-col xl:flex-row gap-3 xl:gap-26 text-sm md:text-base items-center">
        <li
          className={`cursor-pointer select-none flex items-center gap-3 hover:text-mid ${
            !isMultiplePurchased ? "text-green-600" : ""
          }`}
          onClick={() => {
            handleRepurchasedCountChange(0)
          }}
        >
          <span className="w-[20px] aspect-square">
            {!isMultiplePurchased && <FaCheck className="text-green-500" />}
          </span>
          아니요
        </li>

        <li
          className={`cursor-pointer select-none flex items-center gap-3 hover:text-mid ${
            isMultiplePurchased ? "text-green-600" : ""
          }`}
          onClick={() => {
            handleRepurchasedCountChange(1)
          }}
        >
          <span className="w-[20px] aspect-square">
            {isMultiplePurchased && <FaCheck className="text-green-500" />}
          </span>
          재구매했어요
        </li>

        {isMultiplePurchased && (
          <li className="flex items-center gap-2">
            <span className="text-sm">총</span>
            <input
              type="number"
              min={1}
              value={value}
              onChange={handleMultiplePurchased}
              onBlur={handleMultiplePurchasedBlur}
              className="border border-gray-300 rounded px-3 py-1 w-[80px] text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <span className="text-sm">회</span>
          </li>
        )}
      </ul>
    </OptionTitle>
  );
}
