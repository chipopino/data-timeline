import { z } from "zod";


export const chartItemScheme = z.object({
    d: z.string(),
    v: z.number(),
});
export type chartItemType = z.infer<typeof chartItemScheme>;


export const chartScheme = z.object({
    title: z.string(),
    description: z.string(),
    values: z.array(chartItemScheme),
})
export type chartType = z.infer<typeof chartScheme>;


export const eventScheme = z.object({
    date: z.string(),
    title: z.string(),
})
export type eventType = z.infer<typeof eventScheme>;


export const timelineScheme = z.object({
    title: z.string(),
    description: z.string(),
    events: z.array(eventScheme),
})
export type timelineType = z.infer<typeof timelineScheme>;



