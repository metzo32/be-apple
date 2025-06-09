"use client";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

interface PickDateProps {
  pickedDate: Date | null; // 선택된 날짜
  changeDate: (newValue: Date) => void; // 변경 시 상위 컴포넌트에 알림
  minDate?: Date;
}

export default function PickDate({
  pickedDate,
  changeDate,
  minDate,
}: PickDateProps) {
  const handleChange = (newValue: Date | null) => {
    if (newValue) changeDate(newValue);
  };

  // new Date("April 11, 1976")
  return (
    <DemoContainer components={["DatePicker"]}>
      <DatePicker
        minDate={minDate}
        maxDate={new Date()} // 오늘 날짜
        value={pickedDate}
        onChange={handleChange}
      />
    </DemoContainer>
  );
}
