import { fetchReviewMe } from "@/components/fetch/fetchReview";
import {
  addUserProduct,
  deleteUserProduct,
  editUserProduct,
  fetchUserProduct,
} from "@/components/fetch/fetchUserProduct";
import { Review } from "@/types/Review";
import {
  CreateUserProductReqDto,
  GetUserProductResponse,
} from "@/types/userProduct";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export const useAddUserProductMutation = (userId: number | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userProduct: CreateUserProductReqDto) => {
      return addUserProduct(userProduct);
    },
    onSuccess: () => {
      if (userId !== null) {
        queryClient.invalidateQueries({
          queryKey: ["loadUserProduct", userId],
          refetchType: "all",
        });
      }
    },
    onError: (error) => {
      console.error("유저 제품 추가 실패:", error);
    },
  });
};

export const useEditUserProductMutation = (userId: number | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userProduct: CreateUserProductReqDto) => {
      return editUserProduct(userProduct);
    },
    onSuccess: () => {
      if (userId !== null) {
        queryClient.invalidateQueries({
          queryKey: ["loadUserProduct", userId],
          refetchType: "all",
        });
      }
    },
    onError: (error) => {
      console.error("유저 제품 수정 실패:", error);
    },
  });
};

export const useDeleteUserProductMutation = (userId: number | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteUserProduct(id),
    onSuccess: () => {
      if (userId !== null) {
        queryClient.invalidateQueries({
          queryKey: ["loadUserProduct", userId],
        });
      }
    },
    onError: (error) => {
      console.error("유저 보유 목록 삭제 실패:", error);
    },
  });
};
