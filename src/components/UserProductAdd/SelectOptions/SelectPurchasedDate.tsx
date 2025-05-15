import { FaRegCalendarCheck } from "react-icons/fa6";
import PickDate from "../PickDate";
import OptionTitle from "./OptionTitleForm";

interface SelectPurchasedDateProps {
  pickedDate: Date | null;
  onChange: (date: Date) => void;
}

export default function SelectPurchasedDate({
  pickedDate,
  onChange,
}: SelectPurchasedDateProps) {
  return (
    <OptionTitle title="구매 시기">

      <PickDate
        pickedDate={pickedDate}
        changeDate={onChange}
        minDate={new Date("April 11, 1976")}
      />
    </OptionTitle>
  );
}
