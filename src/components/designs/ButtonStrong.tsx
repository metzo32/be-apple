import Button from "@mui/material/Button";

import type { ButtonProps } from "@/types/button";

export default function ButtonStrong({
  text,
  onClick,
  type,
  margin,
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
      }}
    >
      {text}
    </Button>
  );
}

export function ButtonMedium({ text, onClick, type, margin }: ButtonProps) {
  return (
    <Button
      color="secondary"
      variant="outlined"
      type={type}
      onClick={onClick}
      size="medium"
      className={`${margin ? "mt-10" : ""}`}
      sx={{}}
    >
      {text}
    </Button>
  );
}
