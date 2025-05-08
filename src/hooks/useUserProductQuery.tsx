import { fetchReviewMe } from "@/components/fetch/fetchReview";
import { fetchUserProduct } from "@/components/fetch/fetchUserProduct";
import { Review } from "@/types/Review";
import { GetUserProductResponse } from "@/types/userProduct";
import { useQuery } from "@tanstack/react-query";
import { isNil, isNumber } from "lodash";

export const useUserProductQuery = (userId: number | null) => {
  return useQuery<{
    userProducts: GetUserProductResponse[];
    userReviews: Review[];
  }>({
    queryKey: ["loadUserProduct", userId],
    queryFn: async () => {
      if (isNil(userId)) {
        throw new Error("유저 정보를 확인할 수 없습니다.");
      }

      const [userProductData, userReviews] = await Promise.all([
        fetchUserProduct(),
        fetchReviewMe(),
      ]);

      console.log("유저프로덕트 데이터", userProductData);

      return {
        userProducts: userProductData.reverse(),
        userReviews: userReviews?.data || [],
      };
    },
    enabled: isNumber(userId), // 숫자타입의 userId가 있을 때만 실행
  });
};
