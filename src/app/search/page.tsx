"use client";

import ButtonStrong from "@/components/designs/ButtonStrong";
import { useState } from "react";
import SearchCard from "@/components/SearchCard";
import { macbookData } from "../../../public/fakeData/macbookData";

export default function SearchPage() {
  const [isShowAll, setIsShowAll] = useState<boolean>(false);
  const handleClick = () => {
    setIsShowAll(true);
  };

  return (
    <div className={`flex flex-col gap-10  ${isShowAll ? "pt-0" : "pt-72"}`}>
      {!isShowAll ? <h1 className="text-4xl font-bold">또는...</h1> : null}
      <div className="py-16 flex flex-col items-center gap-10">
        {!isShowAll ? (
          <>
            <h4 className="text-2xl text-textHover">
              특별히 찾는 제품이 없어요. 그냥 둘러볼래요.
            </h4>
            <ButtonStrong text="전체보기" onClick={handleClick} />
          </>
        ) : null}

        {isShowAll ? (
          <div className="w-full py-24 grid grid-cols-4 gap-20">
            {macbookData.map((item, index) => (
              <SearchCard key={index} title={item.title} image={item.image} details={item.details}/>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
