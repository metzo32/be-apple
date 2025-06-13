import { ReactNode } from "react";

interface SectionCompProps {
  title: string;
  children: ReactNode;
  line?: boolean; 
}

export default function UserSectionSm({ title, children, line }: SectionCompProps) {
  return (
    <div className={`userSection block md:hidden ${line ? "userSection-line" : ""}`}>
      <h2 className="user-title-sm">{title}</h2>
      {children}
    </div>
  );
}
