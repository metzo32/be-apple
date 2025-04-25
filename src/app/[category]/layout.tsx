import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div>테스트</div>
      {children}
    </>
  );
}
