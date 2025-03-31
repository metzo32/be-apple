import { ItemProps } from "@/types/dataTypes";
import Image from "next/image";

export default function SearchCardServer({ title, image, details }: ItemProps) {
  return (
    <>
      <Image
        src={image || "/assets/images/fallback.png"}
        alt={title}
        width={240}
        height={160}
      />
      <h5>{title}</h5>
      <p className="text-light">{details}</p>
    </>
  );
}
