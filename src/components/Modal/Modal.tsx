import ButtonBasic from "../designs/ButtonMild";
import ButtonStrong from "../designs/ButtonStrong";

export default function Modal() {
  const handleCancel = () => {
    console.log("닫기");
  };

  const handleConfirm = () => {
    console.log("확인");
  };

  return (
    <div className="overlay">
      <div className="w-[800px] h-[500px] p-24 bg-bglight flex flex-col justify-between items-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h3 className="text-3xl">경고!</h3>
        <p>위시리스트에서 제거할까요?</p>
        <div className="flex gap-10">
          <ButtonBasic text="취소" onClick={handleCancel} />
          <ButtonStrong text="확인" onClick={handleConfirm} />
        </div>
      </div>
    </div>
  );
}
