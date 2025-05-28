import { ReactNode } from "react";

interface RecommendBoxProps {
  children: ReactNode;
  title: string;
}

export default function RecommendBox({ children, title }: RecommendBoxProps) {
  return (
    <div className="w-full border border-secondary p-10 relative rounded-md">
      <h3 className="px-3 text-xl bg-white absolute top-0 left-0 transform translate-x-[10px] -translate-y-1/2">
        {title}
      </h3>
      {children}
    </div>
  );
}
