interface SummaryCardProps {
  title: string;
  content: number | string;
}

export default function SummaryCard({ title, content }: SummaryCardProps) {
  return (
    <div className="w-full h-[110px] xl:h-[150px] p-5 bg-white rounded-2xl shadow-light">
      <h5 className="text-lg font-bold">{title}</h5>
      <p className="text-2xl font-bold text-secondary">{content}</p>
    </div>
  );
}
