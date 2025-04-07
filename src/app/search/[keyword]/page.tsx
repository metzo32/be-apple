"use client";

import { use, useEffect, useState } from "react";
import type { GetWishResponse } from "@/types/wishlist";
import type { ProductDetail } from "@/types/productDetail";
import { fetchProduct } from "@/components/fetch/fetchProduct";
import { fetchWishList } from "@/components/fetch/fetchWishList";
import SearchCard from "@/components/Search/SearchCard";
import LoadingScreen from "@/components/LoadingScreen";

export default function SearchPage({
  params,
}: {
  params: Promise<{ keyword: string }>;
}) {
  const { keyword: category } = use(params);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<ProductDetail[]>([]);
  const [wishList, setWishList] = useState<number[]>([]);

  //카테고리별 상품 호출
  useEffect(() => {
    const getData = async () => {
      if (category) {
        setIsLoading(true);

        //카테고리별 전체 프로덕트, 위시리스트 존재여부 배열
        const [productArr, wishArr] = await Promise.all([
          fetchProduct({ category }),
          fetchWishList(),
        ]);

        if (productArr) {
          setProducts(productArr); // 카테고리에 해당하는 프로덕트 배열
        }
        if (wishArr) {
          const wishItems = wishArr.map((wish: GetWishResponse) => wish);
          setWishList(wishItems);
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
        <div className="grid place-items-center gap-15 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((item, index) => (
            <SearchCard
              key={index}
              {...item}
              wishList={wishList}
              setWishList={setWishList}
            />
          ))}
        </div>
      )}
    </div>
  );
}
