import { format } from "date-fns/format";
import { ko } from "date-fns/locale";

export const formatDate = (dateObj: Date | string, dateStr: string) => {
  return format(new Date(dateObj), dateStr, { locale: ko });
};