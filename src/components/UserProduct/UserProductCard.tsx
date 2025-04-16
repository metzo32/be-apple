import Image from "next/image";
import type { GetUserProductResponse } from "@/types/userProduct";
import type {
  ProductDetail,
  ProductDetailIpad,
  ProductDetailIphone,
  ProductDetailMac,
} from "@/types/productDetail";
import { ProductCategoryEnum } from "@/types/productCategory";
import MonthDiff from "./MonthDiff";
import { deleteUserProduct } from "../fetch/fetchUserProduct";

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

  const handleRemoveProduct = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (userProduct.product.userProductId) {
      const success = await deleteUserProduct(userProduct.id);
      if (success) {
        console.log("삭제 성공");
      } else {
        console.log("삭제 실패");
    
      }
    }
  };

  if (isMacProduct(userProduct.product)) {
    const { myOption, displaySize } = userProduct.product;

    return (
      <div className="user-product-card">
        <span className="relative w-[200px] h-[100px]">
          <Image
            // src={userProduct.product.photos[0] || "/assets/images/fallback.png"}
            src={"/assets/images/fallback.png"}
            alt={userProduct.product.name}
            fill
            className="object-cover"
          />
        </span>
        <h3>{userProduct.product.name}</h3>
        <p className="text-lg text-light">{displaySize}</p>
        <p className="text-lg text-light">{myOption?.processor}</p>
        <button onClick={handleRemoveProduct} className="bg-red-600">삭제하기</button>
        <MonthDiff purchasedAt={userProduct.purchasedAt} />
      </div>
    );
  }
  if (isIpadProduct(userProduct.product)) {
    const { displaySize } = userProduct.product;

    return (
      <div className="user-product-card">
        <span className="relative w-[200px] h-[100px]">
          <Image
            // src={userProduct.product.photos[0] || "/assets/images/fallback.png"}
            src={"/assets/images/fallback.png"}
            alt={userProduct.product.name}
            fill
            className="object-cover"
          />
        </span>

        <h3>{userProduct.product.name}</h3>
        <p className="text-lg text-light">{displaySize}</p>
        <p className="text-lg text-light">{userProduct.product.processor}</p>
        <button>삭제하기</button>
        <MonthDiff purchasedAt={userProduct.purchasedAt} />
      </div>
    );
  }
  if (isIphoneProduct(userProduct.product)) {
    const { displaySize } = userProduct.product;

    return (
      <div className="user-product-card">
        <span className="relative w-[200px] h-[100px]">
          <Image
            // src={userProduct.product.photos[0] || "/assets/images/fallback.png"}
            src={"/assets/images/fallback.png"}
            alt={userProduct.product.name}
            fill
            className="object-cover"
          />
        </span>
        <h3>{userProduct.product.name}</h3>
        <p className="text-lg text-light">{displaySize}</p>
        <p className="text-lg text-light">{userProduct.product.processor}</p>
        <button>삭제하기</button>
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
//     <div className="user-product-card">
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
