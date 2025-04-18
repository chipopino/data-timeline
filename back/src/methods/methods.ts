import { DateTime } from "luxon";

export function isValidNumber(str: string) {
  const num = Number(str);
  return !isNaN(num) && isFinite(num) && !!str;
}

export function sortChartByDates(
  items: { d: string; v: number }[],
  dateFormat: string
) {
  const format = dateFormat.replace('mm', 'MM');
  let correctedValues = items.map((e) => {
    return { ...e, d: DateTime.fromFormat(e.d, format) };
  });
  correctedValues = correctedValues.sort((a, b) => {
    return b.d.toMillis() - a.d.toMillis();
  });
  let fin = correctedValues.map((e) => {
    return { ...e, d: e.d.toISODate() };
  });
  return fin.filter((e) => !!e.v).reverse();
}
