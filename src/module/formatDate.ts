import { format } from "date-fns/format";
import { parse } from "date-fns";
import { ko } from "date-fns/locale";

export const formatDate = (dateObj: Date | string, dateStr = "yyyy-MM-dd") => {
  return format(new Date(dateObj), dateStr, { locale: ko });
};

// yyyy-MM-dd

export const formateStringToDate = (
  dateStr: string,
  formatStr = "yyyy-MM-dd"
) => {
  return parse(dateStr, formatStr, new Date(), { locale: ko });
};
