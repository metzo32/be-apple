"use client";

import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

interface PickDatePrps {
  pickedDate: Date | null;
  changeDate: (newValue: Date) => void;
  minDate?: Date;
}

export default function PickDate({ pickedDate, changeDate, minDate }: PickDatePrps) {
  const [value, setValue] = useState<Date | null>(pickedDate); 

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
    if (newValue) {
      changeDate(newValue);
    }
  };
  // new Date("April 11, 1976")
  return (
    <DemoContainer components={["DatePicker"]}>
      <DatePicker
        minDate={minDate}
        maxDate={new Date()}
        value={pickedDate}
        onChange={handleChange}
      />
    </DemoContainer>
  );
}
