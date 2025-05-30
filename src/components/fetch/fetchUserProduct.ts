import { deleteCall, get, patch, post } from "@/api/api";
import type { CreateUserProductReqDto, UpdateUserProductReqDto } from "@/types/userProduct";

// 유저 보유 목록 로드
export async function fetchUserProduct() {
  const response = await get("/user-product");
  const productInfo = response.data;

  return productInfo;
}

// 유저 보유 목록 추가
export async function addUserProduct(userProduct: CreateUserProductReqDto) {
  const response = await post("/user-product", userProduct);
  const result = response.data;

  return result;
}

// 유저 보유 목록 수정
export async function editUserProduct(
  userProduct: UpdateUserProductReqDto,
  userProductId: number
) {
  const response = await patch(`/user-product/${userProductId}`, userProduct);

  return true;
}

// 유저 보유 목록 삭제
export async function deleteUserProduct(
  id: number,
  options?: { force?: boolean; onError?: (error: unknown) => void }
) {
  const response = await deleteCall(`/user-product/${id}`, {
    force: options?.force,
  });

  return true;
}
