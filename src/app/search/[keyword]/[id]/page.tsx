"use client";

import { useState } from "react";
import Image from "next/image";
import Comment from "@/components/itemDetails/Comment";
import WriteComment from "@/components/itemDetails/WriteComment";
import { commentArr } from "../../../../../public/fakeData/comment";

export default function DetailPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenComment = () => {
    setIsOpen(true);
  };

  return (
    <>
      <section className="flex flex-col items-center gap-10 mb-20">
        <Image
          src={"/assets/images/fallback.png"}
          alt="제품 이미지"
          width={800}
          height={400}
        />
      </section>

      <section className="w-full flex flex-col gap-10 mb-20">
        <h1>제품 이름</h1>
        <p>제품에 대한 설명</p>
      </section>

      <section className="w-full flex flex-col gap-10 mb-20">
        <h1>리뷰</h1>
        <button
          onClick={handleOpenComment}
          className="w-[200px] bg-mid text-custombg p-2 hover:bg-textHover"
        >
          나도 리뷰 작성하기
        </button>
        {isOpen && <WriteComment isOpen={isOpen} setIsOpen={setIsOpen} />}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-20">
          {commentArr.map((item, index) => (
            <Comment
              key={index}
              userName={item.userName}
              date={item.date}
              img01={item.img01}
              img02={item.img02}
              comment={item.comment}
            />
          ))}
        </div>
      </section>
    </>
  );
}
