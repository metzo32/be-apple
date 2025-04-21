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
      size="large"
      className={`${margin ? "mt-10" : ""}`}
    >
      {text}
    </Button>
  );
}
