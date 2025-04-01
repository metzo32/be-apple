import { ItemProps } from "@/types/dataTypes";
import Image from "next/image";

export default function SearchCardServer({
  name,
  image,
  displaySize,
  details,
  price,
}: ItemProps) {
  return (
    <div className="flex flex-col gap-0 md:gap-2 relative">
      <Image
        src={image || "/assets/images/fallback.png"}
        alt={name}
        width={240}
        height={160}
      />
      <h5 className="font-bold">{name}</h5>
      <h5>{displaySize}</h5>
      <p className="light-p">{price}</p>
      <p className="text-light">{details}</p>
    </div>
  );
}
