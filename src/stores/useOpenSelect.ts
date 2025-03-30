import { create } from "zustand";

interface OpenSelectState {
  isClicked: boolean;
  setIsClicked: (value: boolean) => void;
  toggleIsClicked: () => void; // 토글 함수
}

const useOpenSelect = create<OpenSelectState>((set) => ({
  isClicked: false,
  setIsClicked: (value) => set({ isClicked: value }),
  toggleIsClicked: () =>
    set((state) => ({ isClicked: !state.isClicked })),
}));

export default useOpenSelect;
