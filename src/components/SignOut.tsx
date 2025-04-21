"use client";

import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import { fetchSignOut } from "./fetch/fetchSignOut";
import useModal from "@/hooks/useModal";
import Modal from "./Modal/Modal";
import ButtonMild from "./designs/ButtonMild";

interface SignOutProps {
  setIsSigningOut: (value: boolean) => void;
}

export default function SignOut({ setIsSigningOut }: SignOutProps) {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { resetUser } = useUserStore();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await fetchSignOut();
      resetUser();
      router.replace("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    } finally {
      setIsSigningOut(false);
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
      <ButtonMild text="로그아웃" onClick={openModal} />
    </>
  );
}
