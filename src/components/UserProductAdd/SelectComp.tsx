"use client";

import { useState, Dispatch, SetStateAction } from "react";
import {
  UserProductCondition,
  UserProductStatus,
  CreateUserProductReqDto,
} from "@/types/userProduct";
import type { UserProductFormData } from "@/types/addUserProducts";
import useModal from "@/hooks/useModal";
import { formatDate } from "@/module/formatDate";
import Modal from "../Modal/Modal";
import isEqual from "lodash/isEqual";
import SelectCategory from "./SelectOptions/SelectCategory";
import SelectPurchasedPrice from "./SelectOptions/SelectPurchasedPrice";
import SelectPurchasedDate from "./SelectOptions/SelectPurchasedDate";
import SelectStatus from "./SelectOptions/SelectStatus";
import SelectCondition from "./SelectOptions/SelectCondition";
import SelectMultiplePurchased from "./SelectOptions/SelectMultiplePurchased";
import SelectMemo from "./SelectOptions/SelectMemo";
import ButtonStrong, {
  ButtonDisabled,
  ButtonMedium,
} from "../designs/ButtonStrong";
import {
  useAddUserProductMutation,
  useEditUserProductMutation,
} from "@/hooks/useUserProductQuery";
import { useUserStore } from "@/stores/useUserStore";
import { initialUserProductForm } from "../UserProduct/UserProduct";
import { useUserProductModalPage } from "@/hooks/useUserProductModalPage";
import CloseButton from "../designs/CloseButton";

interface SelectCompProps {
  isSelectWindowOpened: boolean;
  setIsSelectWindowOpened: (isSelectWindowOpened: boolean) => void;
  userProductIdToUpdate: number | null;
  formData: UserProductFormData;
  setFormData: Dispatch<SetStateAction<UserProductFormData>>;
  isEditMode: boolean;
}

