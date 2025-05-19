import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createNewReview,
  deleteReview,
  editReview,
  fetchReview,
} from "@/components/fetch/fetchReview";
import { CreateNewReviewReq } from "@/types/Review";
import { isNil } from "lodash";
import { useUserStore } from "@/stores/useUserStore";

export const useProductReviewQuery = (productId: number | null) => {
  return useQuery({
    queryKey: ["productReview", productId],
    queryFn: () => {
      if (isNil(productId)) return;
      return fetchReview(productId);
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
        queryKey: ["productDetail"],
      });
    },
    onError: (error: any) => {
      console.error("리뷰 추가 실패", error);
    },
  });
};

export const useEditReviewMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      reviewData,
    }: {
      id: number;
      reviewData: Partial<CreateNewReviewReq>;
    }) => {
        return editReview(id, reviewData)
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        refetchType: "all",
        queryKey: ["productDetail"],
      });
    },

    onError: (error) => {
      console.log("리뷰 수정 도중 오류가 발생했습니다.", error);
    },
  });
};

export const useDeleteReviewMutation = () => {
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
          queryKey: ["productDetail"],
          refetchType: "all",
        });
      },
      onError: (error) => {
        console.error("리뷰 삭제 도중 오류가 발생했습니다.", error);
      },
    });
  };