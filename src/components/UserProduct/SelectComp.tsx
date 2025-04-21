"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import useOpenSelect from "@/stores/useOpenSelect";
import { ProductCategoryEnum } from "@/types/productCategory";
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

export default function SelectComp() {
  const { isClicked, setIsClicked } = useOpenSelect();

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
  const [checkedStatusIndex, setIsCheckedStatusIndex] = useState<number>(0);
  const [checkedConditionIndex, setCheckedConditionIndex] = useState<number>(0);
  const [openPurchasedDate, setOpenPurchasedDate] = useState(false); // 구매일 달력 열기
  const [purchasedDate, setPurchasedDate] = useState<Date | null>(null); // 구매 날짜
  const [soldDate, setSoldDate] = useState<Date | null>(null); // 판매 날짜
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isMultiplePurchased, setIsMultiplePurchased] = useState(false);

  const [isSoldSelected, setIsSoldSelected] = useState(false); // 처분 및 양도 선택 시 판매날짜 선택

  const categories = Object.values(ProductCategoryEnum); // 카테고리 배열
  const currentStatus = Object.values(UserProductStatus); // 제품 손상도 배열
  const conditions = Object.values(UserProductCondition); // 제품 손상도 배열

  const handleClose = () => {
    setIsClicked(false);
  };

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

  // 보유상태 관련
  const handleStatusSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      status: e.target.value as UserProductStatus,
    }));
    console.log(e.target.value);
  };

  const handleStatusClick = (index: number) => {
    setIsCheckedStatusIndex(index === checkedStatusIndex ? 0 : index);
  };

  // 제품 상태 관련
  const handleConditionSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      condition: e.target.value as UserProductCondition,
    }));
  };

  const handleConditionClick = (index: number) => {
    setCheckedConditionIndex(index === checkedConditionIndex ? 0 : index);
  };

  const handleOpenPurchasedDate = () => {
    setOpenPurchasedDate(!openPurchasedDate);
  };

  const handlePurchasedDateChange = (purchasedDate: Date) => {
    setSelectedDate(purchasedDate);

    setFormData({
      ...formData,
      purchasedAt: formatDate(String(purchasedDate)),
    });
  };

  const handleSoldDateChange = (date: Date) => {
    setSelectedDate(date);

    setFormData({
      ...formData,
      soldAt: formatDate(String(date)),
    });
  };

  const MAX_PAGE = 5;
  const MAX_MEMO_LENGTH = 200;

  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      memo: value,
    }));
  };

  //함수 시그니처....
  const handleMultiplePurchased = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsMultiplePurchased(e.target.checked);
  };

  const handlePrevPage = () => {
    if (currentPageNumber === 0) {
      return;
    }
    setCurrentPageNumber(currentPageNumber - 1);
  };

  const handleNextPage = () => {
    if (currentPageNumber > MAX_PAGE) {
      return;
    }
    setCurrentPageNumber(currentPageNumber + 1);
    console.log(
      "필수 항목 입력여부 검증하는 로직을 추가하자. n번 인덱스 (마지막 제출페이지 번호) 에서는 제출 버튼으로 대체해야함"
    ); // TODO
  };

  useEffect(() => {
    console.log("현재 패이지 인덱스", currentPageNumber);
  }, [currentPageNumber]);

  useEffect(() => {
    console.log("폼데이터", formData);
  }, [formData]);

  return (
    // TODO 모든 라디오 버튼 MUI 적용 이후 currentPage 바뀌면 ui상 리셋되는 현상
    <>
      {!isClicked ? (
        <div className="overlay flex justify-center items-center">
          <div className="w-[1200px] h-[800px] p-16 bg-custombg rounded-3xl relative">
            {/* 닫기 버튼 */}
            <button
              type="button"
              onClick={handleClose}
              className="w-8 h-8 text-4xl flex items-center justify-center absolute top-0 right-0 bg-bglight text-custombg hover:bg-light"
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
                    <div className="w-full flex justify-between">
                      {categories.map((category, index) => (
                        <label key={index} className="add-label">
                          <button className="group relative w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-xl bg-bglight hover:bg-custombg shadow-strong flex flex-col justify-center items-center gap-5">
                            <Image
                              src="/assets/images/searchbar_macbook.png"
                              alt="이미지"
                              fill
                              className="object-cover saturate-0 group-hover:saturate-100"
                            />
                          </button>
                          <input
                            type="radio"
                            name="category"
                            // checked={selectedCategory === category}
                            // onChange={() => setSelectedCategory(category)}
                            className="accent-blue-600 w-4 h-4"
                            required
                            hidden
                          />
                          <span className="text-gray-800">{category}</span>
                        </label>
                      ))}
                    </div>
                    <div className="border border-3-black">검색바</div>
                  </div>
                )}

                {currentPageNumber === 1 && ( // 구매가
                  <label className="flex flex-col gap-5 items-start text-2xl font-normal">
                    해당 제품의 구매가를 작성해주세요.
                    <TextField
                      label="가격"
                      variant="outlined"
                      sx={{ width: "500px" }}
                    />
                  </label>
                )}

                {currentPageNumber === 2 && ( // 구매 시기
                  <div className="relative">
                    <div className="flex gap-3 items-center">
                      <h3 className="user-product-h3">구매 시기</h3>
                      <button
                        type="button"
                        className="hover:text-textHover"
                        onClick={handleOpenPurchasedDate}
                      >
                        <FaRegCalendarCheck />
                      </button>
                    </div>

                    <PickDate
                      pickedDate={purchasedDate}
                      changeDate={handlePurchasedDateChange}
                    />
                  </div>
                )}

                {currentPageNumber === 3 && ( // 제품 활성화 상태
                  <div className="flex flex-col gap-5 items-center">
                    <div className="flex flex-col gap-5">
                      <h3 className="user-product-h3">이 제품을...</h3>
                      <RadioGroup
                        aria-labelledby="status-radio-buttons-group-label"
                        defaultValue="ACTIVE"
                        name="radio-buttons-group"
                        onChange={handleStatusSelect}
                        sx={{
                          width: "1000px",
                          display: "grid",
                          gridTemplateColumns: "repeat(3, 1fr)",
                          gridColumnGap: "100px",
                        }}
                      >
                        {currentStatus.map((status) => (
                          <FormControlLabel
                            key={status}
                            value={status}
                            control={<Radio />}
                            label={UserProductStatusLabels[status]}
                            onChange={() =>
                              status === "SOLD" && setIsSoldSelected(true)
                            }
                            sx={{
                              width: "300px",
                            }}
                          />
                        ))}
                      </RadioGroup>
                    </div>

                    <div className="w-full flex justify-end">
                      {isSoldSelected && (
                        <PickDate
                          pickedDate={soldDate}
                          changeDate={handleSoldDateChange}
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* TODO 제품 활성화 상태가 ACTIVE 인 경우 분기처리 */}

                {currentPageNumber === 4 && ( // 제품 손상도
                  <div className="flex flex-col gap-5">
                    <h3 className="user-product-h3">제품 상태</h3>
                    <div className="grid grid-rows-1 grid-cols-5 gap-36">
                      <RadioGroup
                        aria-labelledby="status-radio-buttons-group-label"
                        defaultValue="ACTIVE"
                        name="radio-buttons-group"
                        onChange={handleStatusSelect}
                        sx={{
                          width: "1000px",
                          display: "grid",
                          gridTemplateColumns: "repeat(5, 1fr)",
                          gridColumnGap: "180px",
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
                  </div>
                )}

                {currentPageNumber === 5 && ( // 재구매 여부
                  <div className="w-[300px] flex flex-col gap-5">
                    <h3 className="user-product-h3">
                      이 제품을 재구매한 적 있나요?
                    </h3>

                    {/* TODO 택1 로직 고치기 */}
                    <label className="add-label">
                      아니요
                      <input
                        type="radio"
                        id="multiplePurchase"
                        name="multiplePurchase"
                        value="multiplePurchase"
                      />
                    </label>

                    <label className="add-label">
                      재구매했어요
                      <input
                        type="radio"
                        id="multiplePurchase"
                        name="multiplePurchase"
                        value="multiplePurchase"
                        checked={isMultiplePurchased}
                        onChange={handleMultiplePurchased}
                      />
                    </label>
                    {isMultiplePurchased && (
                      <div className="flex items-center gap-3">
                        <input type="number" min={1} max={10} />
                        <p>회</p>
                      </div>
                    )}
                  </div>
                )}

                {currentPageNumber === 6 && (
                  <div>
                    <h3 className="user-product-h3">
                      이 제품에 대한 메모를 남겨주세요. (나에게만 보여요)
                    </h3>
                    <textarea
                      id="memo"
                      value={formData.memo}
                      onChange={handleMemoChange}
                      maxLength={MAX_MEMO_LENGTH}
                      placeholder="메모 남기기"
                      className="w-full h-[150px] p-5 border-3 border-bglight text-base resize-none"
                    />
                    <p className="text-sm text-gray-500 text-right mt-1">
                      {formData.memo.length} / {MAX_MEMO_LENGTH}자
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

              {/* <ButtonStrong text="등록하기" type="submit" /> */}
            </Box>
          </div>
        </div>
      ) : null}
    </>
  );
}
