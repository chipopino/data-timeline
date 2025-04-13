import { Router } from "express";
import fs from "fs";

import validateReq from "@/middleware/validate";
import multer from "multer";
import extractCsv, { validateRows } from "@/methodes/csv";
import logErr from "@/debug";
import { isValidNumber } from "@/methodes/methodes";

import * as path from "path";
import * as t from "front-lib";
import * as c from "@/types/csvs";
import * as sql from "@/sql/query";

const router = Router();
const upload = multer({
  dest: path.join(process.env.ROOT_PATH || "", "public/"),
});

router.post(
  t.test.path,
  validateReq(t.test.schema),
  // @ts-ignore
  (req: t.treq_test, res: t.tres_test) => {
    console.log("request body", req.body);
    res.json({});
  }
);
router.post(
  t.testWithQuery.path,
  validateReq(t.testWithQuery.schema),
  // @ts-ignore
  async (req: t.treq_testWithQuery, res: t.tres_testWithQuery) => {
    console.log("TEST REQUEST");
    res.json({});
  }
);

router.post(
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

router.post(
  t.uploadChartCsv.path,
  upload.single("file"),
  // @ts-ignore
  async (req: t.treq_uploadChartCsv, res: t.tres_uploadChartCsv) => {
    const rows = await extractCsv(req.file?.path || "");
    fs.unlinkSync(req.file?.path || "");
    const data = rows.slice(1);
    validateRows(data, c.chart);

    const successfulRows: { d: string; v: number }[] = [];
    const unsuccessfulRows: { d: string; v: any }[] = [];
    data.forEach((e) => {
      if (isValidNumber(e.v)) {
        successfulRows.push({
          d: e.d,
          v: parseFloat(e.v),
        });
      } else {
        unsuccessfulRows.push({ d: e.d, v: e.v });
      }
    });
    await sql.postChart(rows[0].d, rows[0].v, rows[0].f, successfulRows);

    res.json({ clientMsg: "Successfully uploaded chart" });
  }
);

router.post(
  t.getChartTitles.path,
  validateReq(t.getChartTitles.schema),
  // @ts-ignore
  async (req: t.treq_getChartTitles, res: t.tres_getChartTitles) => {
    const titles = await sql.getChartTitles();
    res.json(titles);
  }
);

router.post(
  t.getTimelineTitles.path,
  validateReq(t.getTimelineTitles.schema),
  // @ts-ignore
  async (req: t.treq_getTimelineTitles, res: t.tres_getTimelineTitles) => {
    const titles = await sql.getTimelineTitles();
    res.json(titles);
  }
);


router.post(
  t.getChartByTitle.path,
  validateReq(t.getChartByTitle.schema),
  // @ts-ignore
  async (req: t.treq_getChartByTitle, res: t.tres_getChartByTitle) => {
    const { title } = req.body;
    const chart = await sql.getChartByTitle(title);
    res.json(chart);
  }
);

router.post(
  t.getTimelineByTitle.path,
  validateReq(t.getTimelineByTitle.schema),
  // @ts-ignore
  async (req: t.treq_getTimelineByTitle, res: t.tres_getTimelineByTitle) => {
    const { title } = req.body;
    const timeline = await sql.getTimelineByTitle(title);
    console.log("AAAAAAAAAA", timeline);
    res.json(timeline);
  }
);


export default router;
