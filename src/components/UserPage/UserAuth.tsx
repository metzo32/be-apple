interface UserAuthProps {
  userId: number | null;
}

export default function UserAuth({ userId }: UserAuthProps) {
  return (
    <section className="my-18 block md:hidden">
      <div className="min-h-[500px]">
        <h2 className="user-h2">내 계정정보</h2>
        <span className="thick-line" />
      </div>
    </section>
  );
}
