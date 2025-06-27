import OptionTitle from "./OptionTitleForm";

interface SelectMemoProps {
  tempMemo: string;
  handleMemoChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength: number;
}

export default function SelectMemo({
  tempMemo,
  handleMemoChange,
  maxLength,
}: SelectMemoProps) {
  return (
    <OptionTitle title="이 제품에 대한 메모를 남겨주세요.">
      <div className="flex flex-col gap-3">
        <textarea
          id="memo"
          value={tempMemo}
          onChange={handleMemoChange}
          maxLength={maxLength}
          placeholder="작성한 메모는 나에게만 보여요."
          className="w-full h-[150px] p-3 md:p-5 border-2 border-bglight text-sm md:text-base resize-none placeholder:text-[10px] placeholder:md:text-base "
        />
        <p className="text-xs md:text-sm text-mid text-right">
          {tempMemo.length} / {maxLength}자
        </p>
      </div>
    </OptionTitle>
  );
}
