"use client";

import { useProductDetailQuery } from "@/hooks/useProductQuery";
import WishButton from "../AddWish/WishButton";

interface DetailPageWishButtonProps {
  productId: number;
}

export default function DetailPageWishButton({
  productId,
}: DetailPageWishButtonProps) {
  const { data: ProductDetailData } = useProductDetailQuery(productId);

  console.log("다시 불러온 디테일", ProductDetailData)

  // 디테일 정보 못가져오면 위시 버튼 띄우지 않음
  if (!ProductDetailData) {
    return null;
  }

  return <WishButton product={ProductDetailData} />;
}
