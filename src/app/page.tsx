import GoSearchButton from "@/components/Home/GoSearchButton";
import Image from "next/image";

export default function HomePage() {
  return (
    <div>
      <section className="py-64 flex flex-col-reverse items-center gap-10 xl:flex-row xl:justify-between xl:items-center">
        <div className="w-full xl:w-1/2 flex flex-col items-center xl:items-start gap-10">
          <div className="w-auto xl:w-[455px] flex flex-col items-center xl:items-start gap-1 sm:gap-5">
            <h1 className="text-2xl sm:text-5xl xl:text-6xl font-bold text-light">
              <span className="text-text">지금,</span> 나에게 가장
            </h1>
            <h1 className=" tracking-widest text-2xl sm:text-5xl xl:text-6xl font-bold text-light">
              필요한 제품.
            </h1>
          </div>
          <h2 className="text-lg sm:text-2xl font-bold">다음 레벨까지 n점 남았습니다.</h2>
          <div className="xl:w-1/2">
            <GoSearchButton />
          </div>
        </div>
        <span className="relative w-[200px] h-[120px] sm:w-[400px] sm:h-[250px] xl:w-[700px] xl:h-[300px]">
          <Image
            src="/assets/images/macbook01.png"
            alt="제품 이미지"
            fill
            className="object-cover"
          />
        </span>
      </section>
    </div>
  );
}
