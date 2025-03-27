import Image from "next/image";
import ButtonStrong from "./designs/ButtonStrong";

export default function WishCard() {
  return (
    <div className="flex flex-col items-center gap-2 shrink-0">
      <Image
        src="/assets/images/macbook01.png"
        alt="제품 이미지"
        width={250}
        height={200}
      />
      <h3>Macbook Air 15</h3>
      <p className="text-lg text-light">M4칩, 256GB</p>
      <ButtonStrong text="제품 보기" margin={true} />
    </div>
  );
}
