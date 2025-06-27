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
    <div className="w-full h-auto mt-10 md:mt-24 lg:mt-0 lg:h-full flex items-center">
      <div className="w-full h-auto flex flex-col gap-5 md:gap-10 relative">
        <h3 className="user-product-h3">{title}</h3>
        {children}
      </div>
    </div>
  );
}
