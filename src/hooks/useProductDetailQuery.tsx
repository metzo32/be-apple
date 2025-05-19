import { getProductDetail } from "@/components/fetch/fetchProduct";
import { createNewReview, fetchReview } from "@/components/fetch/fetchReview";
import { CreateNewReviewReq } from "@/types/Review";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isNil, isNumber } from "lodash";

export const useProductDetailQuery = (productId: number | null) => {
  return useQuery({
    queryKey: ["productDetail", productId],
    queryFn: () => {
      if (isNil(productId)) return;
      return getProductDetail(productId);
    },
    enabled: isNumber(productId),
  });
};

export const useProductReviewQuery = (productId: number | null) => {
  return useQuery({
    queryKey: ["productReview", productId],
    queryFn: () => {
      if (isNil(productId)) return;
      return fetchReview(productId);
    },
  });
};

export const useAddReviewMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reviewData: CreateNewReviewReq) => {
      return createNewReview(reviewData);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        refetchType: "all",
        queryKey: ["productReview"],
      });
    },
    onError: (error: any) => {
      console.error("리뷰 추가 실패", error);
    },
  });
};

