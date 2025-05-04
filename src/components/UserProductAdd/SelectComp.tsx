"use client";

import { useState } from "react";
import useOpenSelect from "@/stores/useOpenSelect";
import {
  UserProductCondition,
  UserProductStatus,
  CreateUserProductReqDto,
} from "@/types/userProduct";
import type { UserProductFormData } from "@/types/addUserProducts";
import useModal from "@/hooks/useModal";
import { addUserProduct } from "../fetch/fetchUserProduct";
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
import ButtonStrong, { ButtonMedium } from "../designs/ButtonStrong";
import ButtonBasic from "../designs/ButtonBasic";
import { Button } from "@mui/material";

export default function SelectComp() {
  const { isClicked, setIsClicked } = useOpenSelect();
  const { isModalOpen, openModal, closeModal } = useModal();

  const [formData, setFormData] = useState<UserProductFormData>({
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

  const [isLoading, setIsLoading] = useState(false);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);
  const [displayedPrice, setDisplayedPrice] = useState<string>(""); // UI상 보여지는 가격
  const [isSoldSelected, setIsSoldSelected] = useState(false); // 처분 및 양도 여부
  const [isMultiplePurchased, setIsMultiplePurchased] = useState(false); // 재구매 여부
  const [tempMemo, setTempMemo] = useState<string>(""); // ui상 메모
  const [displayRepurchase, setDisplayRepurchase] = useState(1);

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

  // 전체 페이지
  const MAX_PAGE = 6;
  const MAX_MEMO_LENGTH = 200;

  // 보유제품 추가 팝업 닫기
  const handleClose = () => {
    if (isEqual(initialForm, formData)) {
      setIsClicked(false);
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
    setIsClicked(false);
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
  const handleSubmit = async () => {
    if (!isValidDto(formData)) {
      alert("제품과 제품 옵션을 선택해주세요.");
    } else {
      const success = await addUserProduct(formData); //TODO 타입가드로 UserProductFormData를 CreateUserProductReqDto로 검증

      if (success) {
        setIsClicked(false);
      } else {
        console.error("유저 보유 목록 생성 실패");
      }
    }
  };

  const handleSubmitLoading = () => {
    setIsLoading(!isLoading);
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
  const handleStatusSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      status: e.target.value as UserProductStatus,
    }));
  };

  // 제품 상태 선택
  const handleConditionSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      condition: e.target.value as UserProductCondition,
    }));
  };

  // 구매일 선택
  const handlePurchasedDateChange = (date: Date) => {
    setFormData({
      ...formData,
      purchasedAt: formatDate(String(date)),
    });
  };

  // 판매일 선택
  const handleSoldDateChange = (date: Date) => {
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

      {isClicked ? (
        <div className="overlay flex justify-center items-center">
          <div className="w-[1200px] h-[800px] p-16 bg-white rounded-3xl relative">
            <button // 창 닫기 버튼
              type="button"
              onClick={handleClose}
              className="w-12 h-12 text-4xl flex items-center justify-center absolute top-0 right-0 bg-light text-white hover:bg-mid"
            >
              <IoCloseOutline />
            </button>

            <form
              onSubmit={handleSubmit}
              className="w-full h-full flex flex-col justify-between"
            >
              <div className="w-full flex items-center justify-between">
                <span className="w-[65px]">
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
                  <div className="w-full flex items-center justify-center gap-5">
                    <div className="w-[50%] h-[35px] border-2 border-secondary rounded-lg bg-bglightHover" />
                    <ButtonMedium text="검색" type="button" />
                  </div>
                )}

                <span className="w-[65px]">
                  {currentPageNumber !== MAX_PAGE && (
                    <ButtonStrong
                      type="button"
                      onClick={handleNextPage}
                      text="다음"
                    />
                  )}
                </span>
              </div>

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
                  status={formData.status}
                  onStatusChange={handleStatusSelect}
                  isSoldSelected={isSoldSelected}
                  setIsSoldSelected={setIsSoldSelected}
                  soldDate={new Date(formData.soldAt)}
                  onSoldDateChange={handleSoldDateChange}
                  purchasedDate={new Date(formData.purchasedAt)}
                />
              )}

              {currentPageNumber === 4 && ( // 제품 손상도
                <SelectCondition
                  onChange={handleConditionSelect}
                  condition={formData.condition}
                />
              )}

              {currentPageNumber === 5 && ( // 재구매 여부
                <SelectMultiplePurchased
                  isMultiplePurchased={isMultiplePurchased}
                  setIsMultiplePurchased={setIsMultiplePurchased}
                  handleConditionSelect={handleConditionSelect}
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
                      loading={isLoading}
                      onClick={handleSubmitLoading}
                      sx={{
                        width: "60px",
                      }}
                    >
                      Disabled
                    </Button>
                  ) : (
                    <ButtonStrong
                      type="submit"
                      text="등록하기"
                      // TODO onClick={handleSubmitLoading} 이걸 쓰면 왜인지 submit이 되지 않는다. submit 함수에 로딩로직도 때려넣자
                    />
                  ))}
              </span>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
