"use client";

import { use } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { useProductLoadQuery } from "@/hooks/useProductQuery";
import { ProductCategoryEnum } from "@/types/productCategory";
import SearchCard from "@/components/Search/SearchCard";
import LoadingScreen from "@/components/LoadingScreen";
import ProductSearchBar from "@/components/ProductSearchBar";
import { useRouterQuery } from "@/hooks/useRouterQuery";

export default function SearchPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const { user } = useUserStore();
  const { category } = use(params);
  const typedCategory = category as ProductCategoryEnum;
  const { query } = useRouterQuery();

  const userId: number | null = user?.id ?? null;

  const {
    data: productsList,
    isLoading,
    error,
  } = useProductLoadQuery(typedCategory, query);

  if (isLoading) return <LoadingScreen />;
  if (error || !productsList) return <h2>문제가 발생했습니다.</h2>;

  return (
    <div className="flex flex-col items-center min-w-[320px] w-[100vw] pt-20 pb-28 -ml-5 md:-ml-20 xl:-ml-50 2xl:-ml-72 bg-white">
      <span className="w-[280px] md:w-[350px] lg:w-[450px] flex justify-center items-center mb-24">
        <ProductSearchBar category={typedCategory} />
      </span>

      <div className="grid place-items-center gap-8 md:gap-15 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {productsList.map((product) => (
          <SearchCard key={product.id} product={product} userId={userId} />
        ))}
      </div>
    </div>
  );
}

{
  /* <span className="px-5 border-2 border-custombg rounded-full bg-bglight h-[50px] w-[280px] md:w-[350px] lg:w-[600px] mb-24 grid grid-cols-4 gap-x-5">
        <span className="w-full border-r-2 border-custombg col-span-2">
          <input className="w-full pt-2" placeholder="제품명" />
        </span>
        <span className="w-full border-r-2 border-custombg">
          <input type="option" className="w-full pt-2" placeholder="가격대" />
        </span>
      </span>

      <span className="w-full grid-cols-4">
        
      </span> */
}

// import { getProduct } from "@/components/fetch/fetchProduct";
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
