import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createNewReview, fetchReview } from "@/components/fetch/fetchReview";
import { CreateNewReviewReq } from "@/types/Review";
import { isNil } from "lodash";

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
