import { getProductDetail } from "@/components/fetch/fetchProduct";
import { useQuery } from "@tanstack/react-query";
import { isNil, isNumber } from "lodash";

export const useProductDetailQuery = (productId: number) => {
  return useQuery({
    queryKey: ["productDetail", productId],
    queryFn: () => {
      if (isNil(productId)) return;
      return getProductDetail(productId);
    },
    enabled: isNumber(productId),
  });
};

