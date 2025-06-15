import ButtonStrong from "@/components/designs/ButtonStrong";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="py-24 md:py-36 xl:py-64 flex flex-col items-center justify-center gap-5 md:gap-10 xl:gap-15">
      <h1 className="text-lg md:text-2xl font-bold">잘못된 페이지입니다.</h1>
      <Link href={"/"}>
        <ButtonStrong text="홈으로" />
      </Link>
    </div>
  );
}
