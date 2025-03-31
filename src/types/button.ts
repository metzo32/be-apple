import { ReactNode } from "react";

export interface ButtonProps {
    text: string | ReactNode;
    onClick?: () => void;
    type?: "submit" | "reset" | "button" | undefined;
    margin?: boolean;
  }
  