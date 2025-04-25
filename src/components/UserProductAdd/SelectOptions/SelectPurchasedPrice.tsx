import { TextField } from "@mui/material";

interface SelectPurchasedPriceProps {
  displayedPrice: string;
  onChange: (value: string) => void;
}

export default function SelectPurchasedPrice({
  displayedPrice,
  onChange,
}: SelectPurchasedPriceProps) {
  return (
    <label className="flex flex-col gap-5 items-start text-2xl font-normal">
      해당 제품의 구매가를 작성해주세요.
      <TextField
        label="가격"
        variant="outlined"
        sx={{ width: "330px" }}
        value={displayedPrice}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
