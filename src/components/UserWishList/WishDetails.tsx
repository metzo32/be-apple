import Image from "next/image";
import { useState } from "react";

export default function WishDetails() {
  const [isScreenOpen, setIsScreenOpen] = useState<boolean>(true);

  const handleCloseScreen = () => {
    setIsScreenOpen(false);
  };

  return isScreenOpen ? (
    <div className="overlay global-px">
      <div className="bg-custombg h-screen shadow-2xl p-24">
        <Image
          src="/assets/images/fallback.png"
          alt="제품이미지"
          width={800}
          height={400}
        />
      </div>
      <button
        onClick={handleCloseScreen}
        className="absolute top-0 right-0 p-5 hover:brightness-150"
      >
        <Image
          src="/assets/icons/close.svg"
          alt="닫기"
          width={35}
          height={35}
        />
      </button>
    </div>
  ) : null;
}
