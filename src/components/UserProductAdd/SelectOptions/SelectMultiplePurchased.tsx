import OptionTitle from "./OptionTitleForm";
import { FaCheck } from "react-icons/fa6";

interface SelectMultiplePurchasedProps {
  isMultiplePurchased: boolean;
  repurchasedNum: number;
  handleRepurchasedCountChange: (count: number) => void;
  handleRepurchased: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRepurchasedBlur: () => void;
}

export default function SelectMultiplePurchased({
  isMultiplePurchased,
  repurchasedNum,
  handleRepurchasedCountChange,
  handleRepurchased,
  handleRepurchasedBlur,
}: SelectMultiplePurchasedProps) {
  return (
    <OptionTitle title="이 제품을 재구매한 적 있나요?">
      <ul className="select-ul">
        <li
          className={`cursor-pointer select-none flex items-center gap-3 hover:text-mid ${
            !isMultiplePurchased ? "text-green-600" : ""
          }`}
          onClick={() => {
            handleRepurchasedCountChange(0);
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
            handleRepurchasedCountChange(1);
          }}
        >
          <span className="w-[20px] aspect-square">
            {isMultiplePurchased && <FaCheck className="text-green-500" />}
          </span>
          재구매했어요
        </li>

        {isMultiplePurchased && (
          <div className="flex items-center gap-2">
            <span className="text-sm">총</span>
            <input
              type="number"
              min={0}
              max={9}
              value={repurchasedNum}
              onChange={handleRepurchased}
              onBlur={handleRepurchasedBlur}
              className="border border-gray-300 rounded px-3 py-1 w-[80px] text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <span className="text-sm">회</span>
          </div>
        )}
      </ul>
    </OptionTitle>
  );
}
