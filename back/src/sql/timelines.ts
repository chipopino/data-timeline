import { timelineScheme, timelineType } from '@/types/types';
import { parseSchema } from "@/methods/zod";
import query from '@/sql/query';


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

export async function getTimelineTitles(): Promise<string[]> {
  const temp = (await query(
    `
        SELECT title FROM timelines
        `,
    []
  )) as { title: string }[];
  return temp.map((e) => e.title);
}

export async function getTimelineByTitle(
    title: string
  ): Promise<timelineType> {
    const temp = (await query(
      `
          SELECT title, description, events FROM timelines
          WHERE title = $1
          `,
      [title]
    )) as timelineType[];
    parseSchema(timelineScheme, temp[0]);
    return temp[0];
  }
  