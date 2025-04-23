"use client";
import SearchHeader from "./SearchHeader";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SearchHeader />
      {children}
    </>
  );
}
