import CloseButton from "../designs/CloseButton";

interface GradeChartProps {
  isGradeOpen: boolean;
  onClose: () => void;
}

export default function GradeChart({ isGradeOpen, onClose }: GradeChartProps) {
  const gradeData = [
    { min: 0, max: 15, label: "초보 앱등이", grade: "브론즈" },
    { min: 16, max: 30, label: "앱등이 부정기", grade: "실버" },
    { min: 31, max: 45, label: "자타공인 앱등이", grade: "골드" },
    {
      min: 46,
      max: 60,
      label: "앱등이 고인물",
      grade: "플래티넘",
    },
    {
      min: 61,
      max: Infinity,
      label: "진격의 앱등이",
      grade: "그랜드마스터",
    },
  ];

  return isGradeOpen ? (
    <div className="absolute top-0 left-full transform translate-x-10 z-5 bg-lineLight w-[160px] p-3 border border-lineLight flex flex-col gap-3">
      <CloseButton onClick={onClose} smallMode />
      {gradeData.map((data) => (
        <div key={data.label}>
          <h6>
            {data.min} - {data.max !== Infinity ? data.max : ""}
          </h6>
          <p className="text-xs md:text-sm ">{data.label}</p>
        </div>
      ))}
    </div>
  ) : null;
}
