import type { ButtonProps } from "@/types/button";
import { Button } from "@mui/material";

export function ButtonBasic({ text, onClick, type }: ButtonProps) {
  return (
    <Button
      type={type}
      variant="text"
      onClick={onClick}
      className="hover:text-textHover"
      sx={{
        color: "#444444", // mid
        boxShadow: "none",
        fontSize: "14px",
        "@media (max-width: 767px)": {
          fontSize: "10px",
        },
        padding: 0,
        margin: 0,
        minWidth: 0,
        "&:hover": {
          boxShadow: "none",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundImage: "linear-gradient(to right, #476CF6, #C467F3)",
        },
      }}
    >
      {text}
    </Button>
  );
}

export function ButtonBasicLarge({ text, onClick, type }: ButtonProps) {
  return (
    <Button
      type={type}
      variant="text"
      onClick={onClick}
      className="hover:text-textHover"
      sx={{
        color: "#797979", // light
        boxShadow: "none",
        fontSize: "18px",
        "@media (max-width: 767px)": {
          fontSize: "12px",
        },
        padding: 0,
        margin: 0,
        minWidth: 0,
        "&:hover": {
          boxShadow: "none",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundImage: "linear-gradient(to right, #476CF6, #C467F3)",
        },
      }}
    >
      {text}
    </Button>
  );
}
