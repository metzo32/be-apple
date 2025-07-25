import Image from "next/image";
import type { ProductSelectInfoProps } from "@/types/addUserProducts";
import { ProductCategoryEnum } from "@/types/productCategory";
import { useProductLoadQuery } from "@/hooks/useProductQuery";
import Options from "./Options";

interface RenderProductsProps {
  selectedCategory: ProductCategoryEnum;
  productSelectInfo: ProductSelectInfoProps;
  setproductSelectInfo: ({
    productId,
    productOptionId,
  }: ProductSelectInfoProps) => void;
}

export default function RenderProducts({
  selectedCategory,
  productSelectInfo,
  setproductSelectInfo,
}: RenderProductsProps) {
  // 카테고리별 전체 제품 목록 불러오기

  const { data: productsData } = useProductLoadQuery(selectedCategory);

  if (!productsData) {
    return (
      <p className="text-xs md:text-sm">
        데이터 불러오는 도중 문제가 발생했습니다.
      </p>
    );
  }

  if (productsData.length === 0) {
    return (
      <p className="text-xs md:text-sm">
        해당 카테고리에 등록된 제품이 없습니다.
      </p>
    );
  }

  // 각 아이템의 detail 불러오기
  const handleItemClick = (productId: number) => {
    // 제품을 바꾸면 옵션 null로 초기화
    const isNewProduct = productSelectInfo.productId !== productId;

    setproductSelectInfo({
      productId,
      productOptionId: isNewProduct ? null : productSelectInfo.productOptionId,
    });
  };

  const handleOptionItemClick = (productOptionId: number) => {
    setproductSelectInfo({
      ...productSelectInfo,
      productOptionId,
    });
  };

  return (
    <div className="max-h-[80vh] overflow-y-scroll">
      {/* 카테고리 별 상품 목록 */}
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {productsData.map((product) => (
          <div key={product.id} className="relative">
            <li
              value={product.id}
              onClick={() => {
                if (!product.userProductId) handleItemClick(product.id);
              }}
              className={`${
                productSelectInfo.productId === product.id
                  ? "border-secondaryLight bg-bglight brightness-70"
                  : "border-transparent"
              } cursor-pointer border-2 flex items-center justify-center overflow-hidden p-5 hover:bg-bglightHover hover:border-secondaryLight`}
            >
              <div className="w-full h-full flex flex-col items-center gap-5 py-5">
                <span className="w-[200px] xl:w-[300px] aspect-[5/3] overflow-hidden relative">
                  <Image
                    src={product.photos[0]}
                    alt={product.name}
                    fill
                    className={`flex items-center justify-center object-cover ${
                      product.userProductId && "grayscale-100 opacity-20"
                    }`}
                  />
                </span>
                <div>
                  <p className="text-sm font-bold">{product.name}</p>
                  <p className="text-sm text-center">{product.generation}</p>
                </div>

                {product.userProductId &&  (
                  <div className="absolute inset-0 z-10 pointer-events-none flex justify-center items-center">
                    <p className="mb-12 text-xs md:text-sm">이미 추가된 아이템입니다.</p>
                  </div>
                )}
              </div>
            </li>
            <Options
              productId={product.id}
              clickedProductId={productSelectInfo.productId}
              onOptionSelect={handleOptionItemClick}
              selectedOptionId={
                productSelectInfo.productId === product.id
                  ? productSelectInfo.productOptionId
                  : null
              }
            />
          </div>
        ))}
      </ul>
    </div>
  );
}
