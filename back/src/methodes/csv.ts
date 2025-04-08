import * as fs from 'fs';
import { parse } from 'fast-csv';
import { Err } from '@/debug';
import { ZodTypeAny } from 'zod';

export default function extractCsv(fileName: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
        const rows: any[] = [];

        fs.createReadStream(fileName)
            .pipe(parse({
                headers: true,
                delimiter: ',',
                trim: true,
            }))
            .on('data', (row) => {
                rows.push(row);
            })
            .on('end', () => {
                resolve(rows);
            })
            .on('error', (err) => {
                reject(new Err('csvParse', err));
            });
    });
}

export function validateRows(rows: any, schema: ZodTypeAny) {
    const r = schema.safeParse(rows);
    if (!rows || !rows?.length) throw new Err('csvFormat');
    if (!r.success) throw new Err('csvFormat');
}
