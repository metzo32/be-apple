export interface ButtonProps {
    text: string;
    onClick?: () => void;
    type?: "submit" | "reset" | "button" | undefined;
    margin?: boolean;
  }
  