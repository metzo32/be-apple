import {
  createNewRecommend,
  postRecommend01,
  postRecommend02,
  postRecommend03,
  postRecommend04,
  postRecommend05,
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
      const productRecommendationId = await createNewRecommend();
      return productRecommendationId;
    },
    enabled: isNumber(userId),
  });
};

export const useRecommendStep01 = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productRecommendationId,
      productCategory,
    }: {
      productRecommendationId: number;
      productCategory: ProductCategoryEnum;
    }) => {
      return postRecommend01(productRecommendationId, {
        step: "STEP_1",
        productCategory,
      });
    },
    onSuccess: async () => {
      // queryClient.invalidateQueries({
      //   refetchType: "all",
      //   queryKey: ["createRecommend"],
      // });
    },
    onError: (error) => {
      console.error("1단계 추천 생성에 실패했습니다.", error);
    },
  });
};

export const useRecommendStep02 = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productRecommendationId,
      tags,
    }: {
      productRecommendationId: number;
      tags: string[];
    }) => {
      return postRecommend02(productRecommendationId, { step: "STEP_2", tags });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        refetchType: "all",
        queryKey: ["createRecommend"],
      });
    },
    onError: (error) => {
      console.error("2단계 추천 생성에 실패했습니다.", error);
    },
  });
};

export const useRecommendStep03 = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productRecommendationId,
      minPrice,
      maxPrice,
    }: {
      productRecommendationId: number;
      minPrice: number;
      maxPrice: number;
    }) => {
      return postRecommend03(productRecommendationId, {
        step: "STEP_3",
        minPrice,
        maxPrice,
      });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        refetchType: "all",
        queryKey: ["createRecommend"],
      });
    },
    onError: (error) => {
      console.error("3단계 추천 생성에 실패했습니다.", error);
    },
  });
};

export const useRecommendStep04 = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productRecommendationId,
      minReleasedDate,
    }: {
      productRecommendationId: number;
      minReleasedDate: string;
    }) => {
      return postRecommend04(productRecommendationId, {
        step: "STEP_4",
        minReleasedDate,
      });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        refetchType: "all",
        queryKey: ["createRecommend"],
      });
    },
    onError: (error) => {
      console.error("4단계 추천 생성에 실패했습니다.", error);
    },
  });
};

export const useRecommendStep05 = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productRecommendationId,
      specs,
    }: {
      productRecommendationId: number;
      specs: { type: string; value: string }[];
    }) => {
      return postRecommend05(productRecommendationId, { step: "STEP_5", specs });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        refetchType: "all",
        queryKey: ["createRecommend"],
      });
    },
    onError: (error) => {
      console.error("5단계 추천 생성에 실패했습니다.", error);
    },
  });
};
