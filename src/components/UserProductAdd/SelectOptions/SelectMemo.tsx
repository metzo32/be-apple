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
    <div className="flex flex-col gap-3">
      <div className="flex gap-3 items-cente">
        <h3 className="user-product-h3">이 제품에 대한 메모를 남겨주세요.</h3>
        <p className="text-mid">(나에게만 보여요)</p>
      </div>
      <textarea
        id="memo"
        value={tempMemo}
        onChange={handleMemoChange}
        onBlur={handleMemoBlur}
        maxLength={maxLength}
        placeholder="메모 남기기"
        className="w-full h-[150px] p-5 border-2 border-bglight text-base rounded-lg resize-none"
      />
      <p className="text-sm text-gray-500 text-right mt-1">
        {tempMemo.length} / {maxLength}자
      </p>
    </div>
  );
}
