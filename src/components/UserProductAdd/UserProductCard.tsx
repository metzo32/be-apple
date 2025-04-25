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
import { useEffect, useState } from "react";
import useModal from "@/hooks/useModal";
import Modal from "../Modal/Modal";


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

export default function UserProductCard({
  userProduct,
}: {
  userProduct: GetUserProductResponse;
}) {
  useEffect(() => {
    console.log("이 아이템의 id", userProduct.id);
  }, []);

  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const { isModalOpen, openModal, closeModal } = useModal();

  const getConfirmation = () =>
    new Promise<boolean>((resolve) => {
      setPendingDeleteId(() => {
        openModal();
        return userProduct.id; // idToDelete는 이 함수 안에서 받아야 함
      });
    });

  const handleRemoveProduct = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();

    if (userProduct.id) {
      const deleteCall = await deleteUserProduct(
        userProduct.id,
        getConfirmation
      );
      if (deleteCall) {
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
        {/* TODO 400 에러 반환 시 confirm 후 body force: true 전달하기 */}
        <button onClick={handleRemoveProduct} className="bg-red-600">
          삭제하기
        </button>

        <Modal
          isModalOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={getConfirmation}
          onCancel={()=> closeModal()}
          title="정말 삭제할까요?"
          content="이 제품에는 리뷰가 작성되어 있어요. 그래도 삭제하시겠어요?"
          confirmBtnText="삭제하기"
        />
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
