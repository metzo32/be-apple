import { ReactNode } from "react";

export interface ButtonProps {
  text: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "submit" | "reset" | "button" | undefined;
  margin?: boolean;
  onMouseLeave?: () => void;
}
