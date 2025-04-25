import { GetUserProductResponse } from "@/types/userProduct";
import { useEffect, useState } from "react";
import { fetchUserProduct } from "../fetch/fetchUserProduct";
import UserProductCard from "../UserProductAdd/UserProductCard";
import SummaryCard from "./SummaryCard";

export default function UserProduct() {
  const [userProducts, setUserProducts] = useState<GetUserProductResponse[]>(
    []
  );

  // 유저 보유 목록 불러오기
  useEffect(() => {
    const getUserProduct = async () => {
      try {
        const userProductData = await fetchUserProduct();
        console.log("유저 보유 목록", userProductData);
        setUserProducts(userProductData);
      } catch (error) {
        console.error("유저 보유 목록 불러오기 실패", error);
      }
    };
    getUserProduct();
  }, []);

  const summaryArr = [
    { ownNum: 0 },
    { saturation: 20 },
    { ownNum: 0 },
    { totalPrice: 0 },
    { reviewsNum: 0 },
  ];

  return (
    <>
      <div className="w-full flex justify-between">
        <SummaryCard title="보유한 기기 수" content={0} />
        <SummaryCard title="포화도" content={`${15}%`} />
        <SummaryCard title="총액" content={(100000000).toLocaleString()} />
        <SummaryCard title="작성한 리뷰 수" content={0} />
      </div>

      <div className="bg-white min-h-[500px] p-24 rounded-3xl shadow-light">
        <h2 className="font-bold mb-10">내 제품 목록</h2>
        {userProducts && userProducts.length > 0 ? (
          <div className="w-full h-[400px] pr-5 flex gap-5 lg:gap-20">
            {userProducts.map((userProduct) => (
              <UserProductCard key={userProduct.id} userProduct={userProduct} />
            ))}
          </div>
        ) : (
          <div>
            <p className="light-p">등록된 장비가 없습니다.</p>
          </div>
        )}
      </div>
    </>
  );
}
