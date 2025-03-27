import type { ButtonProps } from "@/types/button";

export default function ButtonStrong({ text, onClick, type, margin}: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className={`btn-strong ${margin ? "mt-10" : ""}`}>
      {text}
    </button>
  );
}
