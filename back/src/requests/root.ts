import { Router } from "express";
import fs from 'fs';

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
    await sql.test();
    res.json({});
  }
);

// router.post(
//   t.uploadCsv.path,
//   upload.single("file"),
//   // @ts-ignore
//   (req: t.treq_uploadCsv, res: t.tres_uploadCsv) => {
//     if (!req.file) {
//       res.status(500).json({ clientMsg: "File upload failed" });
//       return;
//     }
//     extractCsv(req.file.path)
//       .then(async (rows) => {
//         const nonValueKeys = [
//           "title",
//           "description",
//           "date format",
//         ];

//         const successful: string[] = [];
//         const unsuccessful: { title: string; msg: string }[] = [];

//         for (let i in rows) {
//           const values: { date: string; value: string }[] = [];
//           for (const k in rows[i]) {
//             if (!nonValueKeys.includes(k)) {
//               values.push({ date: k, value: rows[i][k] });
//             }
//           }

//           try {
//             await sql.postChart(
//               rows[i]["title"],
//               rows[i]["description"],
//               rows[i]["date format"],
//               values
//             );
//             successful.push(rows[i]["title"]);
//           } catch (error4Client: any) {
//             unsuccessful.push({ title: rows[i]["title"], msg: error4Client });
//           }
//         }

//         res.json({
//           successfulTitles: successful,
//           unsuccessfulTitles: unsuccessful,
//         });
//       })
//       .catch((err) => {
//         logErr("express", [{ title: "could not upload file", msg: err }]);
//         res.status(500).json({ clientMsg: "File upload failure" });
//       });
//   }
// );

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
        await sql.postTimeline(rows[0].a, rows[0].b.split(","), rows.slice(2));

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

    const rows = await extractCsv(req.file?.path || '');
    fs.unlinkSync(req.file?.path || '');
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
    await sql.postChart(
      rows[0].d,
      rows[0].v,
      rows[0].f,
      successfulRows
    );

    res.json({ clientMsg: 'Successfully uploaded chart' });
  }
);



export default router;
