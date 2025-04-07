import { post, get, deleteCall } from "@/api/api";

// 유저 페이지에서 위시리스트 로드하기
export async function fetchWishList() {
  try {
    const response = await get("/wish/me");

    return response.data
  } catch (error: any) {
    console.error(
      "위시리스트 로드 실패:",
      error.response?.data || error.message
    );
    return null;
  }
}

// 제품 카드에서 하트 눌러서 추가하기
export async function fetchAddWish(wishData: {
  memo: string;
  productId: number;
}) {
  try {
    const response = await post("/wish", wishData);
    return response.data;
  } catch (error: any) {
    console.error(
      "위시리스트 추가 실패:",
      error.response?.data || error.message
    );
    return null;
  }
}

export async function fetchRemoveWish(id: number) {
  try {
    const response = await deleteCall(`/wish/${id}`);
    return true;
  } catch (error: any) {
    console.error(
      "위시리스트 제거 실패:",
      error.response?.data || error.message
    );
    return false;
  }
}
