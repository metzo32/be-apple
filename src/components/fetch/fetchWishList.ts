import { post, get } from "@/api/api";

export async function fetchWishList() {
  try {
    const response = await get("/wish/me");

    return response;
  } catch (error: any) {
    console.error(
      "위시리스트 로드 실패:",
      error.response?.data || error.message
    );
    return null;
  }
}

export async function fetchAddWish(wishData: {
  memo: string;
  productId: number;
}) {
  try {
    const response = await post("/wish", wishData);
    console.log("위시리스트 추가하기", response);
    return response;
  } catch (error: any) {
    console.error(
      "위시리스트 추가 실패:",
      error.response?.data || error.message
    );
    return null;
  }
}
