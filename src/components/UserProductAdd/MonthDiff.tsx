import { useRouter } from "next/navigation";
import { ButtonBasic } from "../designs/ButtonBasic";
import { differenceInMonths } from "date-fns";
import { formatStringToDate } from "@/module/formatDate";

interface MonthDiffProps {
  purchasedAt: string | null;
  category: string;
}

export default function MonthDiff({ purchasedAt, category }: MonthDiffProps) {
  const router = useRouter();

  const purchasedDate = formatStringToDate(purchasedAt ?? undefined);
  const monthDiff =
    purchasedDate !== null
      ? differenceInMonths(new Date(), purchasedDate)
      : null;

  const checkRange = (monthDiff: number) => {
    if (monthDiff === null) return null; // undefined 또는 null 방지

    if (monthDiff >= 60) {
      if (typeof monthDiff !== "number" || isNaN(monthDiff)) return null;

      return <strong className="text-secondary">5년 이상</strong>;
    } else if (monthDiff >= 6) {
      return <strong className="text-secondary">{monthDiff}개월</strong>;
    } else {
      return `${monthDiff}개월`;
    }
  };

  const handleCheckNewProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    router.push(`/${category}`);
  };

  return monthDiff !== null ? (
    <div className="flex flex-row md:flex-col items-center gap-3 md:gap-1">
      <p className="light-p mb-[3px] md:m-0">약 {checkRange(monthDiff)} 경과</p>
      {monthDiff >= 6 && (
        <ButtonBasic text="최신 제품 보기" onClick={handleCheckNewProduct} />
      )}
    </div>
  ) : (
    <p className="light-p whitespace-nowrap text-lineLight">구매일 미입력</p>
  );
}
