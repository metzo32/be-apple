import { getProduct, getProductDetail } from "@/components/fetch/fetchProduct";
import {
  ProductCategoryEnum,
  ProductQueryString,
} from "@/types/productCategory";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouterQuery } from "./useRouterQuery";
import { isEqual } from "lodash";
import { removeEmptyFields } from "@/module/\bremoveEmptyFields";

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

const validateRange = (min: number, max: number): boolean => {
  if (max === 0) return true;
  if (min >= max) {
    alert("최대값은 최소값보다 커야합니다.");
    return false;
  }
  return true;
};

// 검색
export const useSearchMutation = (category: ProductCategoryEnum) => {
  const { push } = useRouterQuery();
  const initialForm: ProductQueryString = { category };

  return useMutation({
    mutationFn: async (searchForm: ProductQueryString) => {
      if (searchForm.minPrice != null && searchForm.maxPrice != null) {
        const isValid = validateRange(searchForm.minPrice, searchForm.maxPrice);
        if (!isValid) return;
      }

      if (isEqual(initialForm, searchForm)) return; // 직전 검색 내역과 같다면 리턴

      const filtered = removeEmptyFields(searchForm); // 입력되지 않은 항목은 쿼리스트링으로 전달하지 않음
      push(`/${category}`, filtered);
    },

    onSuccess: async () => {
      return true;
    },
    onError: (error) => {
      console.error("검색 필터링에 실패했습니다.", error);
    },
  });
};

export const useProductDetailQuery = (
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