export default function SelectComp({
  isSelectWindowOpened,
  setIsSelectWindowOpened,
  userProductIdToUpdate,
  formData,
  setFormData,
  isEditMode,
}: SelectCompProps) {
  const { user } = useUserStore();
  const { isModalOpen, openModal, closeModal } = useModal();

  const editMode = !!userProductIdToUpdate;

  const userId = user?.id ?? null;

  const [isLoading, setIsLoading] = useState(false);
  const [displayedPrice, setDisplayedPrice] = useState("");
  const [displayedRepurchasedCount, setDisplayedRepurchasedCount] =
    useState<string>(formData.repurchasedCount.toLocaleString());

  const {
    MAX_PAGE,
    currentPageNumber,
    handlePrevPage,
    handleNextPage,
    initializePageNumber,
  } = useUserProductModalPage(isEditMode);

  // 제품 추가 뮤테이션 함수
  const { mutate: addUserProductMutationFn } =
    useAddUserProductMutation(userId);

  // 제품 수정 뮤테이션 함수
  const { mutate: editUserProductMutationFn } =
    useEditUserProductMutation(userId);

  const MAX_MEMO_LENGTH = 200;

  // 보유제품 추가 팝업 닫기
  const handleCloseSelectWindow = () => {
    if (isEqual(initialUserProductForm, formData)) {
      setIsSelectWindowOpened(false);
    } else {
      openModal();
    }
  };

  // 보유 제품 작성 중 이탈 시, 모달 팝업 후 컨펌 로직
  const handleResetForm = () => {
    setFormData(initialUserProductForm);
    setDisplayedPrice("");
    setIsLoading(false);
    closeModal();
    setIsSelectWindowOpened(false);
    initializePageNumber();
  };

  // 타입 검증
  const isValidDto = (
    formData: UserProductFormData
  ): formData is CreateUserProductReqDto => {
    return !!formData.productId && !!formData.productOptionId;
  };
  
  console.log("폼데이터", formData)

  // 최종 제출
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const onSuccess = () => {
      handleResetForm();
    };

    const onError = () => {
      console.log(
        editMode ? "유저 보유 목록 수정 실패" : "유저 보유 목록 생성 실패"
      );
      setIsLoading(false);
      setFormData(initialUserProductForm);
    };

    if (editMode) {
      editUserProductMutationFn(
        { userProduct: formData, userProductId: userProductIdToUpdate },
        { onSuccess, onError }
      );
      return;
    }

    if (isValidDto(formData)) {
      setTimeout(() => {
        addUserProductMutationFn(formData, { onSuccess, onError });
      }, 500);
      return;
    }

    alert("유효하지 않습니다.");
    setIsLoading(false);
    setFormData(initialUserProductForm);
  };

  // 구매가 작성
  const handlePriceChange = (value: string) => {
    if (value.length > 9) {
      return;
    }
    const numberPrice = value.replace(/[^0-9]/g, ""); // form에 재출할 숫자값
    const formattedPrice = numberPrice // ui상 보여질 값
      ? Number(numberPrice).toLocaleString() + "원"
      : "";

    setDisplayedPrice(formattedPrice);

    setFormData((prev) => ({ ...prev, purchasePrice: Number(numberPrice) }));
  };

  // 보유상태 선택
  const handleStatusSelect = (value: UserProductStatus) => {
    if (formData.status === value) return;
    setFormData((prev) => ({
      ...prev,
      status: value as UserProductStatus,
    }));
  };

  // 제품 상태 선택
  const handleConditionSelect = (value: UserProductCondition) => {
    if (formData.condition === value) return;
    setFormData((prev) => ({
      ...prev,
      condition: value as UserProductCondition,
    }));
  };

  // 구매일 선택
  const handlePurchasedDateChange = (date: Date) => {
    if (!date) return;
    if (formData.purchasedAt === formatDate(String(date))) return;
    setFormData({
      ...formData,
      purchasedAt: formatDate(String(date)) ?? undefined,
    });
  };

  const handleSoldDateChange = (date: Date) => {
    if (formData.soldAt === formatDate(String(date))) return;
    setFormData({
      ...formData,
      soldAt: formatDate(String(date)) ?? undefined,
    });
  };

  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      memo: e.target.value,
    });
  };

  // 함수 시그니처....
  const handleMultiplePurchased = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setDisplayedRepurchasedCount(value);
  };
  const handleMultiplePurchasedBlur = () => {
    const parsed = Number(displayedRepurchasedCount);

    if (parsed < 1) {
      alert("1 이상의 숫자를 써주세요");
      setDisplayedRepurchasedCount("1");
      setFormData((prev) => ({
        ...prev,
        repurchasedCount: 1,
      }));
    } else if (parsed > 9) {
      alert("10 미만의 숫자를 써주세요");
      setDisplayedRepurchasedCount("9");

      setFormData((prev) => ({
        ...prev,
        repurchasedCount: 9,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        repurchasedCount: parsed,
      }));
    }
  };

  // 1회 이상 재구매 여부
  const isMultiplePurchased = formData.repurchasedCount > 0;

  return (
    <>
      {isModalOpen && ( // 작성 중 닫기 시도 모달
        <Modal
          isModalOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={handleResetForm}
          onCancel={closeModal}
          title={"잠깐!"}
          content={"작성 중인 내용이 사라집니다. 진행할까요?"}
          confirmBtnText={"확인"}
        />
      )}

      {isSelectWindowOpened ? (
        <div className="overlay flex justify-center items-center">
          <div className="overflow-hidden w-[300px] h-[500px] md:w-[800px] md:h-[600px] xl:w-[1200px] xl:h-[800px] p-5 pt-10 md:p-12 md:pt-18 xl:p-16 bg-white relative">
            <CloseButton onClick={handleCloseSelectWindow} />
            <form
              onSubmit={handleSubmit}
              className="w-full h-full flex flex-col gap-5"
            >
              <div className="w-full h-[40px] flex items-center justify-between">
                <span>
                  {currentPageNumber !== 0 &&
                    !(isEditMode && currentPageNumber === 1) && (
                      <ButtonMedium
                        type="button"
                        onClick={() => handlePrevPage(isLoading)}
                        text="이전"
                      />
                    )}
                </span>

                <span>
                  {currentPageNumber !== MAX_PAGE && (
                    <ButtonStrong
                      type="button"
                      onClick={() =>
                        handleNextPage(
                          !formData.productId || !formData.productOptionId
                        )
                      }
                      text="다음"
                    />
                  )}
                </span>
              </div>

              {currentPageNumber === 0 && ( // 카테고리 선택 버튼 목록, 상품 카드
                <SelectCategory
                  productSelectInfo={{
                    productId: formData.productId!,
                    productOptionId: formData.productOptionId!,
                  }}
                  setproductSelectInfo={({ productId, productOptionId }) => {
                    setFormData((prev) => ({
                      ...prev,
                      productId: productId ?? undefined,
                      productOptionId: productOptionId ?? undefined,
                    }));
                  }}
                />
              )}

              {currentPageNumber === 1 && ( // 구매가
                <SelectPurchasedPrice
                  displayedPrice={
                    isEditMode
                      ? formData.purchasePrice.toLocaleString() + "원"
                      : displayedPrice
                  }
                  onPriceChange={handlePriceChange}
                />
              )}

              {currentPageNumber === 2 && ( // 구매 시기
                <SelectPurchasedDate
                  pickedDate={
                    formData.purchasedAt
                      ? new Date(formData.purchasedAt)
                      : undefined
                  }
                  onChangePurchasedDate={handlePurchasedDateChange}
                />
              )}

              {currentPageNumber === 3 && ( // 제품 활성화 상태
                <SelectStatus
                  onStatusChange={handleStatusSelect}
                  selectedStatus={formData.status}
                  purchasedAt={formData.purchasedAt}
                  soldDate={formData.soldAt}
                  onSoldDateChange={handleSoldDateChange}
                />
              )}

              {currentPageNumber === 4 && ( // 제품 손상도
                <SelectCondition
                  selectedCondition={formData.condition}
                  onChangeCondition={handleConditionSelect}
                />
              )}

              {currentPageNumber === 5 && (
                <SelectMultiplePurchased
                  isMultiplePurchased={isMultiplePurchased}
                  repurchasedNum={Number(displayedRepurchasedCount)}
                  handleRepurchased={handleMultiplePurchased}
                  handleRepurchasedBlur={handleMultiplePurchasedBlur}
                  handleRepurchasedCountChange={(repurchasedCount) => {
                    setDisplayedRepurchasedCount(
                      repurchasedCount.toLocaleString()
                    );
                    setFormData((prev) => ({
                      ...prev,
                      repurchasedCount: repurchasedCount,
                    }));
                  }}
                />
              )}

              {currentPageNumber === 6 && (
                <SelectMemo
                  tempMemo={formData.memo}
                  handleMemoChange={handleMemoChange}
                  maxLength={MAX_MEMO_LENGTH}
                />
              )}

              <span className="w-full flex items-center justify-center">
                {currentPageNumber === MAX_PAGE &&
                  (isLoading ? (
                    <ButtonDisabled text="로딩 중..." />
                  ) : (
                    <>
                      <ButtonStrong
                        type="submit"
                        text={editMode ? "수정 완료" : "등록하기"}
                      />
                    </>
                  ))}
              </span>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
