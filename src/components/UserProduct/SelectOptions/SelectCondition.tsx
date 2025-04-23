import {
  UserProductCondition,
  UserProductConditionLables,
} from "@/types/userProduct";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

interface SelectConditionProps {
  condition: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SelectCondition({
  condition,
  onChange,
}: SelectConditionProps) {
    
  const conditions = Object.values(UserProductCondition); // 제품 손상도 배열

  return (
    <div className="flex flex-col gap-5">
      <h3 className="user-product-h3">제품 상태</h3>
      <RadioGroup
        aria-labelledby="condition-radio-buttons-group-label"
        value={condition}
        name="radio-buttons-group"
        onChange={onChange}
        sx={{
          width: "1000px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {conditions.map((condition) => (
          <FormControlLabel
            key={condition}
            value={condition}
            control={<Radio />}
            label={UserProductConditionLables[condition]}
            sx={{
              width: "50px",
            }}
          />
        ))}
      </RadioGroup>
    </div>
  );
}
