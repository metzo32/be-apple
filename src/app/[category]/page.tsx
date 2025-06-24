"use client";

import { use } from "react";
import { ProductCategoryEnum } from "@/types/productCategory";
import ProductSearchBar from "@/components/ProductSearchBar";
import Search from "@/components/Search/Search";

export default function SearchPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const { category } = use(params);
  const typedCategory = category as ProductCategoryEnum;

  return (
    <div className="min-w-[320px] w-[100vw] md:w-full flex flex-col items-center pt-5 pb-18 md:pt-18 md:pb-64 -mx-5 md:mx-0">
      <ProductSearchBar category={typedCategory} />

      <Search params={params} />
    </div>
  );
}
