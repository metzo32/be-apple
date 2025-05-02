import { useEffect, useState } from "react";
import Image from "next/image";
import type { ProductSelectInfoProps } from "@/types/addUserProducts";
import { ProductCategoryEnum } from "@/types/productCategory";
import {
  fetchProduct,
  fetchProductDetail,
} from "@/components/fetch/fetchProduct";
import {
  ProductDetail,
  ProductDetailIpad,
  ProductDetailIphone,
  ProductDetailMac,
} from "@/types/productDetail";
import { GetProductResponse } from "@/types/product";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

interface RenderProductsProps {
  selectedCategory: ProductCategoryEnum;
  productSelectInfo: ProductSelectInfoProps;
  setproductSelectInfo: ({
    productId,
    productOptionId,
  }: ProductSelectInfoProps) => void;
}

// 타입가드
const isMacProduct = (product: ProductDetail): product is ProductDetailMac => {
  return product.category === ProductCategoryEnum.MAC;
};

const isIpadProduct = (
  product: ProductDetail
): product is ProductDetailIpad => {
  return product.category === ProductCategoryEnum.IPAD;
};

const isIphoneProduct = (
  product: ProductDetail
): product is ProductDetailIphone => {
  return product.category === ProductCategoryEnum.IPHONE;
};

export default function RenderProducts({
  selectedCategory,
  productSelectInfo,
  setproductSelectInfo,
}: RenderProductsProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isOptionLoading, setIsOptionLoading] = useState(false);
  const [productList, setProductList] = useState<GetProductResponse[]>([]); // 제품 전체 fetch 정보
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(
    null
  ); // 디테일 fetch 정보
  const [clickedProductId, setClickedProductId] = useState<number | null>(null);
  const [clickedOptionId, setClickedOptionId] = useState<number | null>(null);


  // 카테고리별 제품 목록 조회
  useEffect(() => {
    const getProduct = async () => {
      const fetchedProductList = await fetchProduct({
        category: selectedCategory,
      });
      setIsLoading(true);

      if (!fetchedProductList) {
        console.error("문제가 발생했습니다. 다시 시도해주세요.");
      } else {
        setProductList(fetchedProductList);
        setIsLoading(false);
      }
    };

    getProduct();
    setproductSelectInfo({ productId: null, productOptionId: null });
  }, [selectedCategory]);


  // 각 아이템의 detail 불러오기
  const handleItemClick = async (productId: number) => {
    setClickedProductId(productId);

    setproductSelectInfo({
      ...productSelectInfo,
      productId: productId,
    });

    setIsOptionLoading(true);

    const fetchedDetail = await fetchProductDetail(productId);

    if (!fetchedDetail) {
      console.error("문제가 발생했습니다. 다시 시도해주세요.");
    } else {
      setProductDetail(fetchedDetail);
      // 다른 아이템을 클릭하면 옵션 선택 초기화
      setproductSelectInfo({
        ...productSelectInfo,
        productOptionId: 0,
      });
    }
    setIsOptionLoading(false);
  };

  const handleOptionItemClick = (productOptionId: number) => {
    setIsOptionLoading(true);
    setClickedOptionId(productOptionId);
    setproductSelectInfo({
      ...productSelectInfo,
      productOptionId: productOptionId,
    });
  };

  return isLoading ? (
    <p>제품 목록 불러오는 중...</p>
  ) : (
    <div className="h-[500px] overflow-y-scroll">
      {/* 카테고리 별 상품 목록 */}
      <div className="grid grid-cols-3 gap-[50px]">
        {productList.map((product) => (
          <FormControlLabel
            key={product.id}
            value={product.id}
            onClick={() => handleItemClick(product.id)}
            control={<Radio sx={{ display: "none" }} />}
            className={`${
              clickedProductId === product.id
                ? "border-secondaryLight bg-bglight"
                : "border-transparent"
            } border-2 rounded-2xl flex items-center justify-center overflow-hidden p-5`}
            label={
              <div className="w-full h-full flex flex-col items-center">
                <span className="w-[300px] h-[180px] overflow-hidden relative">
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
            }
            sx={{
              width: "100%",
              height: "300px",
              margin: 0,
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* 옵션 목록 */}
      <div className="absolute top-0 left-0.5">
        {isOptionLoading ? (
          <p>옵션 불러오는 중...</p>
        ) : productSelectInfo.productId ? (
          <RadioGroup
            aria-labelledby="product-option-radio-buttons-group-label"
            name="radio-buttons-group"
            value={productSelectInfo.productOptionId}
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gridColumnGap: "15px",
            }}
          >
            {/* 맥 케이스 */}
            {productDetail &&
              isMacProduct(productDetail) &&
              productDetail.options.map((macOption) => (
                <div
                  key={macOption.id}
                  onClick={() => handleOptionItemClick(macOption.id)}
                  className={`${
                    clickedOptionId === macOption.id ? "selected" : ""
                  } option-select bg-bglight`}
                >
                  <p className="text-sm text-textHover">{macOption.cpu}</p>
                  <p className="text-sm text-textHover">{macOption.gpu}</p>
                  <p className="text-sm text-textHover">
                    {macOption.processor}
                  </p>
                  <p className="text-sm text-textHover">{macOption.ram}</p>
                  <p className="text-sm text-textHover">{macOption.storage}</p>
                </div>
              ))}

            {/* 아이패드 케이스 */}
            {productDetail &&
              isIpadProduct(productDetail) &&
              productDetail.options.map((ipadOption) => (
                <div
                  key={ipadOption.id}
                  onClick={() => handleOptionItemClick(ipadOption.id)}
                  className={`${
                    clickedOptionId === ipadOption.id ? "selected" : ""
                  } option-select`}
                >
                  <p>{ipadOption.storage}</p>
                </div>
              ))}

            {/* 아이폰 케이스 */}
            {productDetail &&
              isIphoneProduct(productDetail) &&
              productDetail.options.map((iphoneOption) => (
                <div
                  key={iphoneOption.id}
                  onClick={() => handleOptionItemClick(iphoneOption.id)}
                  className={`${
                    clickedOptionId === iphoneOption.id ? "selected" : ""
                  } option-select`}
                >
                  <p>{iphoneOption.storage}</p>
                </div>
              ))}
          </RadioGroup>
        ) : null}
      </div>
    </div>
  );
}
