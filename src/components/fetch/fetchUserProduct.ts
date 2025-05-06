import { deleteCall, get, patch, post } from "@/api/api";
import type { CreateUserProductReqDto } from "@/types/userProduct";
import { AxiosError, isAxiosError } from "axios";

// 유저 보유 목록 로드
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
  options?: { force?: boolean; onError?: (error: unknown) => void }
) {
  // GetUserProductResponse의 id
  try {
    const response = await deleteCall(`/user-product/${id}`, {
      force: options?.force,
    });

    return true;
  } catch (error) {
    options?.onError?.(error)
    console.error("유저 보유 목록 삭제 실패:", error);
    return false;
  }
}
