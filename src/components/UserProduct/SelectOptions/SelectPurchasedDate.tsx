import { FaRegCalendarCheck } from "react-icons/fa6";
import PickDate from "../PickDate";

interface SelectPurchasedDateProps {
  pickedDate: Date | null;
  onChange: (date: Date) => void;
}

export default function SelectPurchasedDate({
  pickedDate,
  onChange,
}: SelectPurchasedDateProps) {
  return (
    <div className="relative">
      <div className="flex gap-3 items-center">
        <h3 className="user-product-h3">구매 시기</h3>
        <button type="button" className="hover:text-textHover">
          <FaRegCalendarCheck />
        </button>
      </div>

      <PickDate
        pickedDate={pickedDate}
        changeDate={onChange}
        minDate={new Date("April 11, 1976")}
      />
    </div>
  );
}
