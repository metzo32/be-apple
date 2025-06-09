import PickDate from "../PickDate";
import OptionTitle from "./OptionTitleForm";

interface SelectPurchasedDateProps {
  pickedDate: Date | null;
  onChangePurchasedDate: (date: Date) => void;
}

export default function SelectPurchasedDate({
  pickedDate,
  onChangePurchasedDate,
}: SelectPurchasedDateProps) {
  return (
    <OptionTitle title="구매 시기">
      <PickDate
        pickedDate={pickedDate}
        changeDate={onChangePurchasedDate}
        minDate={new Date("April 11, 1976")}
      />
    </OptionTitle>
  );
}
