// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { addWish, deleteWish } from "@/components/fetch/fetchWishList";

// export function useAddWish(productId: number, memo: string) {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: () => addWish({ productId, memo }),
//     onSuccess: (newWish) => {
//       queryClient.invalidateQueries({ queryKey: ["wishlist"] }); // 캐시 무효화
//     },
//   });
// }

// export function useDeleteWish() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (wishId: number) => deleteWish(wishId),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["wishlist"] });
//     },
//   });
// }
