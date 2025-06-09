import { format } from "date-fns/format";
import { parse } from "date-fns";
import { ko } from "date-fns/locale";

export const formatDate = (
  dateObj: Date | string | null,
  dateStr = "yyyy-MM-dd"
): string | null => {
  if (!dateObj) return null;
  return format(new Date(dateObj), dateStr, { locale: ko });
};

// yyyy-MM-dd

export const formatStringToDate = (
  dateStr: string,
  formatStr = "yyyy-MM-dd"
) => {
  if (!dateStr) return null;
  return parse(dateStr, formatStr, new Date(), { locale: ko });
};
