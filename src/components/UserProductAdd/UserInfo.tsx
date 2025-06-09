interface UserInfoProps {
  userId: number | null;
}

export default function UserInfo({ userId }: UserInfoProps) {

  return (
    <section className="userSection">
      <h2 className="user-h2">내 정보</h2>
      <div className="w-full">
        <div className="user-common-container py-5 md:py-10 min-h-[160px] md:min-h-[300px] flex flex-col justify-center items-center gap-3 md:gap-5">
          <h3>당신의 티어는 모시깽입니다.</h3>
          {/* TODO 점수 추가 */}
          <h1>총 0.0점</h1>
        </div>
      </div>
    </section>
  );
}
