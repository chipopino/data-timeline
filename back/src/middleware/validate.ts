import { Request, Response, NextFunction } from 'express';

export default function validateReq(schema: any) {
    return (req: Request, res: Response, next: NextFunction): void => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            res.status(422).json({ success: false });
            return;
        }
        next();
    };
}
