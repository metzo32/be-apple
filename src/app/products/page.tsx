// app/products/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import Card from "./Card";
import Detail from "./Detail";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const selected = searchParams.get("selected");

  const products = [
    { id: "macbook", title: "맥북 프로 16", description: "고성능 랩탑입니다." },
    {
      id: "iphone",
      title: "아이폰 15",
      description: "최신 아이폰 모델입니다.",
    },
    { id: "ipad", title: "아이패드 에어", description: "강력한 태블릿입니다." },
  ];

  const selectedProduct = products.find((p) => p.id === selected);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">제품 목록</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>

      {/* 상세 페이지 조건 렌더링 */}
      {selectedProduct && <Detail product={selectedProduct} />}
    </div>
  );
}
