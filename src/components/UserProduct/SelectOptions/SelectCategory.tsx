"use client";

import { useEffect, useState } from "react";
import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import {
  ProductCategoryEnum,
  ProductCategoryLabels,
} from "@/types/productCategory";
import RenderProducts from "./RenderProducts";

export default function SelectCategory() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategoryEnum>(
    ProductCategoryEnum.MAC
  );

  const categories = Object.values(ProductCategoryEnum);

  const handleCategorySelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(e.target.value as ProductCategoryEnum);
  };

  useEffect(() => {
    console.log("현재 선택한 카테고리", selectedCategory);
  }, [selectedCategory]);

  return (
    <div>
      <div className="w-full flex flex-row justify-between">
        <RadioGroup
          aria-labelledby="category-radio-buttons-group-label"
          name="radio-buttons-group"
          value={selectedCategory}
          onChange={handleCategorySelect}
          sx={{
            width: "1000px",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
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

      <div className="bg-blue-300">
        <RenderProducts selectedCategory={selectedCategory} />
      </div>

      {/* TODO 이 부분 invalid 한 경우, "다음"버튼 실행 금지 */}
      {/* <TextField
        id="outlined-basic"
        label="제품명 검색"
        variant="outlined"
        required
      /> */}
    </div>
  );
}
