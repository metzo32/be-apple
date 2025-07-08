"use client";

import { useGetRecommendDetail } from "@/hooks/useRecommendQuery";
import { useParams } from "next/navigation";

export default function RecommendItemPage() {
  const params = useParams();
  const recommenId = params?.id;

  const { data: recommendData } = useGetRecommendDetail(Number(recommenId));
  if (!recommenId) return <div>추천 id가 없습니다.</div>;

  if (!recommendData) return <div>잘못된 요청입니다.</div>;

  console.log("최종 추천 결과", recommendData)

  return (
    <div>
      <p>추천 ID: {recommendData.id}</p>
      <p>카테고리: {recommendData.category}</p>
      
      {recommendData.minReleasedDate && (
        <p>최소 출시일: {recommendData.minReleasedDate}</p>
      )}

      <p>태그: {recommendData.tags.join(", ")}</p>
      <div>스펙: {recommendData.products.map((spec, id)=> <div key={id}>{spec.price}</div>)}</div>
    </div>
  );
}
