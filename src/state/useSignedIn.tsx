"use client"

import { create } from "zustand"

type AuthCheckStore = {
    isSignedIn: boolean;
    setIsSignedIn: (value: boolean) => void;
  };
  

export const useAuthCheck = create<AuthCheckStore>((set)=>({
    isSignedIn: false,
    setIsSignedIn: (value: boolean) => set({ isSignedIn: value})
}))