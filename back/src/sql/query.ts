// TODO: wait untill bad-words fix this: https://github.com/web-mech/badwords/issues/184

import { Err } from "@/debug";
import { client } from "@/main";
// import { Filter } from 'bad-words'
import { sortChartByDates } from "@/methodes/methodes";
import { inspect } from 'util';
import { chartScheme, chartType, timelineScheme, timelineType } from '@/types/types';
import { parseSchema } from "@/methodes/zod";


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










