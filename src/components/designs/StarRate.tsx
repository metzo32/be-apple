import { useState } from "react";
import { BsStarFill, BsStar, BsStarHalf } from "react-icons/bs";


interface StarRatingProps {
  value: number | null;
  onChange: (value: number) => void;
}

export default function StarRate({ value, onChange }: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => setHovered(index);
  const handleMouseLeave = () => setHovered(null);
  const handleClick = (index: number) => onChange(index);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = hovered !== null ? star <= hovered : value !== null && star <= value;

        return (
          <button
            key={star}
            type="button"
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(star)}
            className="text-yellow-400 text-lg md:text-2xl"
          >
            {isFilled ? <BsStarFill /> : <BsStar />}
          </button>
        );
      })}
    </div>
  );
}
