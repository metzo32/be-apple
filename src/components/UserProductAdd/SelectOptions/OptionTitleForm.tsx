import { ReactNode } from "react";

interface OptionTitleFormProps {
  title: string;
  children: ReactNode;
}

export default function OptionTitle({
  title,
  children,
}: OptionTitleFormProps) {
  return (
    <div className="w-full h-full flex items-center">
      <div className="w-full flex flex-col gap-5 md:gap-10">
        <h3 className="user-product-h3">{title}</h3>
        {children}
      </div>
    </div>
  );
}
