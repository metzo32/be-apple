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
    <div className="h-[500px] flex flex-col">
      <h3 className="user-product-h3"> 해당 제품의 구매가를 작성해주세요.</h3>
      <TextField
        label="가격"
        variant="outlined"
        sx={{ width: "330px" }}
        value={displayedPrice}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
