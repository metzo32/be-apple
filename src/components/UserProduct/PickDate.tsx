"use client";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useState } from "react";

interface PickDatePrps {
  pickedDate: Date | null;
  changeDate: (newValue: Date) => void;
}

export default function PickDate({ pickedDate, changeDate }: PickDatePrps) {
  const [value, setValue] = useState<Date | null>(pickedDate); 

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
    if (newValue) {
      changeDate(newValue);
    }
  };

  return (
    <DemoContainer components={["DatePicker"]}>
      <DatePicker
        minDate={new Date("April 11, 1976")}
        maxDate={new Date()}
        value={value}
        onChange={handleChange}
      />
    </DemoContainer>
  );
}
