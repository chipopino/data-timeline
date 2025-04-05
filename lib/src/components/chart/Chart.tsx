import React, { useState } from "react";
import { addDays, differenceInDays } from "date-fns";
import { LineStrip } from "../line-strip/LineStrip";

const ANIMATION_DURATION = 300;

interface props {
    startDate: Date;
    endDate: Date;
    data: { d: string, v: number }[];
    className?: string;
}

export function Chart({
    startDate,
    endDate,
    data,
    className,
}: props) {
    const timeSpan = differenceInDays(endDate, startDate);

    let result: { x: number, y: number }[] = [];
    let maxValues: number | undefined = undefined;
    let minValues: number | undefined = undefined;

    data.forEach(e => {
        const date = new Date(e.d);

        if (date >= addDays(startDate, -timeSpan) && date <= addDays(endDate, timeSpan)) {

            const y = differenceInDays(date, startDate) / timeSpan * 100;

            if (maxValues === undefined) {
                maxValues = e.v;
            } else {
                if (e.v > maxValues) maxValues = e.v;
            }

            if (minValues === undefined) {
                minValues = e.v;
            } else {
                if (e.v < minValues) minValues = e.v;
            }

            result.push({ x: e.v, y });
        }
    })

    const noJsx = <div className={className} />
    if (maxValues === undefined || minValues === undefined) return noJsx;
    if (maxValues === 0 && minValues === 0) return noJsx;

    let greaterAbs = 0;
    if (Math.abs(maxValues) > Math.abs(minValues)) {
        greaterAbs = Math.abs(maxValues);
    } else {
        greaterAbs = Math.abs(minValues);
    }

    const absMin = Math.abs(minValues);

    const fin = [];
    for (let i = 0; i < result.length; i++) {
        fin.push(((result[i].x + absMin) / (greaterAbs + absMin)) * 100);
        fin.push(result[i].y);
    }

    return <LineStrip
        normalizedPointsXY={fin}
        className={className}
    />
}