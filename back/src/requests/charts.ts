import { Router } from "express";
import fs from "fs";
import validateReq from "@/middleware/validate";
import extractCsv, { validateRows } from "@/methods/csv";
import logErr from "@/debug";
import { isValidNumber } from "@/methods/methods";
import { upload } from "@/constants";
import * as t from "front-lib";
import * as c from "@/types/csvs";
import * as sql from '@/sql/charts';

const chart_router = Router();


chart_router.post(
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

chart_router.post(
  t.getChartTitles.path,
  validateReq(t.getChartTitles.schema),
  // @ts-ignore
  async (req: t.treq_getChartTitles, res: t.tres_getChartTitles) => {
    const titles = await sql.getChartTitles();
    res.json(titles);
  }
);

chart_router.post(
  t.getChartByTitle.path,
  validateReq(t.getChartByTitle.schema),
  // @ts-ignore
  async (req: t.treq_getChartByTitle, res: t.tres_getChartByTitle) => {
    const { title } = req.body;
    const chart = await sql.getChartByTitle(title);
    res.json(chart);
  }
);

chart_router.post(
  t.uploadChartsCsv.path,
  upload.single("file"),
  // @ts-ignore
  async (req: t.treq_uploadChartsCsv, res: t.tres_uploadChartsCsv) => {
    const rows = await extractCsv(req.file?.path || "");
    validateRows(rows, c.manyCharts);

    const header = rows.slice(0, 9);
    const data = rows.slice(10, rows.length - 1);

    let template: any = Object.keys(rows[0]).map((e: any) => {
      return {
        title: e,
        description: header[0][e],
        values: []
      }
    })
    template = template.slice(1, template.length - 1);

    data.forEach((e: any) => {
      template.forEach((q: any, i: number) => {
        if (q.title !== 'Date') {
          if (isValidNumber(e[q.title])) {
            q.values.push({ d: e["Date"], v: parseFloat(e[q.title]) })
          }
        }
      })
    })

    fs.unlinkSync(req.file?.path || "");

    const unsuccessful: string[] = [];

    for (const e of template) {
      try {
        await sql.postChart(e.title, e.description, "yyyy-MM-dd", e.values);
      } catch (err) {
        logErr(
          'csvFormat',
          [{ title: 'failed uploading csv chart', msg: err }],
          'expected'
        );
        unsuccessful.push(e.title);
      }
    }

    const clientMsg = unsuccessful.length ?
      `Charts that couldn't be uploaded: ${unsuccessful.join(', ')}` :
      'Successfully uploaded all charts'

    res.json({ clientMsg });
  }
);
export default chart_router;
