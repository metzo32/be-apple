import OptionTitle from "./OptionTitleForm";
import CustomTextField from "@/components/designs/CustomTextField";

interface SelectPurchasedPriceProps {
  displayedPrice: string;
  onPriceChange: (value: string) => void;
}

export default function SelectPurchasedPrice({
  displayedPrice,
  onPriceChange,
}: SelectPurchasedPriceProps) {
  return (
    <OptionTitle title="구매한 가격을 작성해주세요.">
      <div className="w-full max-w-[300px] h-[40px] flex items-end justify-end">
        <CustomTextField
          id="userProductRegisterPrice"
          name="userProductRegisterPrice"
          label="가격"
          type="text"
          value={displayedPrice}
          handleChange={(e) => onPriceChange(e.target.value)}
          required={false}
        />
      </div>
    </OptionTitle>
  );
}
