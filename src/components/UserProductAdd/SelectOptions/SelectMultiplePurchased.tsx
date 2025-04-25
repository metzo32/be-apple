import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";

interface SelectMultiplePurchasedProps {
  isMultiplePurchased: boolean;
  setIsMultiplePurchased: (value: boolean) => void;
  handleConditionSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: number | string;
  handleMultiplePurchased: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMultiplePurchasedBlur: () => void;

}

export default function SelectMultiplePurchased({
  isMultiplePurchased,
  setIsMultiplePurchased,
  handleConditionSelect,
  value,
  handleMultiplePurchased,
  handleMultiplePurchasedBlur,
}: SelectMultiplePurchasedProps) {
  return (
    <div className="w-[360px] flex flex-col gap-5 relative">
      <h3 className="user-product-h3">이 제품을 재구매한 적 있나요?</h3>

      <RadioGroup
        aria-labelledby="status-radio-buttons-group-label"
        value={isMultiplePurchased ? "true" : "false"}
        name="radio-buttons-group"
        onChange={handleConditionSelect}
        sx={{
          width: "500px",
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gridColumnGap: "180px",
        }}
      >
        <FormControlLabel
          value="false"
          control={<Radio />}
          label={"아니요"}
          onClick={() => setIsMultiplePurchased(false)} // TODO formData의 repurchaseCount를 0으로 업데이트
          sx={{
            width: "50px",
          }}
        />
        <FormControlLabel
          value="true"
          control={<Radio />}
          label={"재구매했어요"}
          onClick={() => setIsMultiplePurchased(true)}
          sx={{
            width: "50px",
          }}
        />
      </RadioGroup>

      {isMultiplePurchased && (
        <div className="flex items-center gap-3 absolute bottom-0 right-0 transform translate-y-[120%]">
          <h4>총</h4>
          <TextField
            value={value}
            variant="outlined"
            onChange={handleMultiplePurchased}
            onBlur={handleMultiplePurchasedBlur}
            sx={{
              width: "100px",
            }}
          />
          <h4>회</h4>
        </div>
      )}
    </div>
  );
}
