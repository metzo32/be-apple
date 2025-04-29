import Image from "next/image";

interface IconPresetsProps {
  index: number;
  isSelected: boolean;
  onClick: (index: number) => void;
}

export default function IconPresets({
  index,
  isSelected,
  onClick,
}: IconPresetsProps) {
  return (
    <button
      className={`w-[40px] h-[40px] relative rounded-full hover:bg-secondaryLight ${
        isSelected ? "bg-secondary" : "bg-bglight"
      }`}
      onClick={() => onClick(index)}
    >
      <Image
        src={`/assets/icons/rating0${index + 1}.svg`}
        alt={`${index + 1}점`}
        fill
        className="object-cover"
      />
    </button>
  );
}
