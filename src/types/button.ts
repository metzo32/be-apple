import { ReactNode } from "react";

export interface ButtonProps {
  text: ReactNode | string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "submit" | "reset" | "button" | undefined;
  margin?: boolean;
  onMouseLeave?: () => void;
}
