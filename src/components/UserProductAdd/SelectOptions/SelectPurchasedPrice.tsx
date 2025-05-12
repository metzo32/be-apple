import { TextField } from "@mui/material";
import OptionTitle from "./OptionTitleForm";

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
      <TextField
        label="가격"
        variant="outlined"
        sx={{ width: "330px" }}
        value={displayedPrice}
        onChange={(event) => onChange(event.target.value)}
      />
    </OptionTitle>
  );
}
