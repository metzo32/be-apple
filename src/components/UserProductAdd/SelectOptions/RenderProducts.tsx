import { useEffect, useState } from "react";
import { GetProductResponse } from "@/types/product";
import { ProductCategoryEnum } from "@/types/productCategory";
import {
  fetchProduct,
  fetchProductDetail,
} from "@/components/fetch/fetchProduct";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import {
  ProductDetail,
  ProductDetailIpad,
  ProductDetailIphone,
  ProductDetailMac,
} from "@/types/productDetail";
import type { ProductSelectInfoProps } from "@/types/addUserProducts";

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
  const [productList, setProductList] = useState<GetProductResponse[]>([]); // 제품 전체 fetch 정보
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(
    null
  ); // 디테일 fetch 정보

  // TODO productId와 productOptionId 필수 선택 검증

  // 각 아이템의 detail 불러오기
  const handleItemClick = async (productId: number) => {
    setproductSelectInfo({
      ...productSelectInfo,
      productId: productId,
    });

    const fetchedDetail = await fetchProductDetail(productId);
    setIsLoading(true);

    if (!fetchedDetail) {
      console.error("문제가 발생했습니다. 다시 시도해주세요.");
    } else {
      setProductDetail(fetchedDetail);
      // 다른 아이템을 클릭하면 옵션 선택 초기화
      setproductSelectInfo({
        ...productSelectInfo,
        productOptionId: 0,
      });

      setIsLoading(false);
    }
  };

  const handleOptionItemClick = (productOptionId: number) => {
    setproductSelectInfo({
      ...productSelectInfo,
      productOptionId: productOptionId,
    });
    console.log("선택한 최종 옵션", productSelectInfo);
  };

  // 카테고리별 목록 조회
  useEffect(() => {
    const getProduct = async () => {
      const fetchedDetail = await fetchProduct({ category: selectedCategory });
      setIsLoading(true);

      if (!fetchedDetail) {
        console.error("문제가 발생했습니다. 다시 시도해주세요.");
      } else {
        setProductList(fetchedDetail);
        setIsLoading(false);
      }
    };

    getProduct();
    setproductSelectInfo({ productId: 0, productOptionId: 0 });
  }, [selectedCategory]);

  return isLoading ? (
    <p>제품 목록 불러오는 중...</p>
  ) : (
    <div className="bg-[#FE0000]"> 
      <RadioGroup
        aria-labelledby="products-radio-buttons-group-label"
        name="radio-buttons-group"
        value={productSelectInfo.productId}
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gridColumnGap: "15px",
        }}
      >
        {productList.map((product) => (
          <FormControlLabel
            key={product.id}
            value={product.id}
            onClick={() => handleItemClick(product.id)}
            control={<Radio />}
            label={product.id}
            sx={{ width: "200px", height: "200px", backgroundColor: "#20676F" }}
          />
        ))}
      </RadioGroup>

      {productSelectInfo.productId && (
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
          {productDetail &&
            isMacProduct(productDetail) &&
            productDetail.options.map((macOption) => (
              <FormControlLabel
                key={macOption.id}
                value={macOption.id}
                onClick={() => handleOptionItemClick(macOption.id)}
                control={<Radio />}
                label={macOption.id}
                sx={{
                  width: "200px",
                  height: "100px",
                  backgroundColor: "#94B482",
                }}
              />
            ))}

          {productDetail &&
            isIpadProduct(productDetail) &&
            productDetail.options.map((ipadOption) => (
              <FormControlLabel
                key={ipadOption.id}
                value={ipadOption.id}
                onClick={() => handleOptionItemClick(ipadOption.id)}
                control={<Radio />}
                label={ipadOption.id}
                sx={{
                  width: "200px",
                  height: "100px",
                  backgroundColor: "#94B482",
                }}
              />
            ))}

          {productDetail &&
            isIphoneProduct(productDetail) &&
            productDetail.options.map((iphoneOption) => (
              <FormControlLabel
                key={iphoneOption.id}
                value={iphoneOption.id}
                onClick={() => handleOptionItemClick(iphoneOption.id)}
                control={<Radio />}
                label={iphoneOption.id}
                sx={{
                  width: "200px",
                  height: "100px",
                  backgroundColor: "#94B482",
                }}
              />
            ))}
        </RadioGroup>
      )}
    </div>
  );
}
