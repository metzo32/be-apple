import { create } from "zustand";

interface User {
  id: number;
  email: string;
  name: string;
}

interface UserInfoProps {
  userInfo: User | null;
  setUserInfo: (user: User) => void;
  resetUserInfo: () => void;
}

export const useUserInfo = create<UserInfoProps>((set) => ({
  userInfo: null,
  setUserInfo: (userInfo) => set({ userInfo }),
  resetUserInfo: () => set({ userInfo: null }),
}));
