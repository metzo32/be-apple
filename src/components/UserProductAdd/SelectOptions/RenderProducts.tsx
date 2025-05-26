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
    return <p>데이터 불러오는 도중 문제가 발생했습니다.</p>;
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

  // TODO 로딩처리 추가할것
  // TODO 이미 로드된 정보 캐싱
  return (
    <div className="max-h-[80vh] overflow-y-scroll">
      {/* 카테고리 별 상품 목록 */}
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 overflow-y-scroll">
        {productsData.map((product) => (
          <div key={product.id} className="relative">
            <li
              value={product.id}
              onClick={() => handleItemClick(product.id)}
              className={`${
                productSelectInfo.productId === product.id
                  ? "border-secondaryLight bg-bglight brightness-70"
                  : "border-transparent"
              } cursor-pointer border-2 rounded-lg md:rounded-2xl flex items-center justify-center overflow-hidden p-5 hover:bg-bglightHover hover:border-secondaryLight`}
            >
              <div className="w-full h-full flex flex-col items-center">
                <span className="w-[200px] xl:w-[300px] aspect-[5/3] overflow-hidden relative">
                  <Image
                    src={product.photos[0]}
                    alt={product.name}
                    fill
                    className="flex items-center justify-center object-cover"
                  />
                </span>
                <div className="h-[50px] mt-5">
                  <p className="text-sm text-center font-bold">
                    {product.name}
                  </p>
                  <p className="text-sm text-center">{product.generation}</p>
                </div>
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
