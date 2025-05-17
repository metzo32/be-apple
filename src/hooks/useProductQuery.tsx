import { getProduct, getProductDetail } from "@/components/fetch/fetchProduct";
import { ProductCategoryEnum, ProductQueryString } from "@/types/productCategory";
import { useQuery } from "@tanstack/react-query";

// 카테고리별 프로덕트 전체 목록 조회
export const useProductLoadQuery = (
  category: ProductCategoryEnum,
  query?: Omit<ProductQueryString, "category">
) => {
  return useQuery({
    queryKey: ["loadProducts", category, query],
    queryFn: async () => {
      const response = await getProduct(category, query);

      return response;
    },
  });
};

export const useProductOptionsQuery = (
  productId: number,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["loadProductDetail", productId],
    queryFn: async () => {
      const response = await getProductDetail(productId);
      return response;
    },
    enabled: options?.enabled,
  });
};

// TODO 옵션 찾는데 전체 데이터 조회를 초기화 하는게 맞는지 생각해보자
// export const useProductOptionsLoadMutation = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (productId: number) => {
//       const options = getProductDetail(productId);
//       return options;
//     },
//     onSuccess: async () => {
//       queryClient.invalidateQueries({
//         refetchType: "all",
//         queryKey: ["loadProducts"],
//       });
//     },
//     onError: (error: any) => {
//         console.error("옵션 로드 실패:", error || error.message);
//       },
//   });
// };
