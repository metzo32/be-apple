interface SummaryCardProps {
  title: string;
  content: number | string;
}

export default function SummaryCard({ title, content }: SummaryCardProps) {
  return (
    <div className="w-full py-2 md:py-5 border-b border-lineLight">
      <h5 className="text-bold hidden md:block">{title}</h5>
      <h5 className="user-title-sm">{title}</h5>
      <p className="text-xl md:text-3xl font-bold text-text">{content}</p>
    </div>
  );
}
