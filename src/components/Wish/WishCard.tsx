import Image from "next/image";
import ButtonStrong from "../designs/ButtonStrong";

export default function WishCard() {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="flex flex-col items-center gap-2 shrink-0 cursor-pointer relative">
      <Image
        src="/assets/images/macbook01.png"
        alt="제품 이미지"
        width={250}
        height={200}
      />
      <h3>Macbook Air 15</h3>
      <p className="light-p">M4칩, 256GB</p>
      <ButtonStrong text="제품 보기" />
      <button
        onClick={handleDelete}
        className="absolute top-0 right-0 -translate-x-7 -translate-y-3 hover:brightness-110"
      >
        <Image
          src={"/assets/icons/remove.svg"}
          alt="삭제"
          width={35}
          height={35}
        />
      </button>
    </div>
  );
}
