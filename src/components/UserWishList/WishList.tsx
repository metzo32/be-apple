import WishCard from "./WishCard";
import { useWishlist } from "@/hooks/useWishlist";

export default function WishList() {
  const wishList = useWishlist();

  if (wishList.length === 0) {
    return <p>위시리스트가 비어있습니다.</p>
  }

  return wishList.map((item, index) => <WishCard key={index} />);
}
