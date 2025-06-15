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
import { notFound } from "next/navigation";

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
  if (productsError || !productsList || wishError) return notFound();

  const wishUpdatedProductsList: GetProductResponse[] = productsList.map((product) => {
    const matchedWish = wishList?.find((wish) => wish.productId === product.id);
    return {
      ...product,
      wishId: matchedWish?.id ?? null, // 기존 wishId가 있다면 유지
    };
  });

  return (
    <div className="min-w-[320px] w-[100vw] md:w-full flex flex-col items-center pt-5 pb-18 md:pt-18 md:pb-64 -mx-5 md:mx-0">
      {/* <ProductSearchBar category={typedCategory} /> */}

      {wishUpdatedProductsList.length === 0 ? (
        <p>결과가 없습니다.</p>
      ) : (
        <div className="w-full grid place-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-15">
          {wishUpdatedProductsList.map((product) => (
            <SearchCard key={product.id} product={product} userId={userId} />
          ))}
        </div>
      )}
    </div>
  );
}
