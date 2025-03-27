"use client";

import { GoPlus } from "react-icons/go";
import useOpenSelect from "@/stores/useOpenSelect";

export default function AddButton() {
  const { isClicked, setIsClicked } = useOpenSelect();

  const handleClick = () => {
    setIsClicked(true);
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="w-12 h-12 rounded-full text-3xl text-white flex-shrink-0 bg-light flex items-center justify-center"
      >
        <GoPlus />
      </button>
    </div>
  );
}
