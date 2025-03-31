import { create } from "zustand";

export const useList = create((set) => ({
  memoList: [],
  addMemo: (value) =>
    set((prev) => ({
      memoList: [
        ...prev.memoList,
        { content: value, id: new Date().getMilliseconds() },
      ],
    })),
  removeMemo: (id) =>
    set((prev) => ({ memoList: prev.memoList.filter((e) => e.id !== id) })),
}));
