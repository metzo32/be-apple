import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createNewReview,
  deleteReview,
  editReview,
  fetchReview,
} from "@/components/fetch/fetchReview";
import { CreateNewReviewReq } from "@/types/Review";
import { useUserStore } from "@/stores/useUserStore";

export const useProductReviewQuery = (reviewId: number) => {
  return useQuery({
    queryKey: ["productReview", reviewId],
    queryFn: () => {
      return fetchReview(reviewId);
    },
  });
};

export const useAddReviewMutation = (productId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reviewData: CreateNewReviewReq) => {
      return createNewReview(reviewData);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        refetchType: "all",
        queryKey: ["productDetail", productId],
      });
      await queryClient.invalidateQueries({
        refetchType: "all",
        queryKey: ["productReview", productId],
      });
    },
    onError: (error: any) => {
      console.error("리뷰 추가 실패", error);
    },
  });
};

export const useEditReviewMutation = (productId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      reviewData,
    }: {
      id: number;
      reviewData: Partial<CreateNewReviewReq>;
    }) => {
      return editReview(id, reviewData);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        refetchType: "all",
        queryKey: ["productDetail", productId],
      });
    },

    onError: (error) => {
      console.log("리뷰 수정 도중 오류가 발생했습니다.", error);
    },
  });
};

export const useDeleteReviewMutation = (productId: number) => {
  const queryClient = useQueryClient();
  const { user } = useUserStore();

  return useMutation({
    mutationFn: (id: number) => {
      const currentUserId = user?.id;
      if (!currentUserId) {
        return Promise.reject(new Error("로그인이 필요합니다."));
      }
      return deleteReview(id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["productDetail", productId],
        refetchType: "all",
      });
    },
    onError: (error) => {
      console.error("리뷰 삭제 도중 오류가 발생했습니다.", error);
    },
  });
};
