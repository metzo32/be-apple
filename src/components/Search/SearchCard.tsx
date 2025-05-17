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
  const idx = originalName.indexOf("(");
  const resultName = originalName.slice(0, idx)

  return (
    <div className=" h-[80px] lg:h-[150px] shrink-0 overflow-hidden flex gap-0 lg:gap-0 items-start relative">
      <Link
        href={`/${product.category}/${product.id}`} // product의 Id
        className="w-[130px] lg:w-[260px] h-[75px] lg:h-[150px] "
      >
        {/* TODO 이미지 대체 */}
        <img
          // src={product.photos[0]}
          src="/assets/images/macbook_m3_air_example.png"
          alt={product.name}
          className="object-cover"
          // fill
        />
      </Link>

      <div className="w-[150px] lg:w-[150px] h-full flex flex-col py-0 lg:py-2 justify-between">
        <div className="flex flex-col gap-0 lg:gap-2">
          <h5 className="text-sm lg:text-base font-bold whitespace-nowrap">{resultName}</h5>
          <p className="light-p">{product.generation}</p>

          <span className="flex gap-3 items-center">
            <p className="light-p">{product.price.toLocaleString()}원</p>
            {product.userProductId && (
              <span>
                <FaCheck className="text-green-500" />
              </span>
            )}
          </span>
        </div>

        <span className="w-full flex justify-end">
          <WishButton product={product} />
        </span>
      </div>
    </div>
  );
}
