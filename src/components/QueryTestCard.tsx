export interface TestCardProps {
  review: string;
}

export function TestCard({ review }: TestCardProps) {
  return <div>{review}</div>;
}
