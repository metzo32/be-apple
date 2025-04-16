import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addWish,
  deleteWish,
  fetchWishList,
} from "@/components/fetch/fetchWishList";


// 위시목록 불러오기
export const useWishList = () => {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: fetchWishList,
    staleTime: 1000 * 60, // 1분 동안은 캐싱 유지
  });
};

// 위시 추가
export const useAddWish = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addWish,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
};


// 위시 삭제
export const useDeleteWish = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteWish,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
};
