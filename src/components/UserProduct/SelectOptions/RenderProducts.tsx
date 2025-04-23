import { useEffect, useState } from "react";
import { GetProductResponse } from "@/types/product";
import { ProductCategoryEnum } from "@/types/productCategory";
import {
  fetchProduct,
  fetchProductDetail,
} from "@/components/fetch/fetchProduct";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import {
  IpadOption,
  IphoneOption,
  MacOption,
  ProductDetail,
  ProductDetailIpad,
  ProductDetailIphone,
  ProductDetailMac,
} from "@/types/productDetail";

interface RenderProductsProps {
  selectedCategory: ProductCategoryEnum;
}

// 타입가드
const isMacProduct = (product: ProductDetail): product is ProductDetailMac => {
  console.log("맥", product);
  return product.category === ProductCategoryEnum.MAC;
};

const isIpadProduct = (
  product: ProductDetail
): product is ProductDetailIpad => {
  console.log("아이패드", product);
  return product.category === ProductCategoryEnum.IPAD;
};

const isIphoneProduct = (
  product: ProductDetail
): product is ProductDetailIphone => {
  console.log("아이폰", product);
  return product.category === ProductCategoryEnum.IPHONE;
};

export default function RenderProducts({
  selectedCategory,
}: RenderProductsProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [productList, setProductList] = useState<GetProductResponse[]>([]); // 제품 전체 fetch 정보
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(
    null
  ); // 디테일 fetch 정보

  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // TODO productId와 productOptionId 필수 선택 검증

  // 각 아이템의 detail 불러오기
  const handleItemClick = async (id: number) => {
    // fetchedDetail의 결과가 할당되기 전에 타입가드가 발동해서 undefined 나오는 것 같다
    setSelectedItem(id);

    const fetchedDetail = await fetchProductDetail(id);
    setIsLoading(true);

    if (!fetchedDetail) {
      console.error("문제가 발생했습니다. 다시 시도해주세요.");
    } else {
      setProductDetail(fetchedDetail);

      setIsLoading(false);
    }
  };

  const handleOptionItemClick = (id: number) => {
    console.log("선택한 최종 옵션", id);
    setSelectedOption(id);
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
    setSelectedItem(null);
  }, [selectedCategory]);

  useEffect(() => {
    console.log("선택된 아이템", selectedItem);
  }, [selectedItem]);

  return isLoading ? (
    <p>제품 목록 불러오는 중...</p>
  ) : (
    <div>
      <RadioGroup
        aria-labelledby="products-radio-buttons-group-label"
        name="radio-buttons-group"
        value={selectedItem}
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

      {selectedItem && (
        <RadioGroup
          aria-labelledby="product-option-radio-buttons-group-label"
          name="radio-buttons-group"
          value={selectedOption}
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
