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
} from "@/hooks/useRecommendQuery";
import ButtonStrong from "@/components/designs/ButtonStrong";
import {
  ProductCategoryEnum,
  ProductCategoryLabels,
} from "@/types/productCategory";
import { useQuery } from "@tanstack/react-query";
import {
  getRecommendList,
  postRecommendComplete,
} from "@/components/fetch/fetchRecommend";
import { ButtonBasicLarge } from "@/components/designs/ButtonBasic";
import RecommendBox from "@/components/designs/RecommendBox";
import { GetProductRecommendationResDto } from "@/types/recommend";

export default function RecommendPage() {
  const { user } = useUserStore();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [step, setStep] = useState(1);
  const [completed, setCompleted] = useState(false);
  const [recommendedItem, setRecommendedItem] =
    useState<GetProductRecommendationResDto | null>(null);

  const router = useRouter();

  const recommendMutationStep01 = useRecommendStep01();
  const recommendMutationStep02 = useRecommendStep02();
  const recommendMutationStep03 = useRecommendStep03();
  const recommendMutationStep04 = useRecommendStep04();

  const MAX_STEP = 5;

  const { data: tags = [] } = useQuery<string[]>({
    queryKey: ["recommendStep01Tags"],
    queryFn: () => Promise.resolve([]), // queryFn 누락 오류 방지용 기본값
    enabled: false,
  });

  const { data: minPrice = 0 } = useQuery<number>({
    queryKey: ["recommendStep02MinPrice"],
    queryFn: () => Promise.resolve(0), // queryFn 누락 오류 방지용 기본값
    enabled: false,
  });

  const { data: maxPrice = 9999999 } = useQuery<number>({
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
    queryKey: ["recommendStep04specs"],
    queryFn: () => Promise.resolve([]), // queryFn 누락 오류 방지용 기본값
    enabled: false,
  });

  const [userMinPrice, setUserMinPrice] = useState(minPrice);
  const [userMaxPrice, setUserMaxPrice] = useState(maxPrice);

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

  const handleNextStep = () => {
    if (step >= MAX_STEP) {
      return;
    }
    setStep(step + 1);
  };

  const handePrevStep = () => {
    if (step <= 1) {
      return;
    }
    setStep(step - 1);
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
    console.log(productRecommendationId);
    setStep(step + 1);
  };

  // 2 -> 3
  const handleStep02 = (productRecommendationId: number, tags: string[]) => {
    recommendMutationStep02.mutate({
      productRecommendationId,
      tags,
    });
    console.log(productRecommendationId);
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

  const handleStep05 = async (productRecommendationId: number) => {
    await postRecommendComplete(productRecommendationId);
    // setCompleted(true);

    const data = await getRecommendList(productRecommendationId);

    setRecommendedItem(data);
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
        <div className="mt-10 flex flex-col gap-10">
          <div className="md:min-h-[500px] bg-white p-10 md:p-18 my-18">
            <h1 className="text-2xl">알맞은 제품을 추천해드려요.</h1>
            <div className="h-[400px] flex items-center justify-center">
              {step === 1 && (
                <RecommendBox title="카테고리">
                  <ul className="w-full flex flex-col justify-between md:flex-row">
                    {categories.map((category) => (
                      <li
                        key={category}
                        value={ProductCategoryLabels[category]}
                        onClick={() =>
                          handleStep01(productRecommendationId, category)
                        }
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
                          handleStep02(productRecommendationId, tags)
                        }
                      >
                        <ButtonBasicLarge text={tag} />
                      </li>
                    ))}
                  </ul>

                  <ButtonStrong text="건너뛰기" />
                </RecommendBox>
              )}

              {step === 3 && (
                <RecommendBox title="가격대">
                  <input
                    value={userMinPrice}
                    placeholder={minPrice.toString()}
                    min={minPrice}
                    max={maxPrice - 1}
                    maxLength={7}
                    onChange={handleMinChange}
                  />

                  <input
                    value={userMaxPrice}
                    placeholder={maxPrice.toString()}
                    min={minPrice + 1}
                    max={maxPrice}
                    maxLength={7}
                    onChange={handleMaxChange}
                  />

                  <ButtonStrong
                    text="다음"
                    onClick={() =>
                      handleStep03(productRecommendationId, minPrice, maxPrice)
                    }
                  />
                </RecommendBox>
              )}

              {step === 4 && (
                <RecommendBox title="최소 출시일">
                  {minReleasedDate}
                  <ButtonStrong
                    text="다음"
                    onClick={() =>
                      handleStep04(productRecommendationId, minReleasedDate)
                    }
                  />
                </RecommendBox>
              )}

              {step === 5 && (
                <RecommendBox title="기타 상세 스펙">
                  {specs?.map((spec, index) => (
                    <p key={index}>
                      {spec.type} : {spec.value}
                    </p>
                  ))}
                  {completed && <div>생성 완료</div>}

                  {/* <div>{recommendedItem.toString()}</div> */}

                  <ButtonStrong
                    text="완료"
                    onClick={() => handleStep05(productRecommendationId)}
                  />
                </RecommendBox>
              )}
            </div>
          </div>
          <button onClick={handleNextStep}>다음 {step}번 페이지</button>
          <button onClick={handePrevStep}>이전 {step - 1}번 페이지</button>
          <button onClick={() => setStep(1)}>처음으로</button>
        </div>
      )}
    </>
  );
}
