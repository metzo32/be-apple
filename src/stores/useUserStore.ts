import { create } from "zustand";
import { get } from "@/api/api";
import { persist } from "zustand/middleware";

type User = {
  id: number;
  name: string;
  email: string;
};

type UserStore = {
  user: User | null;
  isLoading: boolean;
  setUserInfo: (user: User) => void;
  getLocalToken: () => Promise<void>;
  resetUser: () => void;
};

export const useUserStore = create<UserStore>()(
	// 기존 상태 객체를 감싸준다.
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      setUserInfo: (user) => set({ user }),
      getLocalToken: async () => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          set({ isLoading: false });
          return;
        }
        try {
          const res = await get("/user/me");
          set({ user: res.data, isLoading: false });
        } catch (err) {
          console.error("유저 정보 불러오기 실패:", err);
          localStorage.removeItem("accessToken");
          set({ user: null, isLoading: false });
        }
      },
      resetUser: () => {
        localStorage.removeItem("accessToken");
        set({ user: null, isLoading: true });
      },
    }),
    // 두번째 인자로 저장할 키값과 저장할 필드 설정
    {
      name: "user-storage", // localStorage에 저장될 키
      partialize: (state) => ({ user: state.user }), // 저장할 상태 필드 지정
    }
  )
);