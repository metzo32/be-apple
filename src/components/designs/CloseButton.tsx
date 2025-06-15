import { IoMdClose } from "react-icons/io";

interface CloseButtonProps {
  onClick: () => void;
}

export default function CloseButton({ onClick }: CloseButtonProps) {
  return (
    <button
      onClick={onClick}
      className="absolute bg-light top-0 right-0 w-7 md:w-10 aspect-square text-2xl text-white flex items-center justify-center"
    >
      <IoMdClose />
    </button>
  );
}
