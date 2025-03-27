import { create } from "zustand";

interface AddButtonProps {
  isClicked: boolean;
  setIsClicked: (value: boolean) => void;
}

const useOpenSelect = create<AddButtonProps>((set) => ({
  isClicked: false,
  setIsClicked: (value) => set({ isClicked: value }),
}));

export default useOpenSelect;
