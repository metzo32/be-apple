// export interface CreateReviewReq {
//   userProductId: number;
//   rating: number;
//   content: string;
//   photos: [string?, string?];

//   userName: string;
//   date: string;
// }

export interface CreateNewReviewReq {
  userProductId: number;
  rating: number;
  content: string;
  photos?: string[];
}

export interface Review {
  // 리뷰 ID
  id: number;
  // 리뷰 작성일시
  createdAt: Date;
  // 리뷰 수정일시
  updatedAt: Date;
  // 평점
  rating: number;
  // 리뷰 내용
  content: string;
  // 리뷰 사진 목록
  photos: string[];
  // 작성자 유저 ID
  userId: number;
  // 작성자 유저 이름
  userName: string;
  // 작성자 이메일
  userEmail: string;
}