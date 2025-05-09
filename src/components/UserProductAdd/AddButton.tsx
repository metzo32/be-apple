"use client";

import { useState } from "react";
import { addUserProduct } from "../fetch/fetchUserProduct";
import { CreateUserProductReqDto } from "@/types/userProduct";
import SelectComp from "./SelectComp";
import ButtonStrong from "../designs/ButtonStrong";

export default function AddButton() {
  const [isSelectWindowOpened, setIsSelectWindowOpened] = useState(false);
  const [newUserProduct, setNewUserProduct] =
    useState<CreateUserProductReqDto | null>(null);

  const handleClick = async () => {
    setIsSelectWindowOpened(true);

    if (newUserProduct) {
      const success = await addUserProduct(newUserProduct);
      if (success) {
        console.log("추가 성공");
      } else {
        console.log("추가 실패");
      }
    }
  };

  return (
    <>
      <div className="relative">
        <ButtonStrong text="장비 추가하고 티어 올리기" onClick={handleClick} />
      </div>

      <SelectComp
        isSelectWindowOpened={isSelectWindowOpened}
        setIsSelectWindowOpened={setIsSelectWindowOpened}
        onOpen={handleClick}
      />
    </>
  );
}
