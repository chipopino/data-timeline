import React, { useState, useEffect } from 'react';
import { differenceInDays } from "date-fns";
import { EventDsp } from 'components/event/EventDsp';
import { EventType } from 'types/interfaces';
import { cn } from 'shared/methods';

interface TimelineType {
    events: EventType[];
    startDate: Date;
    endDate: Date;
    eventCount: number;
    timeSpan: number;
    daysPerEventDsp: number;
    className?: string;
}

export function Timeline({
    events,
    startDate,
    endDate,
    eventCount,
    timeSpan,
    daysPerEventDsp,
    className
}: TimelineType) {

    const [items, setItems] = useState<EventType[][]>([]);

    useEffect(() => {
        if (eventCount) {
            const dates: any = Array.from({ length: eventCount }, () => []);
            for (let i in events) {
                const date = new Date(events[i].date + '');
                if (date >= startDate && date <= endDate) {
                    const diff = differenceInDays(date, startDate);
                    const fin = Math.floor(diff / daysPerEventDsp);
                    dates[fin].push(events[i]);
                    dates[fin] = dates[fin].sort(
                        (a: EventType, b: EventType) =>
                            differenceInDays(b.date + '', a.date + '')
                    );
                }
            }
            setItems(dates);
        }
    }, [eventCount, startDate, endDate, timeSpan])

    return <div className={cn(className, 'flex flex-col [&>*:not(:last-child)]:border-b')}>
        {items.map((e, i) =>
            <EventDsp
                key={`key_timeline_events_${i}`}
                className='w-full h-full'
                events={e}
            />)}
    </div>
}