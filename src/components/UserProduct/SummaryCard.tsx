import { ReactNode } from "react";
import { AiFillQuestionCircle } from "react-icons/ai";

interface SummaryCardProps {
  title: string;
  content: number | string;
  showQuestion?: boolean;
  openInfo?: () => void;
  isInfoOpen?: boolean;
  info?: string | ReactNode;
}

export default function SummaryCard({
  title,
  content,
  showQuestion,
  openInfo,
  isInfoOpen,
  info,
}: SummaryCardProps) {
  return (
    <div className="w-full py-2 md:py-5 border-b border-lineLight">
      <div className="hidden md:flex w-full items-center gap-1">
        <h5 className="text-bold">{title}</h5>
        {showQuestion && (
          <span className="relative">
            <button
              onClick={openInfo}
              className="flex items-center justify-center text-light"
            >
              <AiFillQuestionCircle />
            </button>

            {isInfoOpen && (
              <div className="absolute w-28 h-18 p-2 top-full z-5 left-full translate-x-1 -translate-y-full bg-lineLight">
                {info}
              </div>
            )}
          </span>
        )}
      </div>

      <div className="flex md:hidden w-full items-center gap-2">
        <h5 className="user-title-sm">{title}</h5>
        {showQuestion && (
          <button
            onClick={openInfo}
            className="flex items-center justify-center text-light"
          >
            <AiFillQuestionCircle />
          </button>
        )}
      </div>

      <p className="text-xl md:text-3xl font-bold text-text">{content}</p>
    </div>
  );
}
