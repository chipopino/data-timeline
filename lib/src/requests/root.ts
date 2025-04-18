import { Request, Response } from "express";
import { Send } from "express-serve-static-core";
import { z } from "zod";

export interface TypedReq<T> extends Request {
  body: T;
}
export interface TypedRes<ResBody> extends Response {
  json: Send<ResBody & { clientMsg?: string }, this>;
}


export const uploadCsv = {
  path: "/uploadCsv",
  schema: z.object({}),
};
export type req_uploadCsv = z.infer<typeof uploadCsv.schema>;
export type res_uploadCsv = {
  successfulTitles?: string[];
  unsuccessfulTitles?: { title: string; msg: string }[];
}
export type treq_uploadCsv = TypedReq<req_uploadCsv>;
export type tres_uploadCsv = TypedRes<res_uploadCsv>;

export const uploadTimelineCsv = {
  path: "/uploadTimelineCsv",
  schema: z.object({}),
};
export type req_uploadTimelineCsv = z.infer<typeof uploadTimelineCsv.schema>;
export type res_uploadTimelineCsv = {};
export type treq_uploadTimelineCsv = TypedReq<req_uploadTimelineCsv>;
export type tres_uploadTimelineCsv = TypedRes<res_uploadTimelineCsv>;

export const uploadChartCsv = {
  path: "/uploadChartCsv",
  schema: z.object({}),
};
export type req_uploadChartCsv = z.infer<typeof uploadChartCsv.schema>;
export type res_uploadChartCsv = {};
export type treq_uploadChartCsv = TypedReq<req_uploadChartCsv>;
export type tres_uploadChartCsv = TypedRes<res_uploadChartCsv>;

export const uploadChartsCsv = {
  path: "/uploadChartsCsv",
  schema: z.object({}),
};
export type req_uploadChartsCsv = z.infer<typeof uploadChartCsv.schema>;
export type res_uploadChartsCsv = {};
export type treq_uploadChartsCsv = TypedReq<req_uploadChartsCsv>;
export type tres_uploadChartsCsv = TypedRes<res_uploadChartsCsv>;

export const getChartTitles = {
  path: "/getChartTitles",
  schema: z.object({}),
};
export type req_getChartTitles = z.infer<typeof getChartTitles.schema>;
export type res_getChartTitles = string[];
export type treq_getChartTitles = TypedReq<req_getChartTitles>;
export type tres_getChartTitles = TypedRes<res_getChartTitles>;

export const getTimelineTitles = {
  path: "/getTimelineTitles",
  schema: z.object({}),
};
export type req_getTimelineTitles = z.infer<typeof getTimelineTitles.schema>;
export type res_getTimelineTitles = string[];
export type treq_getTimelineTitles = TypedReq<req_getTimelineTitles>;
export type tres_getTimelineTitles = TypedRes<res_getTimelineTitles>;

export const getChartByTitle = {
  path: "/getChartByTitle",
  schema: z.object({ title: z.string() }),
};
export type req_getChartByTitle = z.infer<typeof getChartByTitle.schema>;
export type res_getChartByTitle = {
  title: string,
  description: string,
  values: { d: string; v: number }[]
};
export type treq_getChartByTitle = TypedReq<req_getChartByTitle>;
export type tres_getChartByTitle = TypedRes<res_getChartByTitle>;

export const getTimelineByTitle = {
  path: "/getTimelineByTitle",
  schema: z.object({ title: z.string() }),
};
export type req_getTimelineByTitle = z.infer<typeof getTimelineByTitle.schema>;
export type res_getTimelineByTitle = {
  title: string,
  description: string,
  events: { title: string; date: string }[]
};
export type treq_getTimelineByTitle = TypedReq<req_getTimelineByTitle>;
export type tres_getTimelineByTitle = TypedRes<res_getTimelineByTitle>;
