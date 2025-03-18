import * as fs from 'fs';
import { parse } from 'fast-csv';
import logErr from '@/debug';

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
                console.log(`Parsed ${rows.length} rows`);
                resolve(rows);
            })
            .on('error', (err) => {
                logErr('fs', [{ 'title': "error with createReadStream", 'msg': err }]);
                reject(err);
            });
    });
}
