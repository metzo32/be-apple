import { useEffect } from "react";
import Image from "next/image";
import type { GetProductResponse } from "@/types/product";
import WishButton from "../AddWish/WishButton";
import Link from "next/link";
import { FaCheck } from "react-icons/fa6";

interface SearchCardProps {
  product: GetProductResponse;
}

export default function SearchCard({ product }: SearchCardProps) {

  useEffect(()=>{
    console.log(product.userProductId)
  },[product])

  return (
    <div className="w-[280px] bg-white shrink-0 rounded-2xl overflow-hidden flex flex-col justify-between items-start relative shadow-strong">
      <Link
        href={`/${product.category}/${product.id}`}
        className="w-[280px] h-[200px] bg-gray-400"
      >
        <span className="w-[280px] h-[280px] bg-gray-400" />
        {/* <Image
          src={"/assets/images/macbook01.png"} // TODO photos[0] 안받아짐
          alt={product.name}
          fill
          className="object-cover"
        /> */}
      </Link>

      <div className="w-full flex justify-between items-end gap-5 p-5">
        <div className="w-full flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <h5 className="font-bold">{product.name}</h5>
            {!product.userProductId && <span><FaCheck className="text-green-500"/></span>}
          </div>
          <p className="light-p">{product.generation}</p>
          <p className="light-p">{product.price.toLocaleString()}원</p>
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
