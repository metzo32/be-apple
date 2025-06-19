import { TextField } from "@mui/material";
import OptionTitle from "./OptionTitleForm";
import CustomTextField from "@/components/designs/CustomTextField";

interface SelectPurchasedPriceProps {
  displayedPrice: string;
  onChange: (value: string) => void;
}

export default function SelectPurchasedPrice({
  displayedPrice,
  onChange,
}: SelectPurchasedPriceProps) {
  return (
    <OptionTitle title="구매한 가격을 작성해주세요.">
      <div className="w-full max-w-[300px]">
        <CustomTextField
          id="userProductRegisterPrice"
          name="userProductRegisterPrice"
          label="가격"
          type="text"
          value={displayedPrice}
          handleChange={(event) => onChange(event.target.value)}
          required={false}
        />
      </div>
    </OptionTitle>
  );
}
