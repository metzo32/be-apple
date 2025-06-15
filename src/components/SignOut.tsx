"use client";

import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import { fetchSignOut } from "./fetch/fetchSignOut";
import useModal from "@/hooks/useModal";
import Modal from "./Modal/Modal";
import { ButtonBasic } from "./designs/ButtonBasic";


export default function SignOut() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { resetUser } = useUserStore();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await fetchSignOut();
      resetUser();
      router.push("/login");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    } finally {
    }
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={handleSignOut}
          onCancel={closeModal}
          title={"잠깐!"}
          content={"정말 로그아웃 할까요?"}
          confirmBtnText={"확인"}
        />
      )}
      <ButtonBasic text="로그아웃" onClick={openModal} />
    </>
  );
}
