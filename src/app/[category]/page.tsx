"use client";

import { use } from "react";
import { fetchProduct } from "@/components/fetch/fetchProduct";
import type { GetProductResponse } from "@/types/product";
import SearchCard from "@/components/Search/SearchCard";
import LoadingScreen from "@/components/LoadingScreen";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/stores/useUserStore";
import { useWishLoadQuery } from "@/hooks/useWishQuery";

export default function SearchPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const { user } = useUserStore();
  const { category } = use(params);

  const userId: number | null = user?.id ?? null;

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
    <div className="mt-12 md:mt-24 grid place-items-center gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {productsList.map((product) => (
        <SearchCard
          key={product.id}
          product={product}
          userId={user?.id}
        />
      ))}
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
