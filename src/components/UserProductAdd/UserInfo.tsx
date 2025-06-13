import ButtonStrong from "../designs/ButtonStrong";
import UserSectionSm from "../UserPage/UserSectionSm";

interface UserInfoProps {
  userId: number | null;
}

export default function UserInfo({ userId }: UserInfoProps) {
  return (
    // md미만 뷰
    <section>
      <UserSectionSm title="내 등급" line={true}>
        <div className="w-full flex items-center justify-between">
          {/* TODO 점수 추가 */}
          <h1 className="text-2xl">총 0.0점</h1>
          <ButtonStrong text="점수표 보기" />
          {/* TODO 점수표 이동 */}
        </div>
      </UserSectionSm>
      <UserSectionSm title="다음 단계까지" line={true}>
        <div className="w-full">
          {/* TODO 점수 추가 */}
          <h1 className="text-2xl">n점</h1>
        </div>
      </UserSectionSm>
    </section>
  );
}
