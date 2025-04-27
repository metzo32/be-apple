import { GetUserProductResponse } from "@/types/userProduct";
import { useEffect, useState } from "react";
import { deleteUserProduct, fetchUserProduct } from "../fetch/fetchUserProduct";
import UserProductCard from "../UserProductAdd/UserProductCard";
import SummaryCard from "./SummaryCard";
import useModal from "@/hooks/useModal";
import Modal from "../Modal/Modal";
import DeletePopup from "../DeletePopup/DeletePopup";

export default function UserProduct() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [userProducts, setUserProducts] = useState<GetUserProductResponse[]>(
    []
  );
  const [pendingDeleteIds, setPendingDeleteIds] = useState<number[]>([]);
  const [recentlyDeleted, setRecentlyDeleted] =
    useState<GetUserProductResponse | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [deleteTimer, setDeleteTimer] = useState<NodeJS.Timeout | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  useEffect(() => {
    const getUserProduct = async () => {
      try {
        const userProductData = await fetchUserProduct();
        const reversedData = userProductData.reverse();
        setUserProducts(userProductData);
      } catch (error) {
        console.error("유저 보유 목록 불러오기 실패", error);
      }
    };
    getUserProduct();
  }, []);

  const handleDelete = (id: number) => {
    const target = userProducts.find((item) => item.id === id);
    if (!target) return;

    setPendingDeleteIds((prev) => [...prev, id]);
    setRecentlyDeleted(target);
    setIsPopupOpen(true);

    const timer = setTimeout(async () => {
      const success = await tryDelete(id);
      if (success) {
        setUserProducts((prev) => prev.filter((item) => item.id !== id));
      }
      setIsPopupOpen(false);
      setRecentlyDeleted(null);
    }, 3000);

    setDeleteTimer(timer);
  };

  const tryDelete = async (id: number) => {
    try {
      await deleteUserProduct(id, async () => {
        setConfirmDeleteId(id);
        openModal();
        return false;
      });
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleModalConfirm = async () => {
    if (confirmDeleteId === null) return;

    try {
      await deleteUserProduct(confirmDeleteId, async () => true); // force:true로
      setUserProducts((prev) =>
        prev.filter((item) => item.id !== confirmDeleteId)
      );
    } catch (error) {
      console.error("삭제 실패:", error);
    } finally {
      setConfirmDeleteId(null);
      closeModal();
    }
  };

  const handleModalCancel = () => {
    setConfirmDeleteId(null);
    closeModal();
  };

  const handleUndo = () => {
    if (recentlyDeleted) {
      if (deleteTimer) clearTimeout(deleteTimer);
      setPendingDeleteIds((prev) =>
        prev.filter((id) => id !== recentlyDeleted.id)
      );
      setIsPopupOpen(false);
      setRecentlyDeleted(null);
    }
  };

  return (
    <section className="userSection">
      <h2 className="font-bold mb-10">내 제품 목록</h2>
      <div className="w-full mb-10 grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard title="현재 보유한 기기 수" content={0} />
        <SummaryCard title="포화도" content={`${15}%`} />
        <SummaryCard title="총액" content={(100000000).toLocaleString()} />
        <SummaryCard title="작성한 리뷰 수" content={0} />
      </div>

      <div className="bg-white min-h-[250px] p-12 rounded-3xl shadow-light">
        {userProducts.length > 0 ? (
          <div className="w-full flex flex-col gap-5">
            {userProducts.map((userProduct) => {
              const isPendingDelete = pendingDeleteIds.includes(userProduct.id);
              return (
                <div
                  key={userProduct.id}
                  className={
                    isPendingDelete
                      ? "saturate-0 opacity-30 pointer-events-none "
                      : ""
                  }
                >
                  <UserProductCard
                    userProduct={userProduct}
                    onDelete={handleDelete}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <p className="light-p">등록된 장비가 없습니다.</p>
          </div>
        )}
      </div>

      <Modal
        isModalOpen={isModalOpen}
        onClose={handleModalCancel}
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
        title="잠깐!"
        content="작성했던 리뷰도 삭제됩니다. 정말 삭제할까요?"
        confirmBtnText="확인"
      />

      <DeletePopup isOpen={isPopupOpen} onUndo={handleUndo} />
    </section>
  );
}
