import Image from "next/image";
import type { ReviewType } from "@/types/product";
import { FaStar } from "react-icons/fa6";
import { formatDate } from "@/module/formatDate";

export default function Review({ review }: { review: ReviewType }) {
  const createdTime = formatDate(review.createdAt, "yyyy년 M월 d일 E요일");

  return (
    <div className="max-w-[600px] flex flex-col gap-5 pb-15 border-b-3 border-bglight">
      <div className="w-full p-3 flex flex-col gap-5 bg-bglight">
        <div className="flex justify-between">
          <h2 className="text-sm md:text-lg">{review.userName}의 리뷰</h2>
          <p className="light-p">{createdTime}</p>
        </div>
        <p className="light-p">
          Macbook Air 13inch 10코어 CPU 10코어 GPU 16GB 통합 메모리 512GB SSD
        </p>
        <div className="flex">
          {Array.from({ length: review.rating }).map((_, index) => (
            <FaStar key={index} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-5">
        {review.photos.map((photo, index) => (
          <span key={index} className="relative w-full aspect-[3/2]">
            <Image
              src={review.photos[index]}
              alt={`제품 이미지 ${index + 1}`}
              fill
              className="object-cover"
            />
          </span>
        ))}
      </div>

      <p className="light-p">{review.content}</p>
    </div>
  );
}
function formatTime(createdAt: Date, arg1: string): any {
  throw new Error("Function not implemented.");
}
