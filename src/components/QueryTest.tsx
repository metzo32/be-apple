"use client"

import { useQuery } from "@tanstack/react-query";
import { fetchReviewMe } from "./fetch/fetchReview";
import { TestCard } from "./QueryTestCard";

export default function QueryTest() {
  // useQuery훅은 객체를 인자로 받고, 각각 쿼리에 넣을 함수와 쿼리이름(key)를 부여한다.
  // 특히, 이 queryKey가 추후 식별, 캐싱 등 기능에 중요한 역할.
//   const legacyQuery = useQuery({
//     queryFn: () => fetchReviewMe(),
//     queryKey: ["myReview"],
//   });

  // 위 legacyQuery와 같다. 디스트럭처링 했을 뿐
  const { data: reviews, isLoading } = useQuery({
    queryFn: () => fetchReviewMe(),
    queryKey: ["myReview"],
  });

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      {reviews?.map((review) => {
        return <TestCard key={review.id} review={review} />;
      })}
    </div>
  );
}

