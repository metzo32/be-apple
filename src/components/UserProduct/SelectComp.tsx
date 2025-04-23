"use client";

import { FormEvent, useEffect, useState } from "react";
import useOpenSelect from "@/stores/useOpenSelect";
import {
  UserProductCondition,
  UserProductStatus,
  CreateUserProductReqDto,
} from "@/types/userProduct";
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
import { Box, Button } from "@mui/material";
import { IoCloseOutline } from "react-icons/io5";

export default function SelectComp() {
  const { isClicked, setIsClicked } = useOpenSelect();
  const { isModalOpen, openModal, closeModal } = useModal();

  const [formData, setFormData] = useState<CreateUserProductReqDto>({
    productId: 0,
    productOptionId: 0,
    purchasedAt: "",
    purchasePrice: 0,
    soldAt: "",
    status: UserProductStatus.ACTIVE,
    repurchasedCount: 0,
    condition: UserProductCondition.NEW,
    memo: "",
  });
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);
  const [price, setPrice] = useState<number>(0); // 데이터 상 전달되는 가격
  const [displayedPrice, setDisplayedPrice] = useState<string>(""); // UI상 보여지는 가격
  const [purchasedDate, setPurchasedDate] = useState<Date | null>(null); // 구매 날짜
  const [isSoldSelected, setIsSoldSelected] = useState(false); // 처분 및 양도 여부
  const [soldDate, setSoldDate] = useState<Date | null>(null); // 판매 날짜
  const [isMultiplePurchased, setIsMultiplePurchased] = useState(false); // 재구매 여부
  const [multiplePurchaseCount, setMultiplePurchaseCount] = useState<
    number | string
  >(""); // 재구매 횟수
  const [tempMemo, setTempMemo] = useState<string>(""); // ui상 메모

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
      // setIsClicked(true)
      openModal();
    }
  };

  useEffect(() => {
    console.log("팝업창 오픈 여부");
  }, [isClicked]);

  // 보유 제품 작성 중 이탈 시, 모달 확인 로직
  const handleResetForm = () => {
    setIsClicked(false);
    setCurrentPageNumber(0);
    setPrice(0);
    setDisplayedPrice("");
    setPurchasedDate(null);
    setIsSoldSelected(false);
    setSoldDate(null);
    setIsMultiplePurchased(false);
    setMultiplePurchaseCount("");
    setTempMemo("");
    setCurrentPageNumber(0);

    closeModal();
  };

  // 이전 페이지
  const handlePrevPage = () => {
    if (currentPageNumber === 0) {
      return;
    }
    setCurrentPageNumber(currentPageNumber - 1);
  };

  // 다음 페이지
  const handleNextPage = () => {
    if (currentPageNumber > MAX_PAGE) {
      return;
    }
    setCurrentPageNumber(currentPageNumber + 1);
  };

  //TODO 카테고리 별 제품 배열을 불러오고, 해당 아이템을 선택하면 productId와 productOptionId를 form 객체에 추가

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await addUserProduct(formData);

    if (success) {
      setIsClicked(false);
      console.log("유저 보유 목록 추가 성공");
    } else {
      console.log("유저 보유 목록 생성 실패");
    }
  };

  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const input = e.target.value;
    if (input.length > 9) {
      return;
    }
    const numberPrice = Number(input.replace(/[^0-9]/g, ""));
    setPrice(numberPrice);
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
    setPurchasedDate(date);

    setFormData({
      ...formData,
      purchasedAt: formatDate(String(purchasedDate)),
    });
  };

  // 판매일 선택
  const handleSoldDateChange = (date: Date) => {
    setSoldDate(date);

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

    setMultiplePurchaseCount(Number(purchaseCount));
  };

  const handleMultiplePurchasedBlur = () => {
    if (Number(multiplePurchaseCount) < 1) {
      alert("1 이상의 숫자를 써주세요");
      setMultiplePurchaseCount(1);
    } else if (Number(multiplePurchaseCount) > 99) {
      alert("100 미만의 숫자를 써주세요");
      setMultiplePurchaseCount(99);
    }

    setFormData((prev) => ({
      ...prev,
      repurchasedCount: Number(multiplePurchaseCount) - 1, // 총 구매횟수 - 1 = 재구매 횟수
    }));
  };

  useEffect(() => {
    console.log("유저목록 추가 폼데이터", formData);
  }, [formData]);

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
          <div className="w-[1200px] h-[800px] p-16 bg-custombg rounded-3xl relative">
            <button // 창 닫기 버튼
              type="button"
              onClick={handleClose}
              className="w-12 h-12 text-4xl flex items-center justify-center absolute top-0 right-0 bg-bglight text-custombg hover:bg-light"
            >
              <IoCloseOutline />
            </button>

            <Box
              component="form"
              onSubmit={handleSubmit}
              className="w-full h-full flex flex-col justify-between"
            >
              <div className="w-full flex items-center justify-between">
                <span className="w-[65px]">
                  {currentPageNumber !== 0 && (
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={handlePrevPage}
                    >
                      이전
                    </Button>
                  )}
                </span>

                <span className="w-[65px]">
                  {currentPageNumber !== MAX_PAGE && (
                    <Button
                      type="button"
                      variant="contained"
                      onClick={handleNextPage}
                    >
                      다음
                    </Button>
                  )}
                </span>
              </div>

              {currentPageNumber === 0 && ( // 카테고리 선택바 및 검색바
                <SelectCategory />
              )}

              {currentPageNumber === 1 && ( // 구매가
                <SelectPurchasedPrice
                  displayedPrice={displayedPrice}
                  onChange={handlePriceChange}
                />
              )}

              {currentPageNumber === 2 && ( // 구매 시기
                <SelectPurchasedDate
                  pickedDate={purchasedDate}
                  onChange={handlePurchasedDateChange}
                />
              )}

              {currentPageNumber === 3 && ( // 제품 활성화 상태
                <SelectStatus
                  status={formData.status}
                  onStatusChange={handleStatusSelect}
                  isSoldSelected={isSoldSelected}
                  setIsSoldSelected={setIsSoldSelected}
                  soldDate={soldDate}
                  onSoldDateChange={handleSoldDateChange}
                  purchasedDate={purchasedDate}
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
                  value={multiplePurchaseCount}
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
                {currentPageNumber === MAX_PAGE && (
                  <>
                    <Button type="submit" variant="contained">
                      등록하기
                    </Button>
                    <Button loading>등록하기</Button>
                  </>
                )}
              </span>
            </Box>
          </div>
        </div>
      ) : null}
    </>
  );
}
