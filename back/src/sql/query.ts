// TODO: wait untill bad-words fix this: https://github.com/web-mech/badwords/issues/184

import logErr from '@/debug';
import { client } from '@/main';
// import { Filter } from 'bad-words'
import { DateTime } from "luxon";

// const filter = new Filter();

export default async function query(query: string, params?: any[]) {
    return new Promise(async (resolve, reject) => {
        client.query(query, params || []).then(result => {
            resolve(result.rows);
        }).catch(err => {
            logErr('sql', [
                { title: 'query failed', msg: err },
                { title: 'query', msg: query },
                { title: 'parameters', msg: params }
            ]);
            reject(err);
        })
    })
};

export function test() {
    return new Promise(async (resolve, reject) => {
        query('select * from poop').then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        })
    })
}

export async function postGraph(
    title: string,
    short_title: string,
    description: string,
    source: string,
    licenseName: string,
    licenseLink: string,
    dateFormat: string,
    values: { d: string, v: string }[],
) {
    return new Promise(async (resolve, reject) => {
        let correctedValues = values.map(e => {
            return { ...e, d: DateTime.fromFormat(e.d, dateFormat) }
        });
        correctedValues = correctedValues.sort((a, b) => {
            return b.d.toMillis() - a.d.toMillis()
        });
        let fin = correctedValues.map(e => {
            return { ...e, d: e.d.toISODate() }
        })
        fin = fin.filter(e => Boolean(e.v)).reverse();

        if (!fin.length) {
            reject("Empty sets are not allowd")
        } else {
            query(
                `
                INSERT INTO graphs (
                    title,
                    short_title,
                    description,
                    source,
                    license_name,
                    license_link,
                    values
                ) VALUES ($1, $2, $3, $4, $5, $6, $7)
                `,
                [
                    title,
                    short_title,
                    description,
                    source,
                    licenseName,
                    licenseLink,
                    JSON.stringify(fin),
                ]).then(result => {
                    resolve(result);
                }).catch(err => {
                    logErr('sql', [{ title: "ERROR", msg: err }])
                    reject("Dataset rejected");
                })
        }
    })

}