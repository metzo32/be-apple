import Image from "next/image";
import type { GetProductResponse } from "@/types/product";
import WishButton from "../AddWish/WishButton";
import Link from "next/link";
import { FaCheck } from "react-icons/fa6";

type SearchCardProps = {
  product: GetProductResponse;
};

export default function SearchCard({ product }: SearchCardProps) {
  return (
    <div className="bg-cardBd p-5 rounded-2xl shrink-0 w-[300px] h-[500px] flex flex-col justify-between items-start gap-3 relative shadow-strong">
      <div className="w-full flex justify-between items-center">
        <Link
          href={`/search/${product.category}/${product.id}`}
          className="btn-strong"
        >
          자세히 보기
        </Link>

        <FaCheck />
      </div>

      <Link
        href={`/search/${product.category}/${product.id}`}
        className="w-[260px] h-[500px] flex flex-col gap-0 md:gap-2 relative"
      >
        <Image
          src={"/assets/images/macbook01.png"} // TODO photos[0] 안받아짐
          alt={product.name}
          fill
          className="object-cover"
        />
      </Link>
      <div className="w-full flex justify-between items-end gap-5">
        <div className="w-full flex flex-col gap-2">
          <h5 className="font-bold">{product.name}</h5>
          <p className="light-p">{product.generation}</p>
          <p className="light-p">{product.price}</p>
        </div>

        <WishButton
          wishId={product.wishId}
          isInWish={product.isInWish}
          productId={product.id}
        />
      </div>
    </div>
  );
}
