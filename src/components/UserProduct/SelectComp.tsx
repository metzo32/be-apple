"use client";

import { FormEvent, useEffect, useState } from "react";
import useOpenSelect from "@/stores/useOpenSelect";
import {
  ProductCategoryEnum,
  ProductCategoryLabels,
} from "@/types/productCategory";
import {
  UserProductCondition,
  UserProductStatus,
  CreateUserProductReqDto,
  UserProductStatusLabels,
  UserProductConditionLables,
} from "@/types/userProduct";
import { IoCloseOutline } from "react-icons/io5";
import PickDate from "./PickDate";
import { FaRegCalendarCheck } from "react-icons/fa";
import { addUserProduct } from "../fetch/fetchUserProduct";
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { formatDate } from "@/module/formatDate";
import useModal from "@/hooks/useModal";
import Modal from "../Modal/Modal";
import isEqual from "lodash/isEqual";

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
  const [multiplePurchaseCount, setMultiplePurchaseCount] = useState<number | string>(""); // 재구매 횟수
  const [tempMemo, setTempMemo] = useState<string>(""); // ui상 메모

  const categories = Object.values(ProductCategoryEnum); // 카테고리 배열
  const currentStatus = Object.values(UserProductStatus); // 제품 활성화 배열
  const conditions = Object.values(UserProductCondition); // 제품 손상도 배열

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

  const handleClose = () => {
    if (isEqual(initialForm, formData)) {
      setIsClicked(false);
    } else {
      alert("작성한 내용이 사라집니다.");
    }
    setIsClicked(false);
    setCurrentPageNumber(0);
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

  // 카테고리 선택
  const handleCategorySelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("카테고리", e.target.value);
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
      setMultiplePurchaseCount(2);
    } else if (Number(multiplePurchaseCount) > 99) {
      alert("100 미만의 숫자를 써주세요");
      setMultiplePurchaseCount(2);
    }

    setFormData((prev) => ({
      ...prev,
      repurchasedCount: Number(multiplePurchaseCount) - 1, // 총 구매횟수 - 1 = 재구매 횟수
    }));
  };

  useEffect(() => {
    console.log("폼데이터", formData);
  }, [formData]);

  return (
    <>
      {isClicked ? (
        <div className="overlay flex justify-center items-center">
          <div className="w-[1200px] h-[800px] p-16 bg-custombg rounded-3xl relative">
            {/* 닫기 버튼 */}
            {/* TODO 양식에 무언가 작성되어 있을 때, 정말 리셋할것인지 확인 + 리셋  */}
            <button
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

              <div>
                {currentPageNumber === 0 && ( // 카테고리 선택바 및 검색바
                  <div>
                    <div className="w-full flex flex-col justify-between">
                      <RadioGroup
                        aria-labelledby="category-radio-buttons-group-label"
                        // value={category}
                        name="radio-buttons-group"
                        onChange={handleCategorySelect}
                        sx={{
                          width: "1000px",
                          display: "grid",
                          gridTemplateColumns: "repeat(1, 3fr)",
                          gridColumnGap: "100px",
                        }}
                      >
                        {categories.map((category) => (
                          <FormControlLabel
                            key={category}
                            value={category}
                            control={<Radio />}
                            label={ProductCategoryLabels[category]}
                            sx={{
                              width: "300px",
                            }}
                          />
                        ))}
                      </RadioGroup>
                    </div>

                    {/* TODO 이 부분 invalid 한 경우, "다음"버튼 실행 금지 */}
                    <TextField
                      id="outlined-basic"
                      label="제품명 검색"
                      variant="outlined"
                      required
                    />
                  </div>
                )}

                {currentPageNumber === 1 && ( // 구매가
                  <label className="flex flex-col gap-5 items-start text-2xl font-normal">
                    해당 제품의 구매가를 작성해주세요.
                    <TextField
                      label="가격"
                      variant="outlined"
                      sx={{ width: "330px" }}
                      value={displayedPrice}
                      onChange={handlePriceChange}
                    />
                  </label>
                )}

                {currentPageNumber === 2 && ( // 구매 시기
                  <div className="relative">
                    <div className="flex gap-3 items-center">
                      <h3 className="user-product-h3">구매 시기</h3>
                      <button type="button" className="hover:text-textHover">
                        <FaRegCalendarCheck />
                      </button>
                    </div>

                    <PickDate
                      pickedDate={purchasedDate}
                      changeDate={handlePurchasedDateChange}
                      minDate={new Date("April 11, 1976")}
                    />
                  </div>
                )}

                {currentPageNumber === 3 && ( // 제품 활성화 상태
                  <div className="relative">
                    <div className="w-full h-[150px] flex flex-col gap-5 justify-center">
                      <h3 className="user-product-h3">이 제품을...</h3>
                      <RadioGroup
                        aria-labelledby="status-radio-buttons-group-label"
                        value={formData.status}
                        name="radio-buttons-group"
                        onChange={handleStatusSelect}
                        sx={{
                          width: "940px",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        {currentStatus.map((status) => (
                          <FormControlLabel
                            key={status}
                            value={status}
                            control={<Radio />}
                            label={UserProductStatusLabels[status]}
                            onChange={() =>
                              status === "SOLD"
                                ? setIsSoldSelected(true)
                                : setIsSoldSelected(false)
                            }
                          />
                        ))}
                      </RadioGroup>
                    </div>

                    <div className="w-full flex justify-end">
                      {isSoldSelected && (
                        <div className="absolute bottom-0 right-0 transform translate-y-full">
                          <h4>판매 시기</h4>
                          <PickDate
                            pickedDate={soldDate}
                            changeDate={handleSoldDateChange}
                            minDate={purchasedDate ? purchasedDate : new Date()}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {currentPageNumber === 4 && ( // 제품 손상도
                  <div className="flex flex-col gap-5">
                    <h3 className="user-product-h3">제품 상태</h3>
                    <RadioGroup
                      aria-labelledby="status-radio-buttons-group-label"
                      value={formData.condition}
                      name="radio-buttons-group"
                      onChange={handleConditionSelect}
                      sx={{
                        width: "1000px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {conditions.map((condition) => (
                        <FormControlLabel
                          key={condition}
                          value={condition}
                          control={<Radio />}
                          label={UserProductConditionLables[condition]}
                          sx={{
                            width: "50px",
                          }}
                        />
                      ))}
                    </RadioGroup>
                  </div>
                )}

                {currentPageNumber === 5 && ( // 재구매 여부
                  <div className="w-[360px] flex flex-col gap-5 relative">
                    <h3 className="user-product-h3">
                      이 제품을 재구매한 적 있나요?
                    </h3>

                    <RadioGroup
                      aria-labelledby="status-radio-buttons-group-label"
                      value={isMultiplePurchased ? "true" : "false"}
                      name="radio-buttons-group"
                      onChange={handleConditionSelect}
                      sx={{
                        width: "500px",
                        display: "grid",
                        gridTemplateColumns: "repeat(5, 1fr)",
                        gridColumnGap: "180px",
                      }}
                    >
                      <FormControlLabel
                        value="false"
                        control={<Radio />}
                        label={"아니요"}
                        onClick={() => setIsMultiplePurchased(false)}
                        sx={{
                          width: "50px",
                        }}
                      />
                      <FormControlLabel
                        value="true"
                        control={<Radio />}
                        label={"재구매했어요"}
                        onClick={() => setIsMultiplePurchased(true)}
                        sx={{
                          width: "50px",
                        }}
                      />
                    </RadioGroup>

                    {isMultiplePurchased && (
                      <div className="flex items-center gap-3 absolute bottom-0 right-0 transform translate-y-[120%]">
                        <h4>총</h4>
                        <TextField
                          value={multiplePurchaseCount}
                          variant="outlined"
                          onChange={handleMultiplePurchased}
                          onBlur={handleMultiplePurchasedBlur}
                          sx={{
                            width: "100px",
                          }}
                        />
                        <h4>회</h4>
                      </div>
                    )}
                  </div>
                )}

                {currentPageNumber === 6 && (
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-3 items-cente">
                      <h3 className="user-product-h3">
                        이 제품에 대한 메모를 남겨주세요.
                      </h3>
                      <p className="text-mid">(나에게만 보여요)</p>
                    </div>
                    <textarea
                      id="memo"
                      value={tempMemo}
                      onChange={handleMemoChange}
                      onBlur={handleMemoBlur}
                      maxLength={MAX_MEMO_LENGTH}
                      placeholder="메모 남기기"
                      className="w-full h-[150px] p-5 border-2 border-bglight text-base rounded-lg resize-none"
                    />
                    <p className="text-sm text-gray-500 text-right mt-1">
                      {tempMemo.length} / {MAX_MEMO_LENGTH}자
                    </p>
                  </div>
                )}
              </div>

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
