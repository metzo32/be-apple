import { useRouter } from "next/navigation";
import { ButtonBasic } from "../designs/ButtonBasic";
import { differenceInMonths } from "date-fns";

export default function MonthDiff({
  purchasedAt,
}: {
  purchasedAt: string | null;
}) {
  const router = useRouter();

  const handleCheckNewProduct = (category: string) => {
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
        <p className="light-p mb-[3px] md:m-0">
          약 {checkRange(monthDiff)} 경과
        </p>
        {monthDiff >= 6 ? (
          <ButtonBasic
            text="최신 제품 알아보기"
            // TODO 경로 수정
            onClick={() => handleCheckNewProduct("test")}
          />
        ) : null}
      </div>
    </>
  ) : (
    <p className="light-p whitespace-nowrap">구매일 미입력</p>
  );
}
