import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  addWish,
  deleteWish,
  fetchWishList,
} from "@/components/fetch/fetchWishList";
import { isNil, isNumber } from "lodash";

// 위시 로드
export const useWishLoadQuery = (userId: number | null) => {
  return useQuery({
    queryKey: ["loadWishData", userId],
    queryFn: async () => {
      if (isNil(userId)) {
        return Promise.reject(new Error("유저 정보를 확인할 수 없습니다."));
      }
      const wishList = await fetchWishList();

      return wishList;
    },
    enabled: isNumber(userId),
  });
};

// 위시 추가
export const useWishAddMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (wishData: { memo: string; productId: number }) => {
      return addWish(wishData);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        refetchType: "all",
        queryKey: ["loadWishData"],
      });
    },
    onError: (error: any) => {
      console.error("위시리스트 추가 실패:", error || error.message);
    },
  });
};

// 위시 삭제
export const useWishDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: number) => {
      return deleteWish(productId);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        refetchType: "all",
        queryKey: ["loadWishData"],
      });
    },
    onError: (error) => {
      console.error("위시리스트 삭제에 실패했습니다.", error);
    },
  });
};