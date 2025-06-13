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
import {
  useDeleteUserProductMutation,
} from "@/hooks/useUserProductQuery";

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
      deleteUserProductMutationFn(userProduct.id);
    }
  };

  // TODO 유저프로덕트에 reviews조회기능 추가되면 - 리뷰 있는 경우 확인모달 띄우기 추가
  if (isMacProduct(userProduct.product)) {
    const { myOption, displaySize } = userProduct.product;

    return (
      <>
        <Link
          href={`/Mac/${userProduct.product.id}`}
          className="user-product-card"
        >
          {/* TODO 이미지로 대체 */}
          <div className="w-16 h-16 bg-gray-300" />

          <div className="flex flex-col items-start gap-1 col-span-2">
            <h3
              className={`justify-self-start font-bold ${
                userProduct.status === "SOLD" && "line-through text-light"
              }`}
            >
              {userProduct.product.name}
            </h3>

            <div className="flex gap-1 justify-self-center">
              <p className="justify-self-center text-xs md:text-sm text-light">
                {myOption?.processor}
              </p>
              <p className="justify-self-center text-xs md:text-sm text-light">
                {displaySize}
              </p>
            </div>
          </div>

          <span className="justify-self-center">
            {userProduct.status !== "SOLD" && (
              <MonthDiff purchasedAt={userProduct.purchasedAt} category="Mac" />
            )}
          </span>

          <span className="w-full flex justify-between md:justify-end items-center">
            {userProduct.purchasePrice && userProduct.purchasePrice !== 0 ? (
              <p className="justify-self-end light-p whitespace-nowrap">{`${userProduct.purchasePrice.toLocaleString()}원`}</p>
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
            onDelete(userProduct.id);
            closeModal();
          }}
          onCancel={() => closeModal()}
          title="정말 삭제할까요?"
          content="이 제품에는 리뷰가 작성되어 있어요. 그래도 삭제하시겠어요?"
          confirmBtnText="삭제하기"
        />
      </>
    );
  }

  // TODO 카테고리별로 쌓이는 오류.
  if (isIpadProduct(userProduct.product)) {
    const { myOption, displaySize } = userProduct.product;

    return (
      <Link
        href={`/iPad/${userProduct.product.id}`}
        className="user-product-card"
      >
        {/* TODO 이미지로 대체 */}
        <div className="w-16 h-16 bg-gray-300" />
        <div className="flex flex-col items-start gap-1 col-span-2">
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
            <p className="justify-self-center text-xs md:text-sm text-light">
              {myOption?.storage}
            </p>
          </div>
        </div>

        <span className="justify-self-center">
          {userProduct.status !== "SOLD" && (
            <MonthDiff purchasedAt={userProduct.purchasedAt} category="iPad"/>
          )}
        </span>

        <span className="w-full flex justify-between md:justify-end items-center">
          {userProduct.purchasePrice && userProduct.purchasePrice !== 0 ? (
            <p className="justify-self-end light-p whitespace-nowrap">{`${userProduct.purchasePrice.toLocaleString()}원`}</p>
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
    );
  }

  if (isIphoneProduct(userProduct.product)) {
    const { myOption, displaySize } = userProduct.product;

    return (
      <Link
        href={`/iPhone/${userProduct.product.id}`}
        className="user-product-card"
      >
        {/* TODO 이미지로 대체 */}
        <div className="w-16 h-16 bg-gray-300" />
        <div className="flex flex-col items-start gap-1 col-span-2">
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
            <p className="justify-self-center text-xs md:text-sm text-light">
              {myOption?.storage}
            </p>
          </div>
        </div>

        <span className="justify-self-center">
          {userProduct.status !== "SOLD" && (
            <MonthDiff purchasedAt={userProduct.purchasedAt} category="iPhone"/>
          )}
        </span>

        <span className="w-full flex justify-between md:justify-end items-center">
          {userProduct.purchasePrice && userProduct.purchasePrice !== 0 ? (
            <p className="justify-self-end light-p whitespace-nowrap">{`${userProduct.purchasePrice.toLocaleString()}원`}</p>
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
    );
  }
  return <></>;
}
