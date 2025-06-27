import Image from "next/image";
import type { GetUserProductResponse } from "@/types/userProduct";
import MonthDiff from "./MonthDiff";
import useModal from "@/hooks/useModal";
import Modal from "../Modal/Modal";
import {
  isIpadProduct,
  isIphoneProduct,
  isMacProduct,
} from "@/types/productTypeGurards";
import Link from "next/link";
import { ButtonBasic } from "../designs/ButtonBasic";
import { useDeleteUserProductMutation } from "@/hooks/useUserProductQuery";

interface UserProductCardProps {
  userProduct: GetUserProductResponse;
  onDelete: (id: number) => void;
  userId: number | null;
  onEditSubmit?: (userProduct: GetUserProductResponse) => void;
}

export default function UserProductCard({
  userProduct,
  onDelete,
  userId,
  onEditSubmit,
}: UserProductCardProps) {
  const { isModalOpen, openModal, closeModal } = useModal();

  const { mutate: deleteUserProductMutationFn } =
    useDeleteUserProductMutation(userId);

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (onEditSubmit) {
      onEditSubmit(userProduct);
    }
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // 리뷰가 있는 경우 모달 확인
    if (userProduct.reviews.some((review) => review.userId === userId)) {
      openModal();
    } else {
      // 리뷰가 없는 경우 즉시 삭제
      openModal();
      // deleteUserProductMutationFn({ id: userProduct.id });
    }
  };

  const { myOption, displaySize } = userProduct.product;

  return (
    <>
      <Link
        href={`/${userProduct.product.category}/${userProduct.product.id}`}
        className="user-product-card"
      >
        <div className="w-20 aspect-square relative overflow-auto">
          <Image
            src={userProduct.product.photos[0]}
            alt={userProduct.product.name}
            className="object-contain"
            fill
          />
        </div>

        <div className="flex flex-col items-start gap-1 col-span-1">
          <h3
            className={`justify-self-start font-bold ${
              userProduct.status === "SOLD" && "line-through text-light"
            }`}
          >
            {userProduct.product.name}
          </h3>

          <div className="flex gap-1 justify-self-center">
            {isMacProduct(userProduct.product) ? (
              <>
                {/* TODO 맥타입 좁히기 다시 확인해보기 */}
                {/* <p className="justify-self-center text-xs md:text-sm text-light">
                  {myOption?.processor}
                </p> */}
                <p className="justify-self-center text-xs md:text-sm text-light">
                  {displaySize}
                </p>
              </>
            ) : (
              <>
                <p className="justify-self-center text-xs md:text-sm text-light">
                  {myOption?.storage}
                </p>
                <p className="justify-self-center text-xs md:text-sm text-light">
                  {displaySize}
                </p>
              </>
            )}
          </div>
        </div>

        <span className="justify-self-end">
          {userProduct.status !== "SOLD" && (
            <MonthDiff purchasedAt={userProduct.purchasedAt} category="Mac" />
          )}
        </span>

        <span className="w-full flex justify-between md:justify-end items-center">
          {userProduct.purchasePrice && userProduct.purchasePrice !== 0 ? (
            <p className="justify-self-end light-p whitespace-nowrap">{`${userProduct.purchasePrice.toLocaleString()}`}</p>
          ) : (
            <p className="justify-self-end light-p whitespace-nowrap">
              가격 미입력
            </p>
          )}

          <div className="flex gap-3 md:hidden">
            <ButtonBasic text="수정하기" onClick={handleEdit} />
            <ButtonBasic text="삭제하기" onClick={handleDelete} />
          </div>
        </span>

        <div className="ml-10 hidden md:flex flex-col">
          <ButtonBasic text="수정하기" onClick={handleEdit} />
          <ButtonBasic text="삭제하기" onClick={handleDelete} />
        </div>
      </Link>

      <Modal
        isModalOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={() => {
          deleteUserProductMutationFn({
            id: userProduct.id,
            options: { force: true },
          });
          closeModal();
        }}
        onCancel={() => closeModal()}
        title="잠깐!"
        content={
          userProduct.reviews.some((review) => review.userId === userId)
            ? "이 제품에는 리뷰가 작성되어 있어요. 그래도 삭제하시겠어요?"
            : "정말 삭제할까요?"
        }
        confirmBtnText="삭제하기"
      />
    </>
  );
}
