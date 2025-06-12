import { post, get, deleteCall } from "@/api/api";
import { GetWishResponse } from "@/types/wishlist";

// 유저의 위시리스트 로드하기
export async function fetchWishList() {
  const response = await get<GetWishResponse[]>("/wish/me");
  console.log("나의 위시리스트", response.data);
  return response.data;
}

// 위시리스트 추가하기
export async function addWish(wishData: { memo: string; productId: number }) {
  const response = await post("/wish", wishData);
  return true;
}

// 위시리스트 삭제하기
export async function deleteWish(wishId: number) {
  const response = await deleteCall(`/wish/${wishId}`);
  return true;
}
