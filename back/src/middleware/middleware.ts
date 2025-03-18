import logErr from '@/debug';
import express, { Express } from 'express';
import { Request, Response, NextFunction } from 'express';
import mainRoutes from '@/requests/root'


export const setupMiddleware = (app: Express) => {

    app.use(express.json());

    app.use('/', mainRoutes);

    app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {

        logErr('express', [
            { title: 'name', msg: err.name },
            { title: 'stack', msg: err.stack },
            { title: 'body', msg: req.body },
            { title: 'method', msg: req.method },
            { title: 'url', msg: req.url },
            { title: 'originalUrl', msg: req.originalUrl },
            { title: 'params', msg: req.params },
            { title: 'query', msg: req.query },
            { title: 'protocol', msg: req.protocol },
            { title: 'hostname', msg: req.hostname },
            { title: 'cookies', msg: req.cookies },
            { title: 'headers', msg: req.headers },
            { title: 'ip', msg: req.ip },
            // { title: 'request session', msg: req.session },
        ])
        // if (res.headersSent) return next(err);
        res.status(500).send({ success: false });
        next(err);
    });
};