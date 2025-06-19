"use client";

import useModal from "@/hooks/useModal";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import {
  useRecommendCreateQuery,
  useRecommendStep01,
  useRecommendStep02,
  useRecommendStep03,
  useRecommendStep04,
  useRecommendStep05,
} from "@/hooks/useRecommendQuery";
import ButtonStrong from "@/components/designs/ButtonStrong";
import {
  ProductCategoryEnum,
  ProductCategoryLabels,
} from "@/types/productCategory";
import { useQuery } from "@tanstack/react-query";
import { postRecommendComplete } from "@/components/fetch/fetchRecommend";
import { ButtonBasicLarge } from "@/components/designs/ButtonBasic";
import RecommendBox from "@/components/designs/RecommendBox";
import PickDate from "@/components/UserProductAdd/PickDate";
import { formatDate, formatStringToDate } from "@/module/formatDate";

export default function RecommendPage() {
  const { user } = useUserStore();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [step, setStep] = useState(1);

  const router = useRouter();

  const recommendMutationStep01 = useRecommendStep01();
  const recommendMutationStep02 = useRecommendStep02();
  const recommendMutationStep03 = useRecommendStep03();
  const recommendMutationStep04 = useRecommendStep04();
  const recommendMutationStep05 = useRecommendStep05();

  const { data: tags = [] } = useQuery<string[]>({
    queryKey: ["recommendStep01Tags"],
    queryFn: () => Promise.resolve([]), // queryFn 누락 오류 방지용 기본값
    enabled: false,
  });

  const { data: minPrice = null } = useQuery<number>({
    queryKey: ["recommendStep02MinPrice"],
    queryFn: () => Promise.resolve(0), // queryFn 누락 오류 방지용 기본값
    enabled: false,
  });

  const { data: maxPrice = null } = useQuery<number>({
    queryKey: ["recommendStep02MaxPrice"],
    queryFn: () => Promise.resolve(9999999), // queryFn 누락 오류 방지용 기본값
    enabled: false,
  });

  const { data: minReleasedDate = "" } = useQuery<string>({
    queryKey: ["recommendStep03MinReleasedDate"],
    queryFn: () => Promise.resolve(""), // queryFn 누락 오류 방지용 기본값
    enabled: false,
  });

  const { data: specs = [] } = useQuery<{ type: string; value: string }[]>({
    queryKey: ["recommendStep04Specs"],
    queryFn: () => Promise.resolve([]), // queryFn 누락 오류 방지용 기본값
    enabled: false,
  });

  const [userMinPrice, setUserMinPrice] = useState<number | null>(minPrice);
  const [userMaxPrice, setUserMaxPrice] = useState<number | null>(maxPrice);
  const [selectedMinReleasedDate, setSelectedMinReleasedDate] =
    useState<Date | null>(formatStringToDate(minReleasedDate));

  const [selectedSpecs, setSelectedSpecs] = useState<
    { type: string; value: string }[]
  >([]);

  // 로그인 여부 체크
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user) {
        openModal();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [user, openModal]);

  const handleRoute = () => {
    router.push("/login");
  };

  const userId: number | null = user?.id ?? null;

  // 추천 Id 생성 (최초 동작)
  const { data: productRecommendationId } = useRecommendCreateQuery(userId);

  // 1 -> 2
  const handleStep01 = (
    productRecommendationId: number,
    productCategory: ProductCategoryEnum
  ) => {
    recommendMutationStep01.mutate({
      productRecommendationId,
      productCategory,
    });
    console.log(productCategory);
    setStep(step + 1);
  };

  // 2 -> 3
  const handleStep02 = (productRecommendationId: number, tags: string[]) => {
    recommendMutationStep02.mutate({
      productRecommendationId,
      tags,
    });
    console.log(tags);
    setStep(step + 1);
  };

  // 3 -> 4
  const handleStep03 = (
    productRecommendationId: number,
    minPrice: number,
    maxPrice: number
  ) => {
    recommendMutationStep03.mutate({
      productRecommendationId,
      minPrice,
      maxPrice,
    });
    setStep(step + 1);
  };

  // 4 -> 5
  const handleStep04 = (
    productRecommendationId: number,
    minReleasedDate: string
  ) => {
    recommendMutationStep04.mutate({
      productRecommendationId,
      minReleasedDate,
    });
    setStep(step + 1);
  };

  const handleStep05 = (productRecommendationId: number) => {
    recommendMutationStep05.mutate({
      productRecommendationId,
      specs: selectedSpecs,
    });

       router.push(`/recommend/${productRecommendationId}`);
  };

  const handleMinDateChange = (date: Date) => {
    setSelectedMinReleasedDate(date);
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserMinPrice(Number(e.target.value));
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserMaxPrice(Number(e.target.value));
  };

  const categories = Object.values(ProductCategoryEnum);

  return (
    <>
      {!userId ? (
        <Modal
          isModalOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={handleRoute}
          onCancel={closeModal}
          title={"이런!"}
          content={"로그인 후 이용 가능한 서비스입니다."}
          confirmBtnText={"로그인하러 가기"}
          hideCancel={true}
        />
      ) : (
        <div className="mt-0 md:mt-10 flex flex-col gap-10">
          <div className="w-full md:min-h-[500px] bg-white p-5 md:p-18 my-18">
            <h1 className="text-lg md:text-xl text-light font-medium mb-10">
              알맞은 제품을 추천해드려요.
            </h1>
            <div className="flex items-center justify-center">
              {step === 1 && (
                <RecommendBox title="카테고리">
                  <ul className="w-full flex flex-col justify-between md:flex-row">
                    {categories.map((category) => (
                      <li
                        key={category}
                        value={ProductCategoryLabels[category]}
                        onClick={() => {
                          if (!productRecommendationId) return;
                          handleStep01(productRecommendationId, category);
                        }}
                      >
                        <ButtonBasicLarge
                          text={ProductCategoryLabels[category]}
                        />
                      </li>
                    ))}
                  </ul>
                </RecommendBox>
              )}

              {step === 2 && (
                <RecommendBox title="사용 목적">
                  <ul className="w-full flex flex-col justify-between md:flex-row">
                    {tags.map((tag) => (
                      <li
                        key={tag}
                        value={tag}
                        onClick={() =>
                          handleStep02(productRecommendationId, [tag])
                        }
                      >
                        <ButtonBasicLarge text={tag} />
                      </li>
                    ))}
                  </ul>
                </RecommendBox>
              )}

              {step === 3 && (
                <RecommendBox title="가격대">
                  <div className="w-full flex items-start lg:items-center gap-5 flex-col lg:flex-row">
                    <span className="searchbar-span">
                      <input
                        type="text"
                        name="tag"
                        maxLength={7}
                        value={userMinPrice ?? ""}
                        onChange={handleMinChange}
                        placeholder={"최저가"}
                        className="w-full h-full m-0 md:mx-2 md:mb-2 placeholder-gray-400 "
                      />
                    </span>

                    <span className="searchbar-span">
                      <input
                        type="text"
                        name="tag"
                        maxLength={7}
                        value={userMaxPrice ?? ""}
                        onChange={handleMaxChange}
                        placeholder={"최고가"}
                        className="w-full h-full m-0 md:mx-2 md:mb-2 placeholder-gray-400 "
                      />
                    </span>

                    <ButtonStrong
                      text="다음"
                      onClick={() =>
                        handleStep03(
                          productRecommendationId,
                          userMinPrice ?? 0,
                          userMaxPrice ?? 9999999
                        )
                      }
                    />
                  </div>
                </RecommendBox>
              )}

              {step === 4 && (
                <RecommendBox title="최소 출시일">
                  <div className="flex flex-col gap-5 items-start">
                    <PickDate
                      pickedDate={selectedMinReleasedDate}
                      changeDate={handleMinDateChange}
                    />

                    <ButtonStrong
                      text="다음"
                      onClick={() => {
                        const formatted = formatDate(
                          selectedMinReleasedDate,
                          "yyyy-MM-dd"
                        );
                        handleStep04(productRecommendationId, formatted ?? "");
                      }}
                    />
                  </div>
                </RecommendBox>
              )}

              {step === 5 && (
                <RecommendBox title="기타 상세 스펙">
                  {specs?.map((spec, index) => {
                    const isSelected = selectedSpecs.some(
                      (s) => s.type === spec.type && s.value === spec.value
                    );

                    return (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedSpecs((prev) =>
                            isSelected
                              ? prev.filter(
                                  (s) =>
                                    !(
                                      s.type === spec.type &&
                                      s.value === spec.value
                                    )
                                )
                              : [...prev, spec]
                          );
                        }}
                        className={`border px-3 py-1 rounded ${
                          isSelected ? "bg-primary text-white" : "bg-white"
                        }`}
                      >
                        {spec.type} : {spec.value}
                      </button>
                    );
                  })}

                  {/* {specs?.map((spec, index) => (
                    <p key={index}>
                      {spec.type} : {spec.value}
                    </p>
                  ))} */}

                  <ButtonStrong
                    text="완료"
                    onClick={() => handleStep05(productRecommendationId)}
                  />
                </RecommendBox>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
