import { Err } from "@/debug";
import { sortChartByDates } from "@/methods/methods";
import { chartScheme, chartType } from '@/types/types';
import { parseSchema } from "@/methods/zod";
import query from '@/sql/query';


export async function postChart(
    title: string,
    description: string,
    dateFormat: string,
    values: { d: string; v: number }[]
) {
    const sortedValues = sortChartByDates(values, dateFormat);

    if (!sortedValues.length) {
        throw new Err("emptySet");
    }
    return await query(
        `
        INSERT INTO charts (
            title,
            description,
            values
        ) VALUES ($1, $2, $3)
        `,
        [title, description, JSON.stringify(sortedValues)]
    );
}

export async function getChartTitles(): Promise<string[]> {
  const temp = (await query(
    `
        SELECT title FROM charts
        `,
    []
  )) as { title: string }[];
  return temp.map((e) => e.title);
}

export async function getChartByTitle(
  title: string
): Promise<chartType> {
  const temp = (await query(
    `
        SELECT title, description, values FROM charts
        WHERE title = $1
        `,
    [title]
  )) as chartType[];
  parseSchema(chartScheme, temp[0]);
  return temp[0];
}
