import { intervalToDuration, sub } from "date-fns";

export const formatDate = (date) => {
  const today = new Date();
  const orderDate = new Date(date);

  let interval = intervalToDuration({
    start: today,
    end: orderDate,
  });

  return sub(today, {
    years: interval.years,
    months: interval.months,
    days: interval.days,
    hours: interval.hours,
    minutes: interval.minutes,
    seconds: interval.seconds,
  });
};
