import OptionTitle from "./OptionTitleForm";

interface SelectMemoProps {
  tempMemo: string;
  handleMemoChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleMemoBlur: () => void;
  maxLength: number;
}

export default function SelectMemo({
  tempMemo,
  handleMemoChange,
  handleMemoBlur,
  maxLength,
}: SelectMemoProps) {
  return (
    <OptionTitle title="이 제품에 대한 메모를 남겨주세요.">
      <textarea
        id="memo"
        value={tempMemo}
        onChange={handleMemoChange}
        onBlur={handleMemoBlur}
        maxLength={maxLength}
        placeholder="작성한 메모는 나에게만 보여요."
        className="w-full h-[150px] p-5 border-2 border-bglight text-base rounded-lg resize-none"
      />
      <p className="text-sm text-gray-500 text-right mt-1">
        {tempMemo.length} / {maxLength}자
      </p>
    </OptionTitle>
  );
}
