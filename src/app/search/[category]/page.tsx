"use client";

import { use, useEffect, useState } from "react";
import { fetchProduct } from "@/components/fetch/fetchProduct";
import type { GetProductResponse } from "@/types/product";
import SearchCard from "@/components/Search/SearchCard";
import LoadingScreen from "@/components/LoadingScreen";

export default function SearchPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const { category } = use(params);
  const [products, setProducts] = useState<GetProductResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      const response = await fetchProduct({ category });
      setIsLoading(true);

      if (!response) {
        console.error("문제가 발생했습니다. 다시 시도해주세요.");
      } else {
        setProducts(response);
        setIsLoading(false);
      }
    };

    getProduct();
  }, [category]);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <div>
      <div className="grid place-items-center gap-15 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <SearchCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

// import { fetchProduct } from "@/components/fetch/fetchProduct";
// import SearchCard from "@/components/Search/SearchCard";

// export default async function SearchPage({
//   params,
// }: {
//   params: Promise<{ category: string }>;
// }) {
//   const { category } = await params;
//   const products = await fetchProduct({ category });
//   console.log("제품목록", products)

//   if (!products) {
//     return <h2>잘못된 경로입니다.</h2>;
//   }

//   return (
//     <div>
//       <div className="grid place-items-center gap-15 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
//         {products.map((product) => (
//           <SearchCard key={product.id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export async function generateStaticParams() {
//   const categories = Object.values(ProductCategoryEnum); // [ProductCategoryEnum.MAC, ProductCategoryEnum.IPHONE, ProductCategoryEnum.IPAD]

//   return categories.map((category) => ({
//     category,
//   }));
// }
