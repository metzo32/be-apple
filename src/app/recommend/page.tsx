"use client";

import useModal from "@/hooks/useModal";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect } from "react";
import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";

export default function RecommendPage() {
  const { user } = useUserStore();
  const { isModalOpen, openModal, closeModal } = useModal();

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      openModal();
    } else {
      return;
    }
  }, [user]);

  const handleRoute = () => {
    router.push("/login");
  };

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
        <div>추천 페이지</div>
      )}
    </>
  );
}
