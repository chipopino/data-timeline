import { Router } from "express";
import validateReq from "@/middleware/validate";
import extractCsv from "@/methods/csv";
import logErr from "@/debug";
import { upload } from "@/constants";
import * as t from "front-lib";
import * as sql from '@/sql/timelines';

const timeline_router = Router();


timeline_router.post(
    t.uploadTimelineCsv.path,
    upload.single("file"),
    // @ts-ignore
    (req: t.treq_uploadCsv, res: t.tres_uploadCsv) => {
        if (!req.file) {
            res.status(500).json({ clientMsg: "File upload failed" });
            return;
        }
        extractCsv(req.file.path)
            .then(async (rows) => {
                await sql.postTimeline(rows[0].title, rows[0].date.split(","), rows.slice(2));

                res.json({});
            })
            .catch((err) => {
                logErr("express", [{ title: "could not upload file", msg: err }]);
                res.status(500).json({ clientMsg: "File upload failure" });
            });
    }
);

timeline_router.post(
    t.getTimelineTitles.path,
    validateReq(t.getTimelineTitles.schema),
    // @ts-ignore
    async (req: t.treq_getTimelineTitles, res: t.tres_getTimelineTitles) => {
        const titles = await sql.getTimelineTitles();
        res.json(titles);
    }
);

timeline_router.post(
    t.getTimelineByTitle.path,
    validateReq(t.getTimelineByTitle.schema),
    // @ts-ignore
    async (req: t.treq_getTimelineByTitle, res: t.tres_getTimelineByTitle) => {
        const { title } = req.body;
        const timeline = await sql.getTimelineByTitle(title);
        res.json(timeline);
    }
);

export default timeline_router;
