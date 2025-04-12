import { post, get, deleteCall } from "@/api/api";

// 유저의 위시리스트 로드하기
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
export async function addWish(wishData: {
  memo: string;
  productId: number;
}) {
  // 내려주는 데이터가 특별히 없기 때문에 return값을 boolean으로 처리하면 성공/실패여부를 알 수 있다.
  // 만일 따로 내려오는 데이터가 있다면 return response.data / return null
  try { 
    const response = await post("/wish", wishData);
    return true; 
  } catch (error: any) {
    console.error(
      "위시리스트 추가 실패:",
      error.response?.data || error.message
    );
    return false;
  }
}

export async function deleteWish(id: number) {
  try {
    const response = await deleteCall(`/wish/${id}`);
    console.log("삭제 요청 성공:", response);
    return true;
  } catch (error: any) {
    console.error(
      "위시리스트 제거 실패:",
      error.response?.data || error.message
    );
    return false;
  }
}
