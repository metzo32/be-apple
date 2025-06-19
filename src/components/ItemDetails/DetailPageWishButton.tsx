"use client";

import { useProductDetailQuery } from "@/hooks/useProductQuery";
import WishButton from "../AddWish/WishButton";
import { useWishLoadQuery } from "@/hooks/useWishQuery";
import { useUserStore } from "@/stores/useUserStore";

interface DetailPageWishButtonProps {
  productId: number;
}

export default function DetailPageWishButton({
  productId,
}: DetailPageWishButtonProps) {
  const { user } = useUserStore();
  const { data: ProductDetailData } = useProductDetailQuery(productId);
  const { data: wishList } = useWishLoadQuery(user?.id ?? null);

  console.log("각 카드의 wishId", ProductDetailData?.wishId);

  // 디테일 정보 못가져오면 위시 버튼 띄우지 않음
  if (!ProductDetailData || !wishList) return null;

  const matchedWish = wishList.find((wish) => wish.productId === ProductDetailData.id);
  const productWithWish = {
    ...ProductDetailData,
    wishId: matchedWish?.id ?? null,
    isInWish: matchedWish?.id ? true : false,
  };

  return <WishButton product={productWithWish} />;
}
