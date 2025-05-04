import { differenceInMonths } from "date-fns";
import ButtonBasic from "../designs/ButtonBasic";
import { useRouter } from "next/navigation";

export default function MonthDiff({
  purchasedAt,
}: {
  purchasedAt: string | null;
}) {
  const router = useRouter();

  const handleRouter = (category: string) => {
    router.push(category);
  };

  const purchasedAtToMonth = (purchasedAt: string) => {
    const result = differenceInMonths(purchasedAt, new Date());
    return result;
  };
  const monthDiff = purchasedAt ? purchasedAtToMonth(purchasedAt) * -1 : null;

  const checkRange = (monthDiff: number) => {
    if (!monthDiff) return;

    if (monthDiff >= 60) {
      return <strong className="text-secondary">5년 이상</strong>;
    } else if (monthDiff >= 6) {
      return <strong className="text-secondary">{monthDiff}개월</strong>;
    } else {
      return `${monthDiff}개월`;
    }
  };

  return monthDiff ? (
    <>
      <div className="flex flex-row md:flex-col items-center gap-3 md:gap-1">
        <p className="light-p">
          약 {checkRange(monthDiff)}
          {" "}경과
        </p>
        {monthDiff >= 6 ? (
          <ButtonBasic
            text="최신 제품 알아보기"
            onClick={() => handleRouter("a")}
          />
        ) : null}
      </div>
    </>
  ) : null;
}
