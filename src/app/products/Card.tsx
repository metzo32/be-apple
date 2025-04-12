"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function Card({ product }: { product: any }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";

  const handleClick = () => {
    router.push(`/products?page=${page}&selected=${product.id}`);
  };

  return (
    <div
      className="border p-4 cursor-pointer"
      onClick={handleClick}
    >
      <h3 className="font-bold">{product.title}</h3>
    </div>
  );
}
