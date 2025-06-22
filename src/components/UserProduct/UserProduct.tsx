import { useState } from "react";
import { useUserProductQuery } from "@/hooks/useUserProductQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  GetUserProductResponse,
  UserProductCondition,
  UserProductStatus,
} from "@/types/userProduct";
import { deleteUserProduct } from "../fetch/fetchUserProduct";
import type { UserProductFormData } from "@/types/addUserProducts";
import { ProductCategoryLabels } from "@/types/productCategory";
import UserProductCard from "../UserProductAdd/UserProductCard";
import SelectComp from "../UserProductAdd/SelectComp";
import SummaryCard from "./SummaryCard";
import ButtonStrong from "../designs/ButtonStrong";

interface UserProductProps {
  userId: number | null;
}

export const initialUserProductForm: UserProductFormData = {
  productId: undefined,
  productOptionId: undefined,
  purchasedAt: "",
  purchasePrice: 0,
  soldAt: "",
  status: UserProductStatus.ACTIVE,
  repurchasedCount: 0,
  condition: UserProductCondition.NEW,
  memo: "",
};

export default function UserProduct({ userId }: UserProductProps) {
  const [selectOpen, setSelectOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false)
  const [isOpenSaturationInfo, setIsOpenSaturationInfo] = useState(false);
  const [formData, setFormData] = useState<UserProductFormData>(
    initialUserProductForm
  );
  const [userProductIdToUpdate, setUserProductIdToUpdate] = useState<
    number | null
  >(null);

  const queryClient = useQueryClient();

  const { data: userProductData } = useUserProductQuery(userId);

  const { mutate: deleteUserProductMutaionFn } = useMutation({
    mutationFn: (userProduct: GetUserProductResponse) => {
      if (!userId) {
        return Promise.reject(new Error("유저 정보가 올바르지 않습니다."));
      }
      return deleteUserProduct(userProduct.id);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        refetchType: "all",
        queryKey: ["loadUserProduct"],
      });
    },
    onError: (error) => {
      console.error("보유 상품 삭제에 실패했습니다.", error);
    },
  });

  if (!userProductData) return null;

  const userProducts = userProductData.userProducts;
  const reviews = userProductData.userReviews;

  // 포화도
  const categories = [
    ...new Set(
      userProductData.userProducts.map((item) => item.product.category)
    ),
  ];

  const categorySaturationuration = (
    (categories.length / Object.keys(ProductCategoryLabels).length) *
    100
  ).toFixed(1);

  // 총액
  const totalPrice = userProducts.reduce(
    (sum, product) => sum + (product.purchasePrice ?? 0),
    0
  );

  const handleOpenSelect = () => {
    setSelectOpen(true);
  };

  const handleOpenSaturationInfo = () => {
    setIsOpenSaturationInfo(!isOpenSaturationInfo);
  };

  const handleEdit = (userProduct: GetUserProductResponse) => {
    setIsEditMode(true);
    setUserProductIdToUpdate(userProduct.id);
    setFormData({
      productId: userProduct.product.id,
      productOptionId: userProduct.product.myOption?.id,
      purchasedAt: userProduct.purchasedAt ?? "",
      purchasePrice: userProduct.purchasePrice ?? 0,
      soldAt: userProduct.soldAt ?? "",
      status: userProduct.status,
      repurchasedCount: userProduct.repurchasedCount,
      condition: userProduct.condition,
      memo: userProduct.memo ?? "",
    });
    setSelectOpen(true);
  };

  const handleCloseSelect = () => {
    setSelectOpen(false);
    setUserProductIdToUpdate(null);
    setFormData(initialUserProductForm);
  };

  return (
    <>
      <section className="userSection">
        <span className="w-full flex items-center justify-between">
          <h2 className="user-h2">내 제품 목록</h2>
          <ButtonStrong
            text="장비 추가하고 티어 올리기"
            onClick={handleOpenSelect}
          />
        </span>
        {/* 구분선 */}
        <span className="thick-line" />
        <div className="w-full mb-10 grid gap-1 md:gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="현재 보유한 기기 수"
            content={userProducts.length}
          />
          <SummaryCard
            title="포화도"
            content={`${categorySaturationuration}%`}
            showQuestion
            openInfo={handleOpenSaturationInfo}
            isInfoOpen={isOpenSaturationInfo}
            info={
              <p className="text-[10px]">
                전체 카테고리 중 사용자가 몇 가지 제품 카테고리를 보유했는지를
                나타내는 비율입니다.
              </p>
            }
          />
          <SummaryCard title="총액" content={totalPrice.toLocaleString()} />
          <SummaryCard
            title="작성한 리뷰 수"
            content={reviews.length.toString()}
          />
        </div>

        <div className="min-h-[100px] md:min-h-[200px]">
          {userProducts.length > 0 ? (
            <div className="w-full flex flex-col gap-5">
              {userProducts.map((userProduct, index) => (
                <div key={index}>
                  <UserProductCard
                    userProduct={userProduct}
                    onDelete={() => deleteUserProductMutaionFn(userProduct)}
                    userId={userId}
                    onEditSubmit={handleEdit}
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
      </section>

      <SelectComp
        isSelectWindowOpened={selectOpen}
        setIsSelectWindowOpened={handleCloseSelect}
        userProductIdToUpdate={userProductIdToUpdate}
        formData={formData}
        setFormData={setFormData}
        isEditMode={isEditMode}
      />
    </>
  );
}
