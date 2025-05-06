import { useEffect, useState } from "react";
import useModal from "@/hooks/useModal";
import { ProductCategoryLabels } from "@/types/productCategory";
import { GetUserProductResponse } from "@/types/userProduct";
import { deleteUserProduct, fetchUserProduct } from "../fetch/fetchUserProduct";
import UserProductCard from "../UserProductAdd/UserProductCard";
import SummaryCard from "./SummaryCard";
import Modal from "../Modal/Modal";
import { fetchReviewMe } from "../fetch/fetchReview";
import { Review } from "@/types/Review";

export default function UserProduct() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [userProducts, setUserProducts] = useState<GetUserProductResponse[]>(
    []
  );

  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [reviewsArr, setReviewsArr] = useState<Review[]>([]);

  useEffect(() => {
    const getUserProduct = async () => {
      try {
        const [userProductData, userReviewList] = await Promise.all([
          fetchUserProduct(),
          fetchReviewMe(),
        ]);

        const reversedData = userProductData.reverse();

        setUserProducts(reversedData);

        const reviews = userReviewList?.data.map((item: Review) => item);

        setReviewsArr(reviews);
      } catch (error) {
        console.error("유저 보유 목록 불러오기 실패", error);
      }
    };
    getUserProduct();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      // await deleteUserProduct(id, async () => {
      //   setConfirmDeleteId(id);
      //   openModal();
      //   return false;
      // });
      await deleteUserProduct(id, {
        onError: (error) => {
          setConfirmDeleteId(id);
          openModal();
        },
      });

      return true;
    } catch (error) {
      return false;
    }
  };

  const handleModalConfirm = async () => {
    if (confirmDeleteId === null) return;

    try {
      await deleteUserProduct(confirmDeleteId, { force: true });
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

  const categorySaturation = 100 / Object.keys(ProductCategoryLabels).length;

  const totalPrice = userProducts.reduce(
    (sum, product) => sum + (product.purchasePrice ?? 0),
    0
  );

  return (
    <section className="userSection">
      <h2 className="user-h2">내 제품 목록</h2>
      <div className="w-full mb-10 grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="현재 보유한 기기 수"
          content={userProducts.length}
        />
        <SummaryCard
          title="포화도"
          content={`${Math.round(categorySaturation)}%`}
        />
        <SummaryCard title="총액" content={totalPrice.toLocaleString()} />
        <SummaryCard
          title="작성한 리뷰 수"
          content={reviewsArr.length.toString()}
        />
      </div>

      <div className="user-common-container min-h-[500px]">
        {userProducts.length > 0 ? (
          <div className="w-full flex flex-col gap-5">
            {userProducts.map((userProduct, index) => (
              <div key={index}>
                <UserProductCard
                  userProduct={userProduct}
                  onDelete={handleDelete}
                />
              </div>
            ))}
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
    </section>
  );
}
