import Image from "next/image";
import type { GetProductResponse } from "@/types/product";
import WishButton from "../AddWish/WishButton";
import Link from "next/link";
import { FaCheck } from "react-icons/fa6";

interface SearchCardProps {
  userId?: number | null;
  product: GetProductResponse;
}

export default function SearchCard({ userId, product }: SearchCardProps) {
  const originalName = product.name;
  // const idx = originalName.indexOf("(");
  // const resultName = originalName.slice(0, idx - 1);

  return (
    <div className="w-full md:w-auto shrink-0 overflow-hidden flex flex-col gap-0 lg:gap-0 items-start relative">
      <Link
        href={`/${product.category}/${product.id}`} // product의 Id
        className="w-full aspect-square md:aspect-auto md:w-[200px] md:h-[200px] bg-lineLight flex justify-center items-center"
      >
        <div
          className={`relative aspect-[88/51] md:aspect-auto
            ${
              product.category === "Mac"
                ? "w-[80%] md:w-[177px] md:h-[102px]"
                : "w-full md:w-[221px] md:h-[128px]"
            }
          `}
        >
          <Image
            src={product.photos[0]}
            alt={product.name}
            className="object-cover"
            fill
          />
        </div>
      </Link>

      <div className="w-full h-full flex flex-col p-2 md:px-0 md:py-2 justify-between">
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-1 lg:gap-2">
            <h5 className="text-sm lg:text-base font-bold whitespace-nowrap">
              {originalName}
            </h5>
            <p className="light-p">{product.generation}</p>

            <div className="flex gap-3 items-center">
              <p className="light-p">{product.price.toLocaleString()}원</p>
              {product.userProductId && (
                <span className="text-sm md:text-base">
                  <FaCheck className="text-green-500" />
                </span>
              )}
            </div>

            <p className="text-[10px] text-light">리뷰 및 평점</p>
          </div>
          <WishButton product={product} />
        </div>
      </div>
    </div>
  );
}
