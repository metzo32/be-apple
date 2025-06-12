"use client";

import { useProductDetailQuery } from "@/hooks/useProductQuery";
import ButtonStrong, { ButtonDisabled } from "../designs/ButtonStrong";
import { Button } from "@mui/material";
import { useState } from "react";
import { useWishAddMutation } from "@/hooks/useWishQuery";
import { useUserStore } from "@/stores/useUserStore";

interface AddToWishDetailProps {
  productId: number;
}

export default function AddToWishDetail({ productId }: AddToWishDetailProps) {
  const { user } = useUserStore();
  const { data: productDetailData } = useProductDetailQuery(productId);
  const addWishMutation = useWishAddMutation();
  const [isHovered, setIsHovered] = useState(false);

  if (!user) {
    return null;
  }

  console.log("클라이언트에서의 디테일", productDetailData);

  if (!productDetailData) {
    return (
      <Button variant="contained" disabled>
        위시리스트 추가 여부를 불러오지 못했습니다.
      </Button>
    );
  }

  const handleAddToWish = () => {
    addWishMutation.mutate({ memo, productId });
  };

  const isInWish = Boolean(productDetailData.wishId);

  return (
    <div
      className="w-auto self-start"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isInWish ? (
        isHovered ? (
          <ButtonStrong text="위시리스트에서 제거하기" type="button" />
        ) : (
          <ButtonDisabled text="위시리스트에 추가되었어요" />
        )
      ) : (
        <ButtonStrong
          text="위시리스트에 추가"
          type="button"
          onClick={handleAddToWish}
        />
      )}
    </div>
  );
}
