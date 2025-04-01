import Image from "next/image";

interface CommentProps {
  userName: string;
  date: string;
  img01: string | null;
  img02: string | null;
  comment: string;
}

export default function Comment({ userName, date, img01, img02, comment }: CommentProps) {
  return (
    <div className="max-w-[600px] flex flex-col gap-5 pb-15 border-b-3 border-bglight">
      <div className="w-full p-3 flex flex-col gap-5 bg-bglight">
        <div className="flex justify-between">
          <h2 className="text-sm md:text-lg">{userName}</h2>
          <p className="light-p">{date}</p>
        </div>
        <p className="light-p">
          Macbook Air 13inch 10코어 CPU 10코어 GPU 16GB 통합 메모리 512GB SSD
        </p>
      </div>

      <p className="light-p">★★★★★</p>

      {(img01 || img02) && (
        <div className="grid grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-5">
          {img01 && (
            <span className="relative w-full aspect-[3/2]">
              <Image
                src={img01}
                alt="제품 이미지 1"
                fill
                className="object-cover"
              />
            </span>
          )}
          {img02 && (
            <span className="relative w-full aspect-[3/2]">
              <Image
                src={img02}
                alt="제품 이미지 2"
                fill
                className="object-cover"
              />
            </span>
          )}
        </div>
      )}

      <p className="light-p">{comment}</p>
    </div>
  );
}
