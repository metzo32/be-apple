import ChangePassword from "../ChangePassword";
import SignOut from "../SignOut";

interface UserAuthProps {
  userId: number | null;
}

export default function UserAuth({ userId }: UserAuthProps) {
  return (
    <section className="my-18 md:hidden flex flex-col gap-3">
      <div>
        <h2 className="user-h2">내 계정정보</h2>
        <span className="thick-line" />
      </div>

      <div className="flex flex-col gap-3 items-start">
        <ChangePassword />
        <SignOut />
      </div>
    </section>
  );
}
