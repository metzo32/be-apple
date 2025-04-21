import type { ButtonProps } from "@/types/button";
import { Button } from "@mui/material";

export default function ButtonBasic({ text, onClick, type }: ButtonProps) {
  return (
    <Button
      type={type}
      variant="outlined"
      onClick={onClick}
      className="hover:text-textHover"
    >
      {text}
    </Button>
  );
}
