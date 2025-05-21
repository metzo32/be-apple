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
  

useEffect(() => {
  const timer = setTimeout(() => {
    if (!user) {
      openModal();
    }
  }, 500);

  return () => clearTimeout(timer); 
}, []);

  const handleRoute = () => {
    router.push("/login");
  };

  const handleNextStep = () => {
    if (step >= MAX_STEP) {
      return;
    }
    setStep(step + 1);
  };

  const userId: number | null = user?.id ?? null;

  const { data: productRecommendationId } = useRecommendCreateQuery(userId);


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

  const handleStep02 = (productRecommendationId: number, tags: string[]) => {
    recommendMutationStep02.mutate({
      productRecommendationId,
      tags,
    });
    console.log(productRecommendationId);
    setStep(step + 1);
  };

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

  const handleStep05 = (
    productRecommendationId: number,
    specs: { type: string; value: string }[]
  ) => {
    recommendMutationStep05.mutate({
      productRecommendationId,
      specs,
    });
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
          <h1>추천 페이지</h1>
          <div className="min-h-[500px] bg-white rounded-3xl p-10">
            {step === 1 && (
              <div className="flex flex-col gap-5">
                <h3>알맞은 제품을 추천해드려요.</h3>
                <h3>카테고리</h3>
                <ul>
                  {categories.map((category) => (
                    <li
                      key={category}
                      value={ProductCategoryLabels[category]}
                      onClick={() =>
                        handleStep01(productRecommendationId, category)
                      }
                      className="cursor-pointer"
                    >
                      {ProductCategoryLabels[category]}
                    </li>
                  ))}
                </ul>

                <ButtonStrong text="다음" onClick={() => setStep(step + 1)} />
              </div>
            )}

            {step === 2 && (
              <div>
                <h3>용도</h3>

                <ul>
                  {tags.map((tag) => (
                    <li
                      key={tag}
                      value={tag}
                      onClick={() =>
                        handleStep02(productRecommendationId, tags)
                      }
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <ButtonStrong text="다음" />
              </div>
            )}

            {step === 3 && (
              <div>
                <h3>가격대</h3>

                <p>{minPrice}</p>
                <p>{maxPrice}</p>

                <ButtonStrong text="다음" onClick={handleStep03} />
              </div>
            )}

            {step === 4 && (
              <div>
                <h3>최소 출시일</h3>

                <ButtonStrong text="다음" onClick={handleStep04} />
              </div>
            )}

            {step === 5 && (
              <div>
                <h3>상세 스펙</h3>

                <ButtonStrong text="완료" onClick={handleStep05} />
              </div>
            )}
          </div>
          <button onClick={handleNextStep}>다음 {step}번 페이지</button>
          <button onClick={() => setStep(1)}>처음으로</button>
        </div>
      )}
    </>
  );
}
