"use client";

import { useState } from "react";
import { ProductCategoryEnum } from "@/types/productCategory";
import RenderProducts from "./RenderProducts";
import type { ProductSelectInfoProps } from "@/types/addUserProducts";

interface SelectCategoryProps {
  productSelectInfo: ProductSelectInfoProps;
  setproductSelectInfo: ({
    productId,
    productOptionId,
  }: ProductSelectInfoProps) => void;
}

export default function SelectCategory({
  productSelectInfo,
  setproductSelectInfo,
}: SelectCategoryProps) {
  
  const [selectedCategory, setSelectedCategory] = useState<ProductCategoryEnum>(
    ProductCategoryEnum.MAC
  );

  const categories = Object.values(ProductCategoryEnum);

  const handleCategorySelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = (e.target as HTMLButtonElement).value;
    setSelectedCategory(value as ProductCategoryEnum);
    setproductSelectInfo({ productId: 0, productOptionId: 0 });
  };

  return (
    <>
      <div className="pb-7 flex justify-center">
        <div className="p-0 md:px-5 md:py-3 flex flex-wrap gap-2 md:gap-15">
          {categories.map((category) => (
            <span key={category} className="px-3 pb-1 pt-0 md:px-5 md:pt-1 md:pb-2 bg-bglight rounded-lg">
              <button
                className={`button-light ${
                  selectedCategory === category ? "selected" : ""
                }`}
                type="button"
                value={category}
                onClick={handleCategorySelect}
              >
                {category}
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="overflow-y-auto">
        <RenderProducts
          selectedCategory={selectedCategory}
          productSelectInfo={productSelectInfo}
          setproductSelectInfo={setproductSelectInfo}
        />
      </div>
    </>
  );
}
