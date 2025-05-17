import { get } from "@/api/api";
import type { GetProductResponse } from "@/types/product";
import type { ProductDetail } from "@/types/productDetail";
import {
  ProductCategoryEnum,
  ProductQueryString,
} from "@/types/productCategory";

export async function getProduct(
  category: ProductCategoryEnum,
  query?: Omit<ProductQueryString, "category">
  // ProductQueryString에서 category 를 뺀 타입.
  // 이미 첫번째 매개변수로 받고있으므로
) {
  const { data } = await get<GetProductResponse[]>("/product", {
    params: { category, ...query },
  });
  return data;
}

export async function getProductDetail(productId: number) {
  const { data } = await get<ProductDetail>(`/product/${productId}`);
  return data;
}

// 검색어가 입력됐을 떄 url에 name 쿼리스트링으로 url을 바꾸고 있다
// api 요청에는 그에 해당하는 value를 가져다가 name=query로 넣고있는데-
// 이럼 타입마다 다 써줘야 하니,
