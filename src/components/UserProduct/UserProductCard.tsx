import Image from "next/image";
import type { GetUserProductResponse } from "@/types/userProduct";
import type {
  ProductDetail,
  ProductDetailIpad,
  ProductDetailIphone,
  ProductDetailMac,
} from "@/types/product";
import { ProductCategoryEnum } from "@/types/productCategory";
import MonthDiff from "./MonthDiff";

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

export default function UserProductCard({
  userProduct,
}: {
  userProduct: GetUserProductResponse;
}) {
  if (isMacProduct(userProduct.product)) {
    const { myOption, displaySize } = userProduct.product;

    return (
      <div className="shrink-0 w-[250px] h-[280px] flex flex-col items-center gap-2 cursor-pointer">
        <Image
          // src={userProduct.product.photos[0] || "/assets/images/fallback.png"}
          src={"/assets/images/fallback.png"}
          alt={userProduct.product.name}
          width={250}
          height={200}
        />
        <h3>{userProduct.product.name}</h3>
        <p className="text-lg text-light">{displaySize}</p>
        <p className="text-lg text-light">{myOption?.processor}</p>
        <MonthDiff purchasedAt={userProduct.purchasedAt} />
      </div>
    );
  }
  if (isIpadProduct(userProduct.product)) {
    const { displaySize } = userProduct.product;

    return (
      <div className="shrink-0 w-[250px] h-[280px] flex flex-col items-center gap-2 cursor-pointer">
        <Image
          // src={userProduct.product.photos[0] || "/assets/images/fallback.png"}
          src={"/assets/images/fallback.png"}
          alt={userProduct.product.name}
          width={250}
          height={200}
        />
        <h3>{userProduct.product.name}</h3>
        <p className="text-lg text-light">{displaySize}</p>
        <p className="text-lg text-light">{userProduct.product.processor}</p>
        <MonthDiff purchasedAt={userProduct.purchasedAt} />
      </div>
    );
  }
  if (isIphoneProduct(userProduct.product)) {
    const { displaySize } = userProduct.product;

    return (
      <div className="shrink-0 w-[250px] h-[280px] flex flex-col items-center gap-2 cursor-pointer">
        <Image
          // src={userProduct.product.photos[0] || "/assets/images/fallback.png"}
          src={"/assets/images/fallback.png"}
          alt={userProduct.product.name}
          width={250}
          height={200}
        />
        <h3>{userProduct.product.name}</h3>
        <p className="text-lg text-light">{displaySize}</p>
        <p className="text-lg text-light">{userProduct.product.processor}</p>
        <MonthDiff purchasedAt={userProduct.purchasedAt} />
      </div>
    );
  }
  return <></>;
}

// if (userProduct.product.category === "Mac") {
//   const product = userProduct.product as ProductDetailMac;
//   const option = userProduct.product.myOption as MacOption;
//   return (
//     <div className="shrink-0 w-[250px] h-[280px] flex flex-col items-center gap-2 cursor-pointer">
//       <Image
//         src={userProduct.product.photos[0] || "/assets/images/fallback.png"}
//         alt={userProduct.product.name}
//         width={250}
//         height={200}
//       />
//       <h3>{userProduct.product.name}</h3>
//       <p className="text-lg text-light">{userProduct.product.displaySize}</p>
//       <p className="text-lg text-light">
//         {userProduct.product.myOption?.processor}
//       </p>
//       <p className="text-lg">
//         구입 후 약{" "}
//         {month && month >= 6 ? <strong>{month}개월</strong> : `${month}개월`}{" "}
//         경과
//       </p>

//       {month && month >= 6 ? <ButtonStrong text="최신 제품 알아보기" /> : null}
//     </div>
//   );
// }
