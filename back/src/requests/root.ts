import { NextFunction, Router } from 'express';
import * as r from '@/types/requests';
import validateReq from '@/middleware/validate';
import multer from 'multer';
import * as path from 'path';
import extractCsv from '@/methodes/csv';
import logErr from '@/debug';
import * as sql from '@/sql/query';

const router = Router();
const upload = multer({
  dest: path.join(process.env.ROOT_PATH || '', 'public/')
});

router.post(
  r.test.path,
  validateReq(r.test.schema),
  (req: r.treq_test, res: r.tres_test) => {
    res.json({});
  }
);
router.post(
  r.testWithQuery.path,
  validateReq(r.testWithQuery.schema),
  async (req: r.treq_testWithQuery, res: r.tres_testWithQuery) => {
    await sql.test();
    res.json({});
  }
);

router.post(
  r.uploadCsv.path,
  upload.single('file'),
  (req: r.treq_uploadCsv, res: r.tres_uploadCsv) => {
    if (!req.file) {
      res.status(500).json({ msg: "File upload failed" });
      return;
    }
    extractCsv(req.file.path).then(async (rows) => {

      const nonValueKeys = [
        'title',
        'short title',
        'description',
        'source',
        'license name',
        'license link',
        'date format',
      ]

      const successfull: string[] = [];
      const unsuccessfull: { title: string, msg: string }[] = [];

      for (let i in rows) {
        const values: { d: string, v: string }[] = [];
        for (const k in rows[i]) {
          if (!nonValueKeys.includes(k)) {
            values.push({ d: k, v: rows[i][k] });
          }
        }

        try {
          await sql.postGraph(
            rows[i]['title'],
            rows[i]['short title'],
            rows[i]['description'],
            rows[i]['source'],
            rows[i]['license name'],
            rows[i]['license link'],
            rows[i]['date format'],
            values
          )
          successfull.push(rows[i]['title'])
        } catch (error4Client: any) {
          unsuccessfull.push({ title: rows[i]['title'], msg: error4Client });
        }

      }

      res.json({
        successfullTitles: successfull,
        unsuccessfullTitles: unsuccessfull,
      });

    }).catch(err => {
      logErr('express', [{ 'title': "could not upload file", 'msg': err }]);
      res.status(500).json({ msg: 'File upload failure' });
    })

  });

export default router;
