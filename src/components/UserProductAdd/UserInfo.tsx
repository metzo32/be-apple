import { TierResponse } from "@/types/tier";
import ButtonStrong from "../designs/ButtonStrong";
import UserSectionSm from "../UserPage/UserSectionSm";

interface UserInfoProps {
  userId: number | null;
  tierData?: TierResponse;
}

export default function UserInfo({ userId, tierData }: UserInfoProps) {
  return (
    // md미만 뷰
    <section> 
      <UserSectionSm title="나의 등급" line={true}>
        <div className="w-full flex items-center justify-between">
          <h1 className="text-2xl">{tierData?.tier}</h1>
          <ButtonStrong text="점수표 보기" />
        </div>
      </UserSectionSm>

      <UserSectionSm title="다음 단계까지" line={true}>
        <div className="w-full">
          <h1 className="text-2xl">n점</h1>
        </div>
      </UserSectionSm>
    </section>
  );
}
