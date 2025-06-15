import { TextField } from "@mui/material";

interface CustomTextFieldProps {
  id: string;
  name: string;
  label: string;
  type: string;
  value: string | number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
}

export default function CustomTextField({
  id,
  name,
  label,
  type,
  value,
  handleChange,
  required,
}: CustomTextFieldProps) {
  return (
    <TextField
  id={id}
  name={name}
  label={label}
  type={type}
  size="small"
  value={value}
  onChange={handleChange}
  required={required}
  sx={{
    width: "100%", 
  }}
  slotProps={{
    input: {
      sx: {
        fontSize: "14px", // 기본 입력값과 placeholder 크기
        "@media (max-width: 767px)": {
          fontSize: "12px", 
        },
      },
    },
    inputLabel: {
      sx: {
        fontSize: "14px",
        textAlign: "left",
        width: "100%",
        "@media (max-width: 767px)": {
          fontSize: "12px",
        },
      },
    },
  }}
/>

  );
}
