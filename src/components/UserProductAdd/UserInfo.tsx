import AddButton from "./AddButton";

export default function UserInfo() {
  return (
    <>
      <h2 className="font-bold mb-5">내 정보</h2>
      <div className="grid grid-cols-2 gap-10">
        <div className="h-[300px] bg-white rounded-2xl p-12 shadow-light flex flex-col justify-between items-center">
          <h3>당신의 티어는 모시깽입니다.</h3>
          <h1>총 0.0점</h1>
          <AddButton />
        </div>

        <div className="h-[300px] bg-white rounded-2xl p-12 shadow-light">
          테스트
        </div>
      </div>
    </>
  );
}
