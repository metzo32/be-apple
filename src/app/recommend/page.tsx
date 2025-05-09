"use client";

import useModal from "@/hooks/useModal";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";
import {
  useRecommendCreateQuery,
  useRecommendStep01,
  useRecommendStep02,
  useRecommendStep03,
  useRecommendStep04,
  useRecommendStep05,
} from "@/hooks/useRecommend";
import ButtonStrong from "@/components/designs/ButtonStrong";
import {
  ProductCategoryEnum,
  ProductCategoryLabels,
} from "@/types/productCategory";

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

  const MAX_STEP = 5

  // 로그인 여부 체크
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user) {
        openModal();
      } else {
        return;
      }
    }, 2000);
    clearTimeout(timer);
  }, [user]);

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


  if (!user) return;

  const handleStep01 = (
    productRecommendationId: number,
    productCategory: ProductCategoryEnum
  ) => {
    recommendMutationStep01.mutate({ productRecommendationId, productCategory });
  };

  const handleStep02 = () => {
    recommendMutationStep02.mutate(tags);
  };

  const handleStep03 = () => {
    recommendMutationStep03.mutate();
  };

  const handleStep04 = () => {
    recommendMutationStep04.mutate();
  };

  const handleStep05 = () => {
    recommendMutationStep05.mutate();
  };

  const categories = Object.values(ProductCategoryEnum);

  return (
    <>
      {!user || isModalOpen ? (
        <Modal
          isModalOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={handleRoute}
          onCancel={closeModal}
          title={"이런!"}
          content={"로그인해야 이용 가능한 서비스입니다."}
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
                      onClick={() => handleStep01(category)}
                      className="cursor-pointer"
                    >
                      {ProductCategoryLabels[category]}
                    </li>
                  ))}
                </ul>

                {/* <ButtonStrong text="다음" onClick={handleStep01} /> */}
              </div>
            )}

            {step === 2 && (
              <div>
                <h3>용도</h3>

                <ButtonStrong text="다음" onClick={handleStep02} />
              </div>
            )}

            {step === 3 && (
              <div>
                <h3>가격대</h3>

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
