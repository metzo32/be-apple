import { GoRecommendButton } from "@/components/Home/HomeButtons";
import Image from "next/image";

export default function HomePage() {
  return (
    <section className="py-12 md:py-32 xl:py-42 flex flex-col-reverse items-center gap-5 md:gap-10 xl:flex-row xl:justify-between xl:items-center">
      <div className="w-full xl:w-1/2 flex flex-col items-center xl:items-start gap-5 md:gap-10">
        <div className="w-auto xl:w-[455px] flex flex-col items-center xl:items-start gap-1 md:gap-3 xl:gap-5">
          <h1 className="text-xl md:text-4xl xl:text-5xl font-bold text-mid">
            <span className="text-text">지금,</span> 나에게 가장
          </h1>
          <h1 className="text-xl md:text-4xl xl:text-5xl font-bold text-mid">
            필요한 제품.
          </h1>
        </div>
        <div className="xl:w-1/2">
          <GoRecommendButton />
        </div>
      </div>
      <span className="relative w-[200px] h-[120px] md:w-[400px] md:h-[250px] xl:w-[700px] xl:h-[300px]">
        <Image
          src="/assets/images/macbook01.png"
          alt="제품 이미지"
          fill
          className="object-cover"
        />
      </span>
    </section>
  );
}
