import { merge } from "lodash";
import { useRouter } from "next/navigation";
import qs from "query-string";

type UpdateOption = "merge" | "reset";

/**
 * query parameter 들을 객체로 반환하는 훅
 * 배열key 와 쉼표로구분된 value 는 배열로 반환 ex) ingredients[]=유채나물,부추 => ingredients: ['유채나물', '부추']
 */

export function useRouterQuery<T extends Record<string, any>>(
  initialValue?: T
) {
  const router = useRouter(); // 프로그래매틱 이동

  const queryString = decodeURIComponent(window.location.search); // 쿼리스트링 추출

  // 쿼리스트링을 객체로
  const query = qs.parse(queryString, {
    arrayFormat: "bracket-separator",
    arrayFormatSeparator: ",",
    parseNumbers: true,
    parseBooleans: true,
  }) as T;

  // 객체를 쿼리스트링으로
  const stringify = (obj: T) =>
    qs.stringify(obj, {
      arrayFormat: "bracket-separator",
      arrayFormatSeparator: ",",
    });

  const updateQuery = (
    newQuery: Partial<T>,
    option: UpdateOption = "merge"
  ) => {
    if (option === "merge") {
      router.push(`?${stringify({ ...query, ...newQuery })}`);
    } else {
      router.push(`?${stringify(newQuery as T)}`);
    }
  };

  // 라우팅
  const push = (path: string, query?: T) => {
    router.push(`${path}${query ? `?${stringify(query)}` : ""}`);
  };

  const removeQuery = (key: keyof T) => {
    const omitted = { ...query, [key]: undefined };
    router.push(`?${stringify(omitted)}`);
  };

  return {
    query: merge({}, initialValue ?? {}, query),
    queryString,
    stringify,
    updateQuery,
    push,
    removeQuery,
  };
}
