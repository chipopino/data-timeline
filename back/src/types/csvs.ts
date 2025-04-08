import { z } from "zod";

export const chart = z.array(
  // d,                   v,                  f
  // input-title,         input-description,  input-date-format
  // date,                value,
  
  // example:
  // d,           v,           f
  // SP500,       lalala,      yyyy-mm-dd
  // 1999-01-01   20.26
  // 1999-01-02   40.5

  z.object({
    d: z.string(),
    v: z.string(),
    f: z.string(),
  })
);
