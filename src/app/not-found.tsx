import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="py-80 flex flex-col items-center justify-center gap-15">
      <h1 className="text-4xl font-bold">잘못된 페이지입니다.</h1>
      <Link href={"/"} className="btn-strong">
        홈으로
      </Link>
    </div>
  );
}
