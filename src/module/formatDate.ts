import { format } from "date-fns/format";
import { ko } from "date-fns/locale";

export const formatDate = (dateObj: Date | string, dateStr = "yyyy-MM-dd") => {
  return format(new Date(dateObj), dateStr, { locale: ko });
};

// yyyy-MM-dd
