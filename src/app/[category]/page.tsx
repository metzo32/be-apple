"use client";

import { use } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { useProductLoadQuery } from "@/hooks/useProductQuery";
import { useWishLoadQuery } from "@/hooks/useWishQuery";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { ProductCategoryEnum } from "@/types/productCategory";
import type { GetProductResponse } from "@/types/product";
import SearchCard from "@/components/Search/SearchCard";
import LoadingScreen from "@/components/LoadingScreen";
import ProductSearchBar from "@/components/ProductSearchBar";

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
    isLoading: productsLoading,
    error: productsError,
  } = useProductLoadQuery(typedCategory, query);

  const {
    data: wishList,
    isLoading: wishLoading,
    error: wishError,
  } = useWishLoadQuery(userId);

  if (productsLoading || wishLoading) return <LoadingScreen />;
  if (productsError || !productsList || wishError) return <h2>문제가 발생했습니다.</h2>;

  const wishUpdatedProductsList: GetProductResponse[] = productsList.map((product) => {
    const matchedWish = wishList?.find((wish) => wish.productId === product.id);
    return {
      ...product,
      wishId: matchedWish?.id ?? null, // 기존 wishId가 있다면 유지
    };
  });

  return (
    <div className="flex flex-col items-center min-w-[320px] w-[100vw] pt-20 pb-64 -ml-5 md:-ml-20 xl:-ml-50 2xl:-ml-72 bg-white">
      <ProductSearchBar category={typedCategory} />

      {wishUpdatedProductsList.length === 0 ? (
        <p>결과가 없습니다.</p>
      ) : (
        <div className="grid place-items-center gap-8 md:gap-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {wishUpdatedProductsList.map((product) => (
            <SearchCard key={product.id} product={product} userId={userId} />
          ))}
        </div>
      )}
    </div>
  );
}
