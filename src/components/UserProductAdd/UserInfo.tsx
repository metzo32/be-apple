import { TierResponse } from "@/types/tier";
import ButtonStrong from "../designs/ButtonStrong";
import UserSectionSm from "../UserPage/UserSectionSm";
import GradeChart from "../UserPage/GradeChart";

interface UserInfoProps {
  userId: number | null;
  tierData?: TierResponse;
  isGradeOpen: boolean;
  setIsGradeOpen: (isGradeOpen: boolean) => void;
  onClose: () => void;
}

export default function UserInfo({
  userId,
  tierData,
  isGradeOpen,
  setIsGradeOpen,
  onClose,
}: UserInfoProps) {
  return (
    // md미만 뷰
      <UserSectionSm title="나의 등급" line={true}>
        <div className="w-full flex items-center justify-between relative">
          <h1 className="text-2xl">{tierData?.tier}</h1>
          <ButtonStrong
            text="등급표 확인하기"
            onClick={() => setIsGradeOpen(!isGradeOpen)}
          />

          <GradeChart isGradeOpen={isGradeOpen} onClose={onClose} />
        </div>
      </UserSectionSm>
  );
}
