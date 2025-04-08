import { DateTime } from "luxon";

export function isValidNumber(str: string) {
  const num = Number(str);
  return !isNaN(num) && isFinite(num) && !!str;
}

export function sortChartByDates(
  items: { d: string, v: number }[],
  dateFormat: string,
) {
  let correctedValues = items.map(e => {
    return { ...e, d: DateTime.fromFormat(e.d, dateFormat) }
  });
  correctedValues = correctedValues.sort((a, b) => {
    return b.d.toMillis() - a.d.toMillis()
  });
  let fin = correctedValues.map(e => {
    return { ...e, d: e.d.toISODate() }
  })
  return fin.filter(e => !!e.v).reverse();
}