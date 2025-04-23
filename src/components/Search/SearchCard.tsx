import Image from "next/image";
import type { GetProductResponse } from "@/types/product";
import WishButton from "../AddWish/WishButton";
import Link from "next/link";
import PurchasedIcon from "./PurchasedIcon";
import { Button } from "@mui/material";

interface SearchCardProps {
  product: GetProductResponse;
}

export default function SearchCard({ product }: SearchCardProps) {
  return (
    <div className="w-[280px] bg-white shrink-0 flex flex-col justify-between items-start relative shadow-strong">
      {/* <div className="w-full flex justify-between items-center">
        <Button variant="outlined">
          <Link
            href={`/search/${product.category}/${product.id}`}
            className="btn-strong"
          >
            자세히 보기
          </Link>
        </Button>

        <PurchasedIcon product={product} />
      </div> */}

      <Link
        href={`/search/${product.category}/${product.id}`}
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
          <h5 className="font-bold">{product.name}</h5>
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
