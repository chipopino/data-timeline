// TODO: wait untill bad-words fix this: https://github.com/web-mech/badwords/issues/184

import logErr, { Err } from "@/debug";
import { client } from "@/main";
// import { Filter } from 'bad-words'
import { DateTime } from "luxon";
import { sortChartByDates } from "@/methodes/methodes";
import { inspect } from 'util';
import * as t from "front-lib";

// const filter = new Filter();

export default function query(query: string, params?: any[]) {
  return new Promise(async (resolve, reject) => {
    client
      .query(query, params || [])
      .then((result) => {
        resolve(result.rows);
      })
      .catch((err) => {
        reject(
          new Err("sql", "query failed", [
            { title: "error", msg: inspect(err) },
            { title: "query", msg: inspect(query) },
            { title: "parameters", msg: inspect(params) },
          ])
        );
      });
  });
}

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

export async function postTimeline(
  title: string,
  tags: string[],
  events: { title: string; date: string }[]
) {
  return await query(
    `
        INSERT INTO timelines (
            title,
            tags,
            events
        ) VALUES ($1, $2, $3)
        `,
    [title, tags, JSON.stringify(events)]
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

export async function getTimelineTitles(): Promise<string[]> {
  const temp = (await query(
    `
        SELECT title FROM timelines
        `,
    []
  )) as { title: string }[];
  return temp.map((e) => e.title);
}

export async function getChartByTitle(
  title: string
): Promise<{ d: string; v: string }[]> {
  const temp = (await query(
    `
        SELECT values FROM charts
        WHERE title = $1
        `,
    [title]
  )) as any;
  return temp?.length ? temp[0]?.values || [] : [];
}

export async function getTimelineByTitle(
  title: string
): Promise<{ title: string; date: string }[]> {
  const temp = (await query(
    `
        SELECT events FROM timelines
        WHERE title = $1
        `,
    [title]
  )) as any;
  return temp?.length ? temp[0]?.events || [] : [];
}
