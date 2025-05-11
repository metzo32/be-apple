import { useProductOptionsQuery } from "@/hooks/useProductQuery";
import { ProductCategoryEnum } from "@/types/productCategory";
import {
  ProductDetail,
  ProductDetailIpad,
  ProductDetailIphone,
  ProductDetailMac,
} from "@/types/productDetail";

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

interface OptionsProps {
  productId: number;
  clickedProductId: number | null;
  onOptionSelect: (optionId: number) => void;
  selectedOptionId: number | null;
}

// props를 설정할 때도- 이 컴포넌트가 필요한 데이터 타입과 내용을 생각하고 넣는게 중요해요.

// TODO 여기서 options 불러오는 쿼리를 호출하고, 상위에서 productId를 동적으로 받아온다.
export default function Options({
  productId,
  clickedProductId,
  onOptionSelect,
  selectedOptionId,
}: OptionsProps) {
  const isOptionOpen = productId === clickedProductId;

  const { data: optionsData } = useProductOptionsQuery(productId, {
    enabled: isOptionOpen,
  });

  return isOptionOpen ? (
    <div className="flex absolute top-2 right-2 z-20">
      {/* 맥 케이스 */}
      <div className="flex flex-col gap-2 ">
        {optionsData &&
          isMacProduct(optionsData) &&
          optionsData.options.map((macOption) => (
            <div
              key={macOption.id}
              onClick={() => onOptionSelect(macOption.id)}
              className={`${
                selectedOptionId === macOption.id ? "selected" : "bg-bglight"
              } option-select hover:bg-bglightHover`}
            >
              {macOption.optionSpecs.map((spec) => (
                <p key={spec.type} className="text-xs text-textHover">
                  {spec.value}
                </p>
              ))}
            </div>
          ))}
      </div>

      {/* 아이패드 케이스 */}
      {optionsData &&
        isIpadProduct(optionsData) &&
        optionsData.options.map((ipadOption) => (
          <div
            key={ipadOption.id}
            onClick={() => onOptionSelect(ipadOption.id)}
            className={`${
              selectedOptionId === ipadOption.id ? "selected" : "bg-bglight"
            } option-select  hover:bg-bglightHover`}
          >
            <p>{ipadOption.storage}</p>
          </div>
        ))}

      {/* 아이폰 케이스 */}
      {optionsData &&
        isIphoneProduct(optionsData) &&
        optionsData.options.map((iphoneOption) => (
          <div
            key={iphoneOption.id}
            onClick={() => onOptionSelect(iphoneOption.id)}
            className={`${
              selectedOptionId === iphoneOption.id ? "selected" : "bg-bglight"
            } option-select  hover:bg-bglightHover`}
          >
            <p>{iphoneOption.storage}</p>
          </div>
        ))}
    </div>
  ) : null;
}
