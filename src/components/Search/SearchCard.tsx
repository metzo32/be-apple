import Image from "next/image";
import type { GetProductResponse } from "@/types/product";
import WishButton from "../AddWish/WishButton";
import Link from "next/link";
import { FaCheck } from "react-icons/fa6";

interface SearchCardProps {
  userId?: number | null;
  product: GetProductResponse;
}

export default function SearchCard({
  userId,
  product,
}: SearchCardProps) {
  
  return (
    <div className="w-[260px] h-[350px] py-5 bg-white shrink-0 rounded-2xl overflow-hidden flex flex-col justify-between items-start relative shadow-strong">
      <Link
        href={`/${product.category}/${product.id}`} // product의 Id
        className="w-full flex flex-col gap-5"
      >
        {/* TODO 이미지 대체 */}
        <img
          src={product.photos[0]}
          alt={product.name}
          className="w-[260px] h-[150px] object-cover"
          // fill
        />

        <div className="px-5 flex flex-col gap-3">
          <h5 className="font-bold whitespace-nowrap">{product.name}</h5>
          <p className="light-p">{product.generation}</p>
        </div>
      </Link>

      <div className="w-full px-5 flex justify-between items-center gap-5">
        <div className="flex items-center gap-3">
          <p className="light-p">{product.price.toLocaleString()}원</p>
          {product.userProductId && (
            <span>
              <FaCheck className="text-green-500" />
            </span>
          )}
        </div>
        <WishButton
          product={product}
        />
      </div>
    </div>
  );
}
