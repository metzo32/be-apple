interface SummaryCardProps {
  title: string;
  content: number | string;
}

export default function SummaryCard({ title, content }: SummaryCardProps) {
  return (
    <div className="w-[250px] h-[150px] p-5 mb-10 bg-white rounded-2xl">
      <h5 className="text-lg font-bold">{title}</h5>
      <p className="text-3xl font-bold text-secondary">{content}</p>
    </div>
  );
}
