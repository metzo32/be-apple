import { deleteCall, get, patch, post } from "@/api/api";
import type { CreateUserProductReqDto } from "@/types/userProduct";

// 유저 보유 목록 생성
export async function fetchUserProduct() {
  try {
    const response = await get("/user-product");
    const productInfo = response.data;

    return productInfo;
  } catch (error) {
    console.error("유저 보유 목록 불러오기 실패:", error);
    return null;
  }
}

// 유저 보유 목록 추가
export async function addUserProduct(userProduct: CreateUserProductReqDto) {
  try {
    const response = await post("/user-product", userProduct);
    const result = response.data;

    return result;
  } catch (error) {
    console.error("유저 보유 목록 추가 실패:", error);
    return null;
  }
}

// 유저 보유 목록 수정
export async function editUserProduct(id: number) {
  try {
    const response = await patch("/user-product", id);

    return true;
  } catch (error) {
    console.error("유저 보유 목록 수정 실패:", error);
    return false;
  }
}

// 유저 보유 목록 삭제
export async function deleteUserProduct(
  id: number,
  getConfirm: () => Promise<boolean>
) {
  // GetUserProductResponse의 id
  try {
    const response = await deleteCall(`/user-product/${id}`, { force: false });

    return true;
  } catch (error) {
    if (error?.response?.status === 400) {
      // 작성한 리뷰가 있는 경우 400 에러
      const isConfirmed = await getConfirm();

      if (isConfirmed) {
        const retryDelete = await deleteCall(`/user-product/${id}`, {
          force: true,
        });

        return true;
      }
    }
    console.error("유저 보유 목록 삭제 실패:", error);
    return false;
  }
}
