import { useUserProductQuery } from "@/hooks/useUserProductQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductCategoryLabels } from "@/types/productCategory";
import { deleteUserProduct } from "../fetch/fetchUserProduct";
import UserProductCard from "../UserProductAdd/UserProductCard";
import SummaryCard from "./SummaryCard";
import { GetUserProductResponse } from "@/types/userProduct";
import { useState } from "react";
import ButtonStrong from "../designs/ButtonStrong";
import SelectComp from "../UserProductAdd/SelectComp";

interface UserProduct {
  userId: number | null;
}

export default function UserProduct({ userId }: UserProduct) {
  const [editmode, setEditmode] = useState<boolean>(false);
  const [selectOpen, setSelectOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<GetUserProductResponse | null>(
    null
  );

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
  const categorySaturation = 100 / Object.keys(ProductCategoryLabels).length;

  // 총액
  const totalPrice = userProducts.reduce(
    (sum, product) => sum + (product.purchasePrice ?? 0),
    0
  );

  const handleOpenSelect = () => {
    setSelectOpen(true);
  };

  const handleEdit = (userProduct: GetUserProductResponse) => {
    setEditTarget(userProduct);
    setEditmode(true);
    setSelectOpen(true);
  };

  return (
    <>
      <section className="userSection">
        <div className="flex gap-3 items-start">
          <h2 className="user-h2">내 제품 목록</h2>
          <ButtonStrong
            text="장비 추가하고 티어 올리기"
            onClick={handleOpenSelect}
          />
        </div>
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
            content={reviews.length.toString()}
          />
        </div>

        <div className="user-common-container min-h-[500px]">
          {userProducts.length > 0 ? (
            <div className="w-full flex flex-col gap-5">
              {userProducts.map((userProduct, index) => (
                <div key={index}>
                  <UserProductCard
                    userProduct={userProduct}
                    onDelete={() => deleteUserProductMutaionFn(userProduct)}
                    userId={userId}
                    onEdit={() => handleEdit(userProduct)}
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
        setIsSelectWindowOpened={setSelectOpen}
        editmode={editmode}
        editTarget={editTarget ?? undefined}
      />
    </>
  );
}
