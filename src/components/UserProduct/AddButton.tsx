"use client";

import { addUserProduct } from "../fetch/fetchUserProduct";
import useOpenSelect from "@/stores/useOpenSelect";
import { CreateUserProductReqDto } from "@/types/userProduct";
import { useState } from "react";
import { GoPlus } from "react-icons/go"; // + 아이콘
import SelectComp from "./SelectComp";
import { Button } from "@mui/material";
import ButtonStrong from "../designs/ButtonStrong";

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
        <ButtonStrong text="장비 추가하고 티어 올리기" onClick={handleClick} />
      </div>

      <SelectComp />
    </>
  );
}
