import CloseButton from "../designs/CloseButton";

interface GradeChartProps {
  isGradeOpen: boolean;
  onClose: () => void;
  isWideView?: boolean;
}

export default function GradeChart({
  isGradeOpen,
  onClose,
  isWideView,
}: GradeChartProps) {
  const gradeData = [
    { min: 0, max: 15, label: "Bronze", grade: "브론즈" },
    { min: 16, max: 30, label: "Silver", grade: "실버" },
    { min: 31, max: 45, label: "Gold", grade: "골드" },
    {
      min: 46,
      max: 60,
      label: "Platinum",
      grade: "플래티넘",
    },
    {
      min: 61,
      max: Infinity,
      label: "GrandMaster",
      grade: "그랜드마스터",
    },
  ];

  return isGradeOpen ? (
    <div
      className={`absolute top-0 left-full z-5 bg-lineLight w-[160px] px-3 py-2 border border-lineLight flex flex-col gap-3 ${
        isWideView ? "transform translate-x-10" : "-translate-x-full"
      }`}
    >
      <CloseButton onClick={onClose} smallMode />
      {gradeData.map((data) => (
        <div key={data.label}>
          <h6 className="text-mid">
            {data.min} ~ {data.max !== Infinity ? data.max : ""}
          </h6>
          <p className="text-xs md:text-sm font-bold">{data.label}</p>
        </div>
      ))}
    </div>
  ) : null;
}
