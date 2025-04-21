"use client";

import { addUserProduct } from "../fetch/fetchUserProduct";
import useOpenSelect from "@/stores/useOpenSelect";
import { CreateUserProductReqDto } from "@/types/userProduct";
import { useState } from "react";
import { GoPlus } from "react-icons/go"; // + 아이콘
import SelectComp from "./SelectComp";

export default function AddButton() {
  const { isClicked, setIsClicked } = useOpenSelect();
  const [newUserProduct, setNewUserProduct] =
    useState<CreateUserProductReqDto | null>(null);

  const handleClick = async () => {
    setIsClicked(true);

    if (newUserProduct) {
      const success = await addUserProduct(newUserProduct);
      if (success) {
        console.log("삭제 성공");
      } else {
        console.log("삭제 실패");
      }
    }
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={handleClick}
          className="w-12 h-12 rounded-full text-3xl text-white flex-shrink-0 bg-light flex items-center justify-center hover:brightness-110"
        >
          <GoPlus />
        </button>
      </div>

      <SelectComp/>
    </>
  );
}
