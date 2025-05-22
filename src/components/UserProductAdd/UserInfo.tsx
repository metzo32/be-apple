import ButtonStrong from "../designs/ButtonStrong";
import Link from "next/link";
import { useGetRecommendList } from "@/hooks/useRecommendQuery";

interface UserInfoProps {
  userId: number | null;
}

export default function UserInfo({ userId }: UserInfoProps) {
  const { data: recommendList } = useGetRecommendList(userId);
  // if (!recommendList) return null;

  console.log("추천 목록", recommendList)

  return (
    <section className="userSection">
      <h2 className="user-h2">내 정보</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
        <div className="user-common-container py-5 md:py-10 min-h-[160px] md:min-h-[300px] flex flex-col justify-center items-center gap-3 md:gap-5">
          <h3>당신의 티어는 모시깽입니다.</h3>
          {/* TODO 점수 추가 */}
          <h1>총 0.0점</h1>
        </div>

        <div className="user-common-container min-h-[200px] md:min-h-[300px]">
          <div className="flex flex-col gap-5">
            <h3>최근 추천받은 상품</h3>
            {recommendList ? (
              <p>여기 빨리 고치세요</p>
              // recommendList.map((list) => (
              //   <div key={list.id}>
              //     {list.products.map((product) => (
              //       <p key={product.id}>{product.name}</p>
              //     ))}
              //   </div>
              // ))
            ) : (
              <p className="text-center">추천 이력이 없습니다.</p>
            )}

            <span className="w-full text-center">
              <ButtonStrong text={<Link href="/recommend">추천받기</Link>} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
