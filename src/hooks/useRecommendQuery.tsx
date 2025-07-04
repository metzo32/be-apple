import {
  createNewRecommend,
  getRecommendDetailItem,
  postRecommend01,
  postRecommend02,
  postRecommend03,
  postRecommend04,
  postRecommend05,
  postRecommendComplete,
} from "@/components/fetch/fetchRecommend";
import { ProductCategoryEnum } from "@/types/productCategory";
import { GetProductRecommendationResDto } from "@/types/recommend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isNil, isNumber } from "lodash";

export const useGetRecommendDetail = (recommendId: number | null) => {
  return useQuery<GetProductRecommendationResDto>({
    queryKey: ["recommendList", recommendId],
    queryFn: async () => {
      if (isNil(recommendId)) {
        return Promise.reject(new Error("추천 ID가 유효하지 않습니다."));
      }

      const result = await getRecommendDetailItem(recommendId);
      console.log("추천 결과", result);
      return result;
    },
    enabled: isNumber(recommendId),
  });
};

// 추천 ID 생성
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
    }) =>
      postRecommend01(productRecommendationId, {
        step: "STEP_1",
        productCategory,
      }),
    onSuccess: (data) => {
      console.log("1단계 성공:", data);
      queryClient.setQueryData(["recommendStep01Tags"], data.tags);
    },
    onError: (err) => {
      console.error("1단계 실패", err);
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
    }) =>
      postRecommend02(productRecommendationId, {
        step: "STEP_2",
        tags,
      }),
    onSuccess: (data) => {
      console.log("2단계 성공:", data);
      queryClient.setQueryData(["recommendStep02MinPrice"], data.minPrice);
      queryClient.setQueryData(["recommendStep02MaxPrice"], data.maxPrice);
    },
    onError: (err) => {
      console.error("2단계 실패", err);
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
    }) =>
      postRecommend03(productRecommendationId, {
        step: "STEP_3",
        minPrice,
        maxPrice,
      }),
    onSuccess: (data) => {
      console.log("3단계 성공:", data);
      queryClient.setQueryData(
        ["recommendStep03MinReleasedDate"],
        data.minReleasedDate
      );
    },
    onError: (err) => {
      console.error("3단계 실패", err);
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
      minReleasedDate: string | null;
    }) =>
      postRecommend04(productRecommendationId, {
        step: "STEP_4",
        minReleasedDate,
      }),
    onSuccess: (data) => {
      console.log("4단계 성공:", data);
      queryClient.setQueryData(["recommendStep04Specs"], data.specs);
    },
    onError: (err) => {
      console.error("4단계 실패", err);
    },
  });
};

export const useRecommendStep05 = () => {

  return useMutation({
    mutationFn: ({ // 이 객체가 onSuccess의 args
      productRecommendationId,
      specs,
    }: {
      productRecommendationId: number;
      specs: { type: string; value: string }[];
    }) =>
      postRecommend05(productRecommendationId, {
        step: "STEP_5",
        specs,
      }),
    onSuccess: async (_, args) => {
      try {
        await postRecommendComplete(args.productRecommendationId);
      } catch (err) {
        console.error("완료페이지 이동 실패", err);
      }
    },
    onError: (err) => {
      console.error("5단계 추천 생성 실패", err);
    },
  });
};
