"use client";

import { use, useEffect, useState } from "react";
import { fetchProduct } from "@/components/fetch/fetchProduct";
import SearchCard from "@/components/Search/SearchCard";
import SearchCardServer from "@/components/Search/SearchCardServer";

export default function Page({
  params,
}: {
  params: Promise<{ keyword: string }>;
}) {
  const { keyword: category } = use(params);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      if (category) {
        const result = await fetchProduct({ category });
        if (result) {
          setProducts(result); // 상태에 저장
          console.log("카테고리:", category);
          console.log("사진:", products[0].photos);
        }
      }
    };
    getData();
  }, [category]);

  return (
    <div>
      <div className="grid place-items-center gap-5 grid-cols-2 lg:grid-cols-4">
        {products.map((item, index) => (
          <SearchCard key={index} id={item.id} category={category}>
            <SearchCardServer {...item} />
          </SearchCard>
        ))}
      </div>
    </div>
  );
}
