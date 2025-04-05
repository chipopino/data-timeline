import { Request, Response } from 'express';
import { Send } from "express-serve-static-core";
import { number, string, z } from 'zod';


export interface TypedReq<T> extends Request {
    body: T
}
// export interface TypedRes<ResBody> extends Response {
//     json: Send<ResBody & { msg?: string }, this>;
// }
export interface TypedRes<ResBody> extends Response {
    json: (body: ResBody & { msg?: string }) => this;
}

export const test = {
    path: '/test',
    schema: z.object({
        test: z.string(),
    })
};
export type tres_test = TypedRes<{}>
export type treq_test = TypedReq<z.infer<typeof test.schema>>;

export const testWithQuery = {
    path: '/testWithQuery',
    schema: z.object({})
};
export type tres_testWithQuery = TypedRes<{}>
export type treq_testWithQuery = TypedReq<z.infer<typeof testWithQuery.schema>>;


export const uploadCsv = {
    path: '/uploadCsv',
    schema: z.object({})
};
export type tres_uploadCsv = TypedRes<{
    successfulTitles?: string[],
    unsuccessfulTitles?: { title: string, msg: string }[],
}>
export type treq_uploadCsv = TypedReq<z.infer<typeof test.schema>>;


export const uploadTimelineCsv = {
    path: '/uploadTimelineCsv',
    schema: z.object({}),
};
export type tres_uploadTimelineCsv = TypedRes<{}>
export type treq_uploadTimelineCsv = TypedReq<z.infer<typeof test.schema>>;
