"use client";

import { use } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { useProductLoadQuery } from "@/hooks/useProductQuery";
import { useWishLoadQuery } from "@/hooks/useWishQuery";
import {
  ProductCategoryEnum,
  ProductQueryString,
} from "@/types/productCategory";
import type { GetProductResponse } from "@/types/product";
import { notFound, useSearchParams } from "next/navigation";
import SearchCard from "@/components/Search/SearchCard";
import LoadingScreen from "@/components/LoadingScreen";

export default function Search({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const { user } = useUserStore();
  const { category } = use(params);
  const typedCategory = category as ProductCategoryEnum;

  const searchParams = useSearchParams();

  // 검색할 때마다 queryObject을 바꾸고, useProductLoadQuery의 두번째 인자로 전달 -> 새로운 queryKey 생성
  const queryObject: Omit<ProductQueryString, "category"> = {
    name: searchParams.get("name") || "",
    tag: searchParams.get("tag") || "",
    minPrice: searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : undefined,
    maxPrice: searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined,
    sortBy: searchParams.get("sortBy") as ProductQueryString["sortBy"],
    order: searchParams.get("order") as ProductQueryString["order"],
  };

  const {
    data: productsList,
    isLoading: productsLoading,
    error: productsError,
  } = useProductLoadQuery(typedCategory, queryObject);

  const userId: number | null = user?.id ?? null;

  const {
    data: wishList,
    isLoading: wishLoading,
    error: wishError,
  } = useWishLoadQuery(userId);

  if (productsLoading || wishLoading) return <LoadingScreen />;
  if (productsError || !productsList || wishError) return notFound();

  // 중요!!
  const wishUpdatedProductsList: GetProductResponse[] = productsList.map(
    (product) => {
      const matchedWish = wishList?.find(
        (wish) => wish.productId === product.id
      );
      return {
        ...product,
        wishId: matchedWish?.id ?? null, // 기존 wishId가 있다면 유지
      };
    }
  );

  return (
    <>
      {wishUpdatedProductsList.length === 0 ? (
        <p className="pt-[80px] md:pt-[145px] text-sm md:text-base">
          결과가 없습니다.
        </p>
      ) : (
        <div className="w-full grid place-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-15">
          {wishUpdatedProductsList.map((product) => (
            <SearchCard key={product.id} product={product} userId={userId} />
          ))}
        </div>
      )}
    </>
  );
}
