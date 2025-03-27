import Image from "next/image";
import type { ItemProps } from "@/types/dataTypes";

export default function DetailCard({ title, image }: ItemProps) {
  return (
    <div className="w-1/2 flex flex-col items-center gap-10">
      <h1>{title}</h1>
      <Image src={image} alt={title} width={300} height={180} />
    </div>
  );
}
