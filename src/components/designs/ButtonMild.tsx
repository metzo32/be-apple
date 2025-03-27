import type { ButtonProps } from "@/types/button";

export default function ButtonBasic({ text, onClick, type }: ButtonProps) {
  return <button type={type} onClick={onClick} className="hover:text-textHover">{text}</button>;
}
