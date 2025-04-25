import Image from "next/image";

export default function WishButtonActive() {
  return (
    <Image
      src={"/assets/icons/heart_active.svg"}
      alt="하트"
      width={50}
      height={50}
    />
  );
}
