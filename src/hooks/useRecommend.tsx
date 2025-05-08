import {
  createNewRecommend,
  editRecommend01,
} from "@/components/fetch/fetchRecommend";
import { ProductCategoryEnum } from "@/types/productCategory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isNil, isNumber } from "lodash";

export const useRecommendCreateQuery = (userId: number | null) => {
  return useQuery({
    queryKey: ["createRecommend", userId],
    queryFn: async () => {
      if (isNil(userId)) {
        return Promise.reject(new Error("유저 정보를 확인할 수 없습니다."));
      }
      const recommend = await createNewRecommend();
      return recommend;
    },
    enabled: isNumber(userId),
  });
};

export const useRecommendStep01 = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      productCategory,
    }: {
      productId: number;
      productCategory: ProductCategoryEnum;
    }) => {
      return editRecommend01(productId, { step: "STEP_1", productCategory });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        refetchType: "all",
        queryKey: ["createRecommend"],
      });
    },
    onError: (error) => {
      console.error("추천 생성에 실패했습니다.", error);
    },
  });
};
