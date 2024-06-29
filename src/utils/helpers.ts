import { formatDistance, parseISO } from "date-fns";
import { differenceInDays } from "date-fns";

export const formatDistanceFromNow = (dateString: string) => {
  return formatDistance(parseISO(dateString), new Date(), {
    addSuffix: true,
  })
    .replace("about", "")
    .replace("in", "In");
};

export const getToday = () => {
  return new Date().toISOString();
};

export const subtractDates = (date1: Date | string, date2: Date | string) =>
  differenceInDays(parseISO(String(date1)), parseISO(String(date2)));
