"use client";

import useModal from "@/hooks/useModal";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";
import { useRecommendCreateQuery } from "@/hooks/useRecommend";

export default function RecommendPage() {
  const { user } = useUserStore();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [step, setStep] = useState(0);
  const router = useRouter();

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
    if (step >= 5) {
      return;
    }
    setStep(step + 1);
  };

  const userId: number | null = user?.id ?? null;

  const { data: loadRecommend } = useRecommendCreateQuery(userId);

  if (!user) return;

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
            {step === 0 && (
              <div>
                <h3>알맞는 제품을 추천해드려요.</h3>
              </div>
            )}

            {step === 1 && (
              <div>
                <h3>카테고리</h3>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3>용도</h3>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3>가격대</h3>
              </div>
            )}

            {step === 4 && (
              <div>
                <h3>최소 출시일</h3>
              </div>
            )}

            {step === 5 && (
              <div>
                <h3>상세 스펙</h3>
              </div>
            )}
          </div>
          <button onClick={handleNextStep}>다음 {step}번 페이지</button>
        </div>
      )}
    </>
  );
}
