"use client";

import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import {
  ProductCategoryEnum,
  ProductCategoryLabels,
} from "@/types/productCategory";

interface SelectCategoryProps {
  onCategorySelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SelectCategory({
  onCategorySelect,
}: SelectCategoryProps) {
    
  const categories = Object.values(ProductCategoryEnum);

  return (
    <div>
      <div className="w-full flex flex-col justify-between">
        <RadioGroup
          aria-labelledby="category-radio-buttons-group-label"
          name="radio-buttons-group"
          onChange={onCategorySelect}
          sx={{
            width: "1000px",
            display: "grid",
            gridTemplateColumns: "repeat(1, 3fr)",
            gridColumnGap: "100px",
          }}
        >
          {categories.map((category) => (
            <FormControlLabel
              key={category}
              value={category}
              control={<Radio />}
              label={ProductCategoryLabels[category]}
              sx={{ width: "300px" }}
            />
          ))}
        </RadioGroup>
      </div>

      {/* TODO 이 부분 invalid 한 경우, "다음"버튼 실행 금지 */}
      <TextField
        id="outlined-basic"
        label="제품명 검색"
        variant="outlined"
        required
      />
    </div>
  );
}
