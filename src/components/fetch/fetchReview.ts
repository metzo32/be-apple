import { get, post, deleteCall, patch } from "@/api/api";
import type { CreateNewReviewReq, Review } from "@/types/Review";

// 리뷰 생성하기
export async function createNewReview(
  reviewData: CreateNewReviewReq
) {
  const { userProductId, rating, content, photos } = reviewData;
  return post(`/review`, {
    userProductId,
    rating,
    content,
    photos,
  });
}

// 리뷰 수정하기
export async function editReview(
  id: number,
  reviewData: Partial<CreateNewReviewReq>
) {
  const { userProductId, rating, content, photos } = reviewData;

  return patch(`/review/${id}`, {
    userProductId,
    rating,
    content,
    photos,
  });
}

// 제품 별 리뷰 조회
export async function fetchReview(id: number) {
  const response = await get<Review>(`/review/${id}`);
  return response;
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
  const response = await deleteCall(`/review/${id}`);
  return response;
}
