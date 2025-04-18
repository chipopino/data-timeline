import dotenv from 'dotenv';
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from "cors";
import mainRoutes from '@/requests/root';
import chart_router from '@/requests/charts';
import timeline_router from '@/requests/timelines';
import logErr, { Err } from '@/debug';

dotenv.config();

export const setupMiddleware = (app: Express) => {

    app.use(cors());

    app.use(express.json());

    app.use('/', mainRoutes);
    app.use('/', chart_router);
    app.use('/', timeline_router);

    app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
        const isErr = err instanceof Err;

        logErr(isErr ? err.id : 'express', [
            { title: 'name', msg: err.name },
            { title: 'stack', msg: err.stack },
            { title: 'body', msg: JSON.stringify(req.body) },
            { title: 'method', msg: req.method },
            { title: 'url', msg: req.url },
            { title: 'originalUrl', msg: req.originalUrl },
            { title: 'params', msg: JSON.stringify(req.params) },
            { title: 'query', msg: JSON.stringify(req.query) },
            { title: 'protocol', msg: req.protocol },
            { title: 'hostname', msg: req.hostname },
            { title: 'cookies', msg: req.cookies },
            { title: 'headers', msg: req.headers },
            { title: 'ip', msg: req.ip },
            ...(isErr ? [
                { title: 'WHAT HAPPENED ?', msg: err.serverMsg },
                ...(err.serverMsgs || [])
            ] : []),
        ]);

        res.status(500).send({
            clientMsg: isErr ? err.clientMsg : 'An error has occurred'
        });

        next(err);
    });

};
