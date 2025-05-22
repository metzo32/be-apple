"use client";

import { useState, useEffect } from "react";
import {
  UserProductCondition,
  UserProductStatus,
  CreateUserProductReqDto,
  GetUserProductResponse,
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
import { IoCloseOutline } from "react-icons/io5";
import ButtonStrong from "../designs/ButtonStrong";
import ButtonBasic from "../designs/ButtonBasic";
import { Button } from "@mui/material";
import {
  useAddUserProductMutation,
  useEditUserProductMutation,
} from "@/hooks/useUserProductQuery";
import { useUserStore } from "@/stores/useUserStore";

interface SelectCompProps {
  isSelectWindowOpened: boolean;
  setIsSelectWindowOpened: (isSelectWindowOpened: boolean) => void;
  editmode: boolean;
  editTarget?: GetUserProductResponse;
}

export default function SelectComp({
  isSelectWindowOpened,
  setIsSelectWindowOpened,
  editmode,
  editTarget
}: SelectCompProps) {
  const { user } = useUserStore();
  const { isModalOpen, openModal, closeModal } = useModal();

  const userId = user?.id ?? null;

  const [formData, setFormData] = useState<UserProductFormData>(() => {
    if (editmode && editTarget) {
      return {
        productId: editTarget.product.id,
        productOptionId: editTarget.product.myOption?.id ?? null,
        purchasedAt: editTarget.purchasedAt ?? "",
        purchasePrice: editTarget.purchasePrice ?? 0,
        soldAt: editTarget.soldAt ?? "",
        status: editTarget.status,
        repurchasedCount: editTarget.repurchasedCount,
        condition: editTarget.condition,
        memo: editTarget.memo ?? "",
      };
    }
    return {
      productId: null,
      productOptionId: null,
      purchasedAt: "",
      purchasePrice: 0,
      soldAt: "",
      status: UserProductStatus.ACTIVE,
      repurchasedCount: 0,
      condition: UserProductCondition.NEW,
      memo: "",
    };
  });

  const [isLoading, setIsLoading] = useState(false);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);
  const [displayedPrice, setDisplayedPrice] = useState<string>(() => {
    if (editmode && editTarget?.purchasePrice) {
      return editTarget.purchasePrice.toLocaleString() + "원";
    }
    return "";
  });
  const [isSoldSelected, setIsSoldSelected] = useState(() => {
    if (editmode && editTarget?.status === UserProductStatus.SOLD) {
      return true;
    }
    return false;
  });
  const [isMultiplePurchased, setIsMultiplePurchased] = useState(() => {
    if (editmode && editTarget) {
      return editTarget.repurchasedCount > 0;
    }
    return false;
  });
  const [tempMemo, setTempMemo] = useState<string>(() => {
    if (editmode && editTarget?.memo) {
      return editTarget.memo;
    }
    return "";
  });
  const [displayRepurchase, setDisplayRepurchase] = useState(() => {
    if (editmode && editTarget) {
      return editTarget.repurchasedCount + 1;
    }
    return 1;
  });

  const initialForm = {
    productId: 0,
    productOptionId: 0,
    purchasedAt: "",
    purchasePrice: 0,
    soldAt: "",
    status: UserProductStatus.ACTIVE,
    repurchasedCount: 0,
    condition: UserProductCondition.NEW,
    memo: "",
  };

  // 제품 추가 뮤테이션 함수
  const { mutate: addUserProductMutationFn } =
    useAddUserProductMutation(userId);

  // 제품 수정 뮤테이션 함수
  const { mutate: editUserProductMutationFn } =
    useEditUserProductMutation(userId);

  // 전체 페이지
  const MAX_PAGE = 6;
  const MAX_MEMO_LENGTH = 200;

  // Reset form when editTarget changes
  useEffect(() => {
    if (editmode && editTarget) {
      setFormData({
        productId: editTarget.product.id,
        productOptionId: editTarget.product.myOption?.id ?? null,
        purchasedAt: editTarget.purchasedAt ?? "",
        purchasePrice: editTarget.purchasePrice ?? 0,
        soldAt: editTarget.soldAt ?? "",
        status: editTarget.status,
        repurchasedCount: editTarget.repurchasedCount,
        condition: editTarget.condition,
        memo: editTarget.memo ?? "",
      });
      setDisplayedPrice(editTarget.purchasePrice ? editTarget.purchasePrice.toLocaleString() + "원" : "");
      setTempMemo(editTarget.memo ?? "");
      setDisplayRepurchase(editTarget.repurchasedCount + 1);
      setIsSoldSelected(editTarget.status === UserProductStatus.SOLD);
      setIsMultiplePurchased(editTarget.repurchasedCount > 0);
    } else {
      // Reset to initial state when adding new product
      setFormData({
        productId: null,
        productOptionId: null,
        purchasedAt: "",
        purchasePrice: 0,
        soldAt: "",
        status: UserProductStatus.ACTIVE,
        repurchasedCount: 0,
        condition: UserProductCondition.NEW,
        memo: "",
      });
      setDisplayedPrice("");
      setTempMemo("");
      setDisplayRepurchase(1);
      setIsSoldSelected(false);
      setIsMultiplePurchased(false);
    }
  }, [editmode, editTarget]);

  // 보유제품 추가 팝업 닫기
  const handleCloseSelectWindow = () => {
    if (isEqual(initialForm, formData)) {
      setIsSelectWindowOpened(false);
    } else {
      openModal();
    }
  };

  // 보유 제품 작성 중 이탈 시, 모달 확인 로직
  const handleResetForm = () => {
    setFormData({
      productId: null,
      productOptionId: null,
      purchasedAt: "",
      purchasePrice: 0,
      soldAt: "",
      status: UserProductStatus.ACTIVE,
      repurchasedCount: 0,
      condition: UserProductCondition.NEW,
      memo: "",
    });

    setCurrentPageNumber(0);
    setIsLoading(false);
    closeModal();
    setIsSelectWindowOpened(false);
  };

  // 이전 페이지
  const handlePrevPage = () => {
    if (currentPageNumber === 0) {
      return;
    }
    if (isLoading) {
      return;
    }
    setCurrentPageNumber(currentPageNumber - 1);
  };

  // 다음 페이지
  // TODO 이미 추가한 아이템 선택 시 alert
  const handleNextPage = () => {
    if (currentPageNumber > MAX_PAGE) {
      return;
    }
    if (
      currentPageNumber === 0 &&
      (!formData.productId || !formData.productOptionId)
    ) {
      alert("등록할 제품과 옵션을 선택해주세요.");
      return;
    }

    setCurrentPageNumber(currentPageNumber + 1);
  };

  const isValidDto = (
    // 타입 검증
    formData: UserProductFormData
  ): formData is CreateUserProductReqDto => {
    return !!formData.productId && !!formData.productOptionId;
  };

  //TODO 2초 시간차 두고 submit되도록.
  const handleSubmit = () => {
    if (!isValidDto(formData)) {
      alert("제품과 제품 옵션을 선택해주세요.");
      return;
    }

    if (!editmode) {
      addUserProductMutationFn(formData as CreateUserProductReqDto, {
        onSuccess: () => {
          setIsSelectWindowOpened(false);
        },
        onError: () => {
          console.error("유저 보유 목록 생성 실패");
        },
      });
    } else {
      editUserProductMutationFn(formData);
    }
  };

  const handlePriceChange = (value: string) => {
    if (value.length > 9) {
      return;
    }
    const numberPrice = Number(value.replace(/[^0-9]/g, ""));
    setFormData((prev) => ({ ...prev, purchasePrice: numberPrice }));
    setDisplayedPrice(numberPrice.toLocaleString() + "원");

    setFormData({
      ...formData,
      purchasePrice: numberPrice,
    });
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
    if (formData.purchasedAt === formatDate(String(date))) return;
    setFormData({
      ...formData,
      purchasedAt: formatDate(String(date)),
    });
  };

  // 판매일 선택
  const handleSoldDateChange = (date: Date) => {
    if (formData.soldAt === formatDate(String(date))) return;
    setFormData({
      ...formData,
      soldAt: formatDate(String(date)),
    });
  };

  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTempMemo(e.target.value);
  };

  const handleMemoBlur = () => {
    setFormData((prev) => ({
      ...prev,
      memo: tempMemo,
    }));
  };

  // 함수 시그니처....
  const handleMultiplePurchased = (e: React.ChangeEvent<HTMLInputElement>) => {
    const purchaseCount = Number(e.target.value.replace(/[^0-9]/g, ""));

    setDisplayRepurchase(purchaseCount);
  };

  const handleMultiplePurchasedBlur = () => {
    if (Number(displayRepurchase) < 1) {
      alert("1 이상의 숫자를 써주세요");
      setDisplayRepurchase(1);
      setFormData((prev) => ({
        ...prev,
        repurchasedCount: 1,
      }));
    } else if (displayRepurchase > 99) {
      alert("100 미만의 숫자를 써주세요");
      setDisplayRepurchase(99);
      setFormData((prev) => ({
        ...prev,
        repurchasedCount: 99,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        repurchasedCount: Number(formData.repurchasedCount) - 1, // 총 구매횟수 - 1 = 재구매 횟수
      }));
    }
  };

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
            <button // 창 닫기 버튼
              type="button"
              onClick={handleCloseSelectWindow}
              className="w-7 md:w-12 aspect-square text-xl md:text-4xl flex items-center justify-center absolute top-0 right-0 bg-light text-white hover:bg-mid"
            >
              <IoCloseOutline />
            </button>

            <form
              onSubmit={handleSubmit}
              className="w-full h-full flex flex-col gap-5"
            >
              <div className="w-full h-[40px] flex items-center justify-between">
                <span className="ml-5 md:m-0">
                  {currentPageNumber !== 0 && (
                    <ButtonBasic
                      type="button"
                      onClick={handlePrevPage}
                      text="이전"
                    />
                  )}
                </span>

                {/* 검색바 */}
                {currentPageNumber === 0 && (
                  <span className="hidden xl:flex w-[260px] h-[40px] md:w-full xl:w-[500px] ml-0 xl:ml-16 items-center justify-center gap-5">
                    {/* <SearchBar /> */}
                  </span>
                )}

                <span>
                  {currentPageNumber !== MAX_PAGE && (
                    <ButtonStrong
                      type="button"
                      onClick={handleNextPage}
                      text="다음"
                    />
                  )}
                </span>
              </div>

              {/* 검색바 */}
              {currentPageNumber === 0 && (
                <span className="block xl:hidden">{/* <SearchBar /> */}</span>
              )}

              {currentPageNumber === 0 && ( // 카테고리 선택바 및 검색바
                <SelectCategory
                  productSelectInfo={{
                    productId: formData.productId!,
                    productOptionId: formData.productOptionId!,
                  }}
                  setproductSelectInfo={({ productId, productOptionId }) => {
                    setFormData((prev) => ({
                      ...prev,
                      productId,
                      productOptionId,
                    }));
                  }}
                />
              )}

              {currentPageNumber === 1 && ( // 구매가
                <SelectPurchasedPrice
                  displayedPrice={displayedPrice}
                  onChange={handlePriceChange}
                />
              )}

              {currentPageNumber === 2 && ( // 구매 시기
                <SelectPurchasedDate
                  pickedDate={new Date(formData.purchasedAt)}
                  onChange={handlePurchasedDateChange}
                />
              )}

              {currentPageNumber === 3 && ( // 제품 활성화 상태
                <SelectStatus
                  onStatusChange={handleStatusSelect}
                  selectedStatus={formData.status}
                  purchasedDate={formData.purchasedAt}
                />
              )}

              {currentPageNumber === 4 && ( // 제품 손상도
                <SelectCondition
                  selectedCondition={formData.condition}
                  onChangeCondition={handleConditionSelect}
                />
              )}

              {currentPageNumber === 5 && ( // 재구매 여부
                <SelectMultiplePurchased
                  isMultiplePurchased={isMultiplePurchased}
                  setIsMultiplePurchased={setIsMultiplePurchased}
                  handleConditionSelect={(e) => handleConditionSelect(e.target.value as UserProductCondition)}
                  value={displayRepurchase}
                  handleMultiplePurchased={handleMultiplePurchased}
                  handleMultiplePurchasedBlur={handleMultiplePurchasedBlur}
                />
              )}

              {currentPageNumber === 6 && (
                <SelectMemo
                  tempMemo={tempMemo}
                  handleMemoChange={handleMemoChange}
                  handleMemoBlur={handleMemoBlur}
                  maxLength={MAX_MEMO_LENGTH}
                />
              )}

              <span className="w-full flex items-center justify-center">
                {currentPageNumber === MAX_PAGE &&
                  (isLoading ? (
                    <Button
                      size="medium"
                      variant="outlined"
                      disabled={isLoading}
                      onClick={handleSubmit}
                      sx={{
                        width: "60px",
                      }}
                    >
                      Disabled
                    </Button>
                  ) : (
                    <ButtonStrong type="submit" text="등록하기" />
                  ))}
              </span>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
