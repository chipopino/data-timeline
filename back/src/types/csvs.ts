import { z } from "zod";

export const chart = z.array(
  z.object({
    d: z.string(),
    v: z.string(),
    f: z.string(),
  })
);

export const manyCharts = z.array(
  z
    .object({
      Date: z.string(),
    })
    .catchall(z.string())
);
