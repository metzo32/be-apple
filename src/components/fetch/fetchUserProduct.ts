import { deleteCall, get, patch, post } from "@/api/api";
import { CreateUserProductReqDto } from "@/types/userProduct";

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

export async function createUserProduct(userProduct: CreateUserProductReqDto) {
  try {
    const response = await post("/user-product", userProduct);
    const productInfo = response.data;

    return productInfo;
  } catch (error) {
    console.error("유저 보유 목록 불러오기 실패:", error);
    return null;
  }
}

export async function editUserProduct(userProduct: CreateUserProductReqDto) {
  try {
    const response = await patch("/user-product", userProduct);

    return true;
  } catch (error) {
    console.error("유저 보유 목록 수정 실패:", error);
    return false;
  }
}

export async function deleteUserProduct(productId: number) {
  try {
    const response = await deleteCall("/user-product", productId);

    return true;
  } catch (error) {
    console.error("유저 보유 목록 삭제 실패:", error);
    return false;
  }
}
