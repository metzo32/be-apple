import type { ItemProps } from "@/types/dataTypes";
import Image from "next/image";

export default function SearchCard({ title, image, details }: ItemProps) {
  return (
    <div className="shrink-0 flex flex-col items-center gap-3">
      <Image src={image} alt={title} width={240} height={60} />
      <h5>{title}</h5>
      <p className="text-light">{details}</p>
    </div>
  );
}
