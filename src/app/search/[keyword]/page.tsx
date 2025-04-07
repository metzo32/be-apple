"use client";

import { use, useEffect, useState } from "react";
import type { CreateWishRequest } from "@/types/wishlist";
import { fetchProduct } from "@/components/fetch/fetchProduct";
import { fetchWishList } from "@/components/fetch/fetchWishList";
import SearchCard from "@/components/Search/SearchCard";
import SearchCardServer from "@/components/Search/SearchCardServer";
import LoadingScreen from "@/components/LoadingScreen";

export default function Page({
  params,
}: {
  params: Promise<{ keyword: string }>;
}) {
  const { keyword: category } = use(params);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<any[]>([]);
  const [wishList, setWishList] = useState<number[]>([]);

  //카테고리별 상품 호출
  useEffect(() => {
    const getData = async () => {
      if (category) {
        setIsLoading(true);

        const [productArr, wishArr] = await Promise.all([
          fetchProduct({ category }),
          fetchWishList(),
        ]);

        if (productArr) {
          setProducts(productArr);
        }
        if (wishArr) {
          const productIds = wishArr.map(
            (wish: CreateWishRequest) => wish.productId
          );
          setWishList(productIds);
        }
        setIsLoading(false);
      }
    };

    getData();
  }, [category]);

  return (
    <div>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="grid place-items-center gap-5 grid-cols-2 lg:grid-cols-4">
          {products.map((item, index) => (
            <SearchCard
              key={index}
              id={item.id}
              category={category}
              wishList={wishList}
              setWishList={setWishList}
            >
              <SearchCardServer {...item} />
            </SearchCard>
          ))}
        </div>
      )}
    </div>
  );
}
