import type { GetUserProductResponse } from "@/types/userProduct";
import type {
  ProductDetail,
  ProductDetailIpad,
  ProductDetailIphone,
  ProductDetailMac,
} from "@/types/productDetail";
import { ProductCategoryEnum } from "@/types/productCategory";
import MonthDiff from "./MonthDiff";
import { useState } from "react";
import useModal from "@/hooks/useModal";
import Modal from "../Modal/Modal";
import { IoCloseOutline } from "react-icons/io5";

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

interface UserProductCardProps {
  userProduct: GetUserProductResponse;
  onDelete: (id: number) => void;
}

export default function UserProductCard({
  userProduct,
  onDelete,
}: UserProductCardProps) {
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const { isModalOpen, openModal, closeModal } = useModal();

  const getConfirmation = () =>
    new Promise<boolean>((resolve) => {
      setPendingDeleteId(() => {
        openModal();
        return userProduct.id;
      });
    });

  if (isMacProduct(userProduct.product)) {
    const { myOption, displaySize } = userProduct.product;

    return (
      <div
        className={`user-product-card ${
          pendingDeleteId === userProduct.product.id && "bg-light"
        }`}
      >
        <h3
          className={`justify-self-start ${
            userProduct.status === "SOLD" && "line-through text-light"
          }`}
        >
          {userProduct.product.name}
        </h3>
        <div className="flex gap-2 justify-self-center">
          <p className="text-light">{myOption?.processor}</p>
          <p className="text-light">{displaySize}</p>
        </div>

        <span className="justify-self-center">
          {userProduct.status !== "SOLD" && (
            <MonthDiff purchasedAt={userProduct.purchasedAt} />
          )}
        </span>

        <span>
          {userProduct.purchasePrice && userProduct.purchasePrice !== 0 ? (
            <p className="justify-self-end light-p">{`${userProduct.purchasePrice.toLocaleString()}원`}</p>
          ) : (
            <p className="justify-self-center light-p">-</p>
          )}
        </span>

        <button
          onClick={() => onDelete(userProduct.id)}
          className="w-8 aspect-square justify-self-end bg-light text-white text-3xl flex justify-center items-center hover:bg-mid"
        >
          <IoCloseOutline />
        </button>

        <Modal
          isModalOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={getConfirmation}
          onCancel={() => closeModal()}
          title="정말 삭제할까요?"
          content="이 제품에는 리뷰가 작성되어 있어요. 그래도 삭제하시겠어요?"
          confirmBtnText="삭제하기"
        />
      </div>
    );
  }
  if (isIpadProduct(userProduct.product)) {
    const { displaySize } = userProduct.product;

    return (
      <div className="user-product-card">
        <h3>{userProduct.product.name}</h3>
        <div className="flex gap-5 items-center">
          <p className="text-lg text-light">{userProduct.product.processor}</p>
          <p className="text-lg text-light">{displaySize}</p>
        </div>

        <button
          onClick={() => onDelete(userProduct.id)}
          className="w-8 aspect-square bg-light text-white text-3xl flex justify-center items-center hover:bg-mid"
        >
          <IoCloseOutline />
        </button>
        <MonthDiff purchasedAt={userProduct.purchasedAt} />
      </div>
    );
  }
  if (isIphoneProduct(userProduct.product)) {
    const { displaySize } = userProduct.product;

    return (
      <div className="user-product-card">
        <h3 className="justify-self-start">{userProduct.product.name}</h3>
        <p className="text-lg text-light">{displaySize}</p>
        <p className="text-lg text-light">{userProduct.product.processor}</p>
        <p>테스트</p>
        <button
          onClick={() => onDelete(userProduct.id)}
          className="justify-self-end w-8 aspect-square bg-light text-white text-3xl flex justify-center items-center hover:bg-mid"
        >
          <IoCloseOutline />
        </button>
        <MonthDiff purchasedAt={userProduct.purchasedAt} />
      </div>
    );
  }
  return <></>;
}
