// TODO: wait untill bad-words fix this: https://github.com/web-mech/badwords/issues/184

import logErr, { Err } from '@/debug';
import { client } from '@/main';
// import { Filter } from 'bad-words'
import { DateTime } from "luxon";
import { sortChartByDates } from '@/methodes/methodes';

// const filter = new Filter();

export default function query(query: string, params?: any[]) {
    return new Promise(async (resolve, reject) => {
        client.query(query, params || []).then(result => {
            resolve(result.rows);
        }).catch(err => {
            reject(new Err('sql', 'query failed', [
                { title: 'error', msg: err },
                { title: 'query', msg: query },
                { title: 'parameters', msg: params }
            ]));
        })
    })
};

export async function test() {
    return await query('select * from poop');
}

export async function postChart(
    title: string,
    description: string,
    dateFormat: string,
    values: { d: string, v: number }[],
) {
    const sortedValues = sortChartByDates(values, dateFormat);

    if (!sortedValues.length) {
        throw new Err('emptySet');
    }
    return await query(
        `
        INSERT INTO charts (
            title,
            description,
            values
        ) VALUES ($1, $2, $3)
        `,
        [
            title,
            description,
            JSON.stringify(sortedValues),
        ])
}


export async function postTimeline(
    title: string,
    tags: string[],
    events: { title: string, date: string }[],
) {
    return await query(
        `
        INSERT INTO timelines (
            title,
            tags,
            events
        ) VALUES ($1, $2, $3)
        `,
        [
            title,
            tags,
            JSON.stringify(events),
        ])
}