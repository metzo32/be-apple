import type { GetUserProductResponse } from "@/types/userProduct";
import MonthDiff from "./MonthDiff";
import useModal from "@/hooks/useModal";
import Modal from "../Modal/Modal";
import { IoCloseOutline } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import {
  isIpadProduct,
  isIphoneProduct,
  isMacProduct,
} from "@/types/productTypeGurards";
import Link from "next/link";

interface UserProductCardProps {
  userProduct: GetUserProductResponse;
  onDelete: (id: number) => void;
}

export default function UserProductCard({
  userProduct,
  onDelete,
}: UserProductCardProps) {
  const { isModalOpen, openModal, closeModal } = useModal();

  console.log("유저 프로덕트", userProduct);

  // TODO 유저프로덕트에 reviews조회기능 추가되면 - 리뷰 있는 경우 확인모달 띄우기 추가
  if (isMacProduct(userProduct.product)) {
    const { myOption, displaySize } = userProduct.product;

    return (
      <Link
        href={`/Mac/${userProduct.product.id}`}
        className="user-product-card"
      >
        <h3
          className={`justify-self-start ${
            userProduct.status === "SOLD" && "line-through text-light"
          }`}
        >
          {userProduct.product.name}
        </h3>
        <div className="flex gap-2 justify-self-center">
          <p className="justify-self-center text-xs md:text-sm text-light">
            {myOption?.processor}
          </p>
          <p className="justify-self-center text-xs md:text-sm text-light">
            {displaySize}
          </p>
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
            <p className="justify-self-end light-p">-</p>
          )}
        </span>

        <div className="flex items-center gap-5  justify-self-end">
          <AiOutlineEdit />

          <button
            onClick={() => onDelete(userProduct.id)}
            className="w-8 aspect-square bg-light text-white text-3xl flex justify-center items-center hover:bg-mid"
          >
            <IoCloseOutline />
          </button>
        </div>

        <Modal
          isModalOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={closeModal}
          onCancel={() => closeModal()}
          title="정말 삭제할까요?"
          content="이 제품에는 리뷰가 작성되어 있어요. 그래도 삭제하시겠어요?"
          confirmBtnText="삭제하기"
        />
      </Link>
    );
  }

  // TODO 카테고리별로 쌓이는 오류.
  if (isIpadProduct(userProduct.product)) {
    const { displaySize } = userProduct.product;

    return (
      <Link
        href={`/iPad/${userProduct.product.id}`}
        className="user-product-card"
      >
        <h3
          className={`justify-self-start ${
            userProduct.status === "SOLD" && "line-through text-light"
          }`}
        >
          {userProduct.product.name}
        </h3>
        <div className="flex gap-2 justify-self-center">
          <p className="justify-self-center text-xs md:text-sm text-light">
            {userProduct.product.processor}
          </p>
          <p className="justify-self-center text-xs md:text-sm text-light">
            {displaySize}
          </p>
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
            <p className="justify-self-end light-p">-</p>
          )}
        </span>

        <div className="flex items-center gap-5  justify-self-end">
          <AiOutlineEdit />

          <button
            onClick={() => onDelete(userProduct.id)}
            className="w-8 aspect-square bg-light text-white text-3xl flex justify-center items-center hover:bg-mid"
          >
            <IoCloseOutline />
          </button>
        </div>
      </Link>
    );
  }

  if (isIphoneProduct(userProduct.product)) {
    const { displaySize } = userProduct.product;

    return (
      <Link
        href={`/iPhone/${userProduct.product.id}`}
        className="user-product-card"
      >
        <h3
          className={`justify-self-start ${
            userProduct.status === "SOLD" && "line-through text-light"
          }`}
        >
          {userProduct.product.name}
          {userProduct.product.id}
        </h3>
        <div className="flex gap-2 justify-self-center">
          <p className="justify-self-center text-xs md:text-sm text-light">
            {userProduct.product.processor}
          </p>
          <p className="justify-self-center text-xs md:text-sm text-light">
            {displaySize}
          </p>
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
            <p className="justify-self-end light-p">-</p>
          )}
        </span>

        <div className="flex items-center gap-5  justify-self-end">
          <AiOutlineEdit />

          <button
            onClick={() => onDelete(userProduct.id)}
            className="w-8 aspect-square bg-light text-white text-3xl flex justify-center items-center hover:bg-mid"
          >
            <IoCloseOutline />
          </button>
        </div>
      </Link>
    );
  }
  return <></>;
}
