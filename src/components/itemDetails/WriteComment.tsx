import Image from "next/image";

interface WriteCommentProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function WriteComment({ isOpen, setIsOpen }: WriteCommentProps) {
  const handleSubmit = () => {
    setIsOpen(false);
  };

  const handleBack = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-screen h-screen bg-overlay fixed inset-0 z-20 flex justify-center items-center">
      <div className="w-[300px] md:w-[460px] p-5 flex flex-col gap-3 md:gap-5 bg-custombg shadow-2xl">
        <button
          type="button"
          onClick={handleBack}
          className="w-[50px] text-custombg"
        >
          <Image
            src={"/assets/icons/arrow_left.svg"}
            alt="뒤로"
            width={50}
            height={50}
          />
        </button>

        <h3 className="font-bold">
          해당 제품을 사용해보셨다면 리뷰를 남겨주세요.
        </h3>
        
        <div className="w-full h-[250px] border-3 border-bglight">textarea</div>

        <h3 className="font-bold">포토</h3>
        <div className="flex gap-5 w-full">
          <div className="cursor-pointer w-[200px] aspect-square bg-bglight flex justify-center items-center">
            <Image
              src={"/assets/icons/plus.svg"}
              alt="추가"
              width={50}
              height={50}
            />
          </div>
          <div className="cursor-pointer w-[200px] aspect-square bg-bglight flex justify-center items-center">
            <Image
              src={"/assets/icons/plus.svg"}
              alt="추가"
              width={50}
              height={50}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="submit-btn"
        >
          등록
        </button>
      </div>
    </div>
  );
}
