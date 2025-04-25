import {
  UserProductStatus,
  UserProductStatusLabels,
} from "@/types/userProduct";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import PickDate from "../PickDate";

interface SelectStatusProps {
  status: string;
  onStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSoldSelected: boolean;
  setIsSoldSelected: (value: boolean) => void;
  soldDate: Date | null;
  onSoldDateChange: (date: Date) => void;
  purchasedDate: Date | null;
}

export default function SelectStatus({
  status,
  onStatusChange,
  isSoldSelected,
  setIsSoldSelected,
  soldDate,
  onSoldDateChange,
  purchasedDate,
}: SelectStatusProps) {
  const currentStatus = Object.values(UserProductStatus);

  return (
    <div className="relative">
      <div className="w-full h-[150px] flex flex-col gap-5 justify-center">
        <h3 className="user-product-h3">이 제품을...</h3>
        <RadioGroup
          aria-labelledby="status-radio-buttons-group-label"
          value={status}
          name="radio-buttons-group"
          onChange={(e) => {
            onStatusChange(e);
            const isSold = e.target.value === "SOLD";
            setIsSoldSelected(isSold);
          }}
          sx={{
            width: "940px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {currentStatus.map((statusOption) => (
            <FormControlLabel
              key={statusOption}
              value={statusOption}
              control={<Radio />}
              label={UserProductStatusLabels[statusOption]}
            />
          ))}
        </RadioGroup>
      </div>

      <div className="w-full flex justify-end">
        {isSoldSelected && (
          <div className="absolute bottom-0 right-0 transform translate-y-full">
            <h4>판매 시기</h4>
            <PickDate
              pickedDate={soldDate}
              changeDate={onSoldDateChange}
              minDate={purchasedDate || new Date()}
            />
          </div>
        )}
      </div>
    </div>
  );
}
