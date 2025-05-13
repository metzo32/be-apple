import AddButton from "./AddButton";
import ButtonStrong from "../designs/ButtonStrong";
import Link from "next/link";

export default function UserInfo() {
  return (
    <section className="userSection">
      <h2 className="user-h2">내 정보</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
        <div className="user-common-container py-5 md:py-10 min-h-[160px] md:min-h-[300px] flex flex-col justify-between items-center">
          <h3>당신의 티어는 모시깽입니다.</h3>
          {/* TODO 점수 추가 */}
          <h1>총 0.0점</h1>
          <AddButton />
        </div>

        <div className="user-common-container min-h-[200px] md:min-h-[300px]">
          <div className="flex items-center gap-5">
            <h3>최근 추천받은 상품</h3>
            <ButtonStrong text={<Link href="/recommend">추천받기</Link>}/>
          </div>
        </div>
      </div>
    </section>
  );
}
