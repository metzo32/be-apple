import Button from "@mui/material/Button";

import type { ButtonProps } from "@/types/button";

export default function ButtonStrong({
  text,
  onClick,
  type,
  margin,
  onMouseLeave,
}: ButtonProps) {
  return (
    <Button
      variant="contained"
      type={type}
      onClick={onClick}
      size="medium"
      className={`${margin ? "mt-10" : ""}`}
      sx={{
        background: "linear-gradient(to right, #476CF6, #C467F3)",
        fontSize: "14px",
        paddingX: "10px",
        paddingY: "3px",
        "@media (max-width: 767px)": {
          fontSize: "12px",
          paddingX: "8px",
          paddingY: "2px",
        },
      }}
    >
      {text}
    </Button>
  );
}

export function ButtonMedium({
  text,
  onClick,
  type,
  margin,
  onMouseLeave,
}: ButtonProps) {
  return (
    <Button
      color="secondary"
      variant="outlined"
      type={type}
      onClick={onClick}
      onMouseLeave={onMouseLeave}
      size="medium"
      className={`${margin ? "mt-10" : ""}`}
      sx={{
        fontSize: "14px",
        paddingX: "10px",
        paddingY: "3px",
        "@media (max-width: 767px)": {
          fontSize: "12px",
          paddingX: "8px",
          paddingY: "2px",
        },
      }}
    >
      {text}
    </Button>
  );
}

export function ButtonDisabled({ text }: ButtonProps) {
  return (
    <Button
      variant="contained"
      size="medium"
      disabled
      sx={{
        fontSize: "14px",
        paddingX: "10px",
        paddingY: "3px",
        "@media (max-width: 767px)": {
          fontSize: "12px",
          paddingX: "8px",
          paddingY: "2px",
        },
      }}
    >
      {text}
    </Button>
  );
}
