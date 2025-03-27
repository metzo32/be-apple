import Image from "next/image";
import ButtonStrong from "./designs/ButtonStrong";
import type { ItemProps } from "@/types/dataTypes";

export default function ProductCard({
  title,
  image,
  details,
  month,
}: ItemProps) {
  return (
    <div className="shrink-0 w-[250px] h-[280px] flex flex-col items-center gap-2">
      <Image
        src={image}
        alt={title}
        width={250}
        height={200}
      />
      <h3>{title}</h3>
      <p className="text-lg text-light">{details}</p>
      <p className="text-lg">구입 후 약 {month}개월 경과</p>
      {month && month >= 6 ? <ButtonStrong text="최신 제품 알아보기" margin={true}/> : null}
    </div>
  );
}
