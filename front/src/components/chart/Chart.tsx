import React, { useState } from "react";
import { addDays, differenceInDays } from "date-fns";
import { LineStrip } from "../line-strip/LineStrip";
import { cn } from "shared/methods";

interface props {
    startDate: Date;
    endDate: Date;
    title: string;
    data: { d: string, v: number }[];
    className?: string;
}

export function Chart({
    startDate,
    endDate,
    title,
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
        fin.push(((result[i].x - minValues) / (greaterAbs - minValues)) * 100);
        fin.push(result[i].y);
    }

    return <div className={cn("relative", className)}>
        <span className="absolute top-0 left-0 text-chart-text z-10">{title}</span>
        <LineStrip
            normalizedPointsXY={fin}
            className={'w-full h-full absolute top-0 left-0'}
        />
    </div>
}
