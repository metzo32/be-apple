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
  UpdateUserProductReqDto,
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
      if (!isNil(userId)) {
        queryClient.invalidateQueries({
          queryKey: ["loadUserProduct", userId],
          refetchType: "all",
        });
        queryClient.invalidateQueries({
          queryKey: ["myTier"],
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
    mutationFn: ({
      userProduct,
      userProductId,
    }: {
      userProduct: UpdateUserProductReqDto;
      userProductId: number;
    }) => {
      return editUserProduct(userProduct, userProductId);
    },
    onSuccess: () => {
      if (!isNil(userId)) {
        queryClient.invalidateQueries({
          queryKey: ["loadUserProduct", userId],
          refetchType: "all",
        });

        queryClient.invalidateQueries({
          queryKey: ["myTier"],
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
    mutationFn: ({
      id,
      options,
    }: {
      id: number;
      options?: { force: boolean };
    }) => deleteUserProduct(id, options),

    onSuccess: () => {
      if (!isNil(userId)) {
        queryClient.invalidateQueries({
          queryKey: ["loadUserProduct", userId],
        });

        queryClient.invalidateQueries({
          queryKey: ["myTier"],
          refetchType: "all",
        });
      }
    },
    onError: (error) => {
      console.error("유저 보유 목록 삭제 실패:", error);
    },
  });
};
