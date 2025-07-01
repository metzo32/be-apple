import { useProductDetailQuery } from "@/hooks/useProductQuery";
import {
  isIpadProduct,
  isIphoneProduct,
  isMacProduct,
} from "@/types/productTypeGurards";

interface OptionsProps {
  productId: number;
  clickedProductId: number | null;
  onOptionSelect: (optionId: number) => void;
  selectedOptionId: number | null;
}

export default function Options({
  productId,
  clickedProductId,
  onOptionSelect,
  selectedOptionId,
}: OptionsProps) {
  const isOptionOpen = productId === clickedProductId;

  const { data: optionsData } = useProductDetailQuery(productId, {
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
                selectedOptionId === macOption.id ? "selected" : "bg-white"
              } option-select hover:bg-bglightHover`}
            >
              {macOption.optionSpecs.map((spec) =>
                spec.type === "storage" ? (
                  <p key={spec.type} className="text-xs">
                    {spec.value}
                  </p>
                ) : null
              )}
            </div>
          ))}

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
              {ipadOption.optionSpecs.map((spec) =>
                spec.type === "storage" ? (
                  <p key={spec.type} className="text-xs">
                    {spec.value}
                  </p>
                ) : null
              )}
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
              {iphoneOption.optionSpecs.map((spec) =>
                spec.type === "storage" ? (
                  <p key={spec.type} className="text-xs">
                    {spec.value}
                  </p>
                ) : null
              )}
            </div>
          ))}
      </div>
    </div>
  ) : null;
}
