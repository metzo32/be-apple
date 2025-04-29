import { get, post, deleteCall } from "@/api/api";
import type { CreateNewReviewReq } from "@/types/Review";

// 리뷰 생성하기
export async function createNewReview(
  productId: number,
  reviewData: CreateNewReviewReq
) {
  const { userProductId, rating, content, photos } = reviewData;
  try {
    const response = await post(`/review`, {
      userProductId,
      rating,
      content,
      photos,
    });

    return true;
  } catch (error) {
    console.error("리뷰 생성 실패:", error);
    return false;
  }
}

// 제품 별 리뷰 조회
export async function fetchReview(id: number) {
  try {
    const response = await get(`/review/${id}`);
    return response;
  } catch (error) {
    console.error("위시리스트 로드 실패:", error);
    return null;
  }
}

// 내가 쓴 리뷰 목록 조회
export async function fetchReviewMe() {
  try {
    const response = await get(`/review/me`);
    return response;
  } catch (error) {
    console.error("위시리스트 로드 실패:", error);
    return null;
  }
}

// 리뷰 지우기
export async function deleteReview(id: number) {
  try {
    const response = await deleteCall(`/review/${id}`);
    return response;
  } catch (error) {
    console.error("리뷰 삭제 실패:", error);
    return null;
  }
}
