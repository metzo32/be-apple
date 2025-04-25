import { differenceInMonths } from "date-fns";
import ButtonStrong from "../designs/ButtonStrong";

export default function MonthDiff({
  purchasedAt,
}: {
  purchasedAt: string | null;
}) {
  const purchasedAtToMonth = (purchasedAt: string) => {
    const result = differenceInMonths(purchasedAt, new Date());
    return result;
  };
  const monthDiff = purchasedAt ? purchasedAtToMonth(purchasedAt) : null;

  return monthDiff ? (
    <>
      <p className="text-lg">
        구입 후 약{" "}
        {monthDiff >= 6 ? <strong>{monthDiff}개월</strong> : `${monthDiff}개월`}{" "}
        경과
      </p>
      {monthDiff >= 6 ? <ButtonStrong text="최신 제품 알아보기" /> : null}
    </>
  ) : (
    <>
      <p className="text-lg">날짜가 입력되지 않았습니다.</p>
    </>
  );
}
