interface SummaryCardProps {
  title: string;
  content: number | string;
}

export default function SummaryCard({ title, content }: SummaryCardProps) {
  return (
    <div className="w-full h-[70px] md:h-[110px] xl:h-[150px] p-3 md:p-5 bg-white shadow-light">
      <h5 className="text-bold">{title}</h5>
      <p className="text-xl md:text-3xl font-bold text-secondary">{content}</p>
    </div>
  );
}
