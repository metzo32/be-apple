import { IoMdClose } from "react-icons/io";

interface CloseButtonProps {
  onClick: () => void;
  smallMode?: boolean;
}

export default function CloseButton({ onClick, smallMode }: CloseButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`absolute bg-light top-0 right-0 aspect-square text-white flex items-center justify-center
        ${smallMode ? "md:w-5 text-lg" : "w-7 md:w-10 text-2xl"}`}
    >
      <IoMdClose />
    </button>
  );
}
