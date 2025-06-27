"use client";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

interface PickDateProps {
  pickedDate: Date | null;
  changeDate: (newValue: Date) => void;
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

  return (
    <DemoContainer
      components={["DatePicker"]}
      sx={{
        "& .MuiFormControl-root": {
          fontSize: {
            xs: "12px",
            md: "16px",
          },
        },
        "& .MuiInputBase-root": {
          padding: {
            xs: "6px 8px",
            md: "8px 12px",
          },
        },
        "& .MuiStack-root": {
          fontSize: {
            xs: "12px",
            md: "16px",
          },
        },
      }}
    >
      <DatePicker
        minDate={minDate}
        maxDate={new Date()}
        value={pickedDate}
        onChange={handleChange}
        slotProps={{
          textField: {
            size: "small",
            fullWidth: true,
          },
        }}
      />
    </DemoContainer>
  );
}
