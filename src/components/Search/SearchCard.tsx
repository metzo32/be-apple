"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { ProductDetail } from "@/types/productDetail";
import WishButton from "../AddWish/WishButton";

type SearchCardProps = ProductDetail & {
  wishList: number[];
  setWishList: React.Dispatch<React.SetStateAction<number[]>>;
};

export default function SearchCard({
  id,
  photos,
  name,
  price,
  generation,
  category,
  wishList, // 해당 아이템에 대한 GetWishResponse타입 전체
  setWishList,
}: SearchCardProps) {
  const router = useRouter();
  const handleRoute = () => {
    router.push(`/search/${category}/${id}`);
  };

  return (
    <div
      onClick={handleRoute}
      className="shrink-0 flex flex-col items-center gap-3 cursor-pointer relative"
    >
      <div className="flex flex-col gap-0 md:gap-2 relative">
        <Image
          src={"/assets/images/fallback.png"} // TODO photos[0] 안받아짐
          alt={name}
          width={240}
          height={160}
        />
      </div>
      <div className="w-full flex justify-between items-end">
        <div className="flex flex-col gap-2">
          <h5 className="font-bold">{name}</h5>
          <p className="light-p">{generation}</p>
          <p className="light-p">{price}</p>
        </div>

        <WishButton id={id} wishList={wishList} setWishList={setWishList} />
      </div>
    </div>
  );
}
