"use client";

import { use, useEffect, useState } from "react";
import { fetchProduct } from "@/components/fetch/fetchProduct";
import type { GetProductResponse } from "@/types/product";
import SearchCard from "@/components/Search/SearchCard";
import LoadingScreen from "@/components/LoadingScreen";
import { useQuery } from "@tanstack/react-query";

export default function SearchPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  // const [productsList, setProductsList] = useState<GetProductResponse[]>([]);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const getProduct = async () => {
  //     const response = await fetchProduct({ category });
  //     setIsLoading(true);

  //     if (!response) {
  //       console.error("문제가 발생했습니다. 다시 시도해주세요.");
  //     } else {
  //       setProductsList(response);
  //       console.log(response)
  //       setIsLoading(false);
  //     }
  //   };

  //   getProduct();
  // }, [category]);

  const { category } = use(params);

  const {
    data: productsList,
    isLoading,
    error,
  } = useQuery<GetProductResponse[]>({
    queryKey: ["searchList", category],
    queryFn: () => fetchProduct({ category }),
  });

  if (isLoading) return <LoadingScreen />;
  if (error || !productsList) return <h2>문제가 발생했습니다.</h2>;

  return (
    <div>
      <div className="mt-24 grid place-items-center gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {productsList.map((product) => (
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
//   const productsList = await fetchProduct({ category });
//   console.log("제품목록", productsList)

//   if (!productsList) {
//     return <h2>잘못된 경로입니다.</h2>;
//   }

//   return (
//     <div>
//       <div className="grid place-items-center gap-15 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
//         {productsList.map((product) => (
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
