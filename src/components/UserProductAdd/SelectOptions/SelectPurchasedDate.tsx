import PickDate from "../PickDate";
import OptionTitle from "./OptionTitleForm";

interface SelectPurchasedDateProps {
  pickedDate?: Date 
  onChangePurchasedDate: (date: Date) => void;
}

export default function SelectPurchasedDate({
  pickedDate,
  onChangePurchasedDate,
}: SelectPurchasedDateProps) {
  return (
    <OptionTitle title="구매 시기">
      <div className="w-full lg:w-[300px]">
        <PickDate
          pickedDate={pickedDate ?? null}
          changeDate={onChangePurchasedDate}
          minDate={new Date("April 11, 1976")}
        />
      </div>
    </OptionTitle>
  );
}
