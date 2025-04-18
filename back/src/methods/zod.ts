import { Err } from "@/debug";

import { ZodSchema, ZodError } from 'zod';

export function parseSchema<T>(schema: ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Err('zod', 'data did not match schema', [{
      title: 'zod error',
      msg: result.error.errors
    }]);
  }
  return result.data;
}
