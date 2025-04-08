import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from "zod";

export default function validateReq(schema: ZodSchema) {
    return (req: Request, res: Response, next: NextFunction): void => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            res.status(500).json({ 
              clientMsg: 'Something went wrong'
            });
            return;
        }
        //res.status(500);
        next();
    };
}
