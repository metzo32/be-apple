import { ReactNode } from "react";

interface RecommendBoxProps {
  children: ReactNode;
  title: string;
}

export default function RecommendBox({ children, title }: RecommendBoxProps) {
  return (
    <div className="w-full min-h-[120px] relative">
      <h3 className="text-lg md:text-2xl font-bold">
        {title}
      </h3>
      <span className="thick-line mb-3" />
      {children}
    </div>
  );
}
