import type { ButtonProps } from "@/types/button";
import { Button } from "@mui/material";

export default function ButtonBasic({ text, onClick, type }: ButtonProps) {
  return (
    <Button
      type={type}
      variant="text"
      onClick={onClick}
      className="hover:text-textHover"
      // style={{ fontSize: '14px', lineHeight: "16px" }}
      sx={{
        color: "#797979", // light
        boxShadow: "none",
        fontSize: "14px",
        "@media (max-width: 767px)": {
          fontSize: "10px",
        },
        padding: 0,
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
