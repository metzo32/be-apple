import Image from "next/image";
import { fetchRemoveWish } from "../fetch/fetchWishList";
import RouteButton from "./RouteButton";
import { ProductDetailMac } from "@/types/product";

interface WishCardProps {
  id: number;
  wishList: ProductDetailMac[];
  setWishList: (list: ProductDetailMac[]) => void;
}

export default function WishCard({ id, wishList, setWishList }: WishCardProps) {
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const success = await fetchRemoveWish(id);
    if (success) {
      const updatedList = wishList.filter(item => item.id !== id);
      setWishList(updatedList);
    }
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
      <RouteButton id={id} />
      
      {/* 삭제버튼 */}
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

      {/* <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-textHover p-5">
        <p className="light-p">
          이 메모를 왜 남기냐면 이러쿵 저러쿵 하여 이러한 이유로 담아둔 나의
          위시리스트
        </p>
      </div> */}
    </div>
  );
}
