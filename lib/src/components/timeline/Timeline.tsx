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
    className?: string;
}

export function Timeline({
    events,
    startDate,
    endDate,
    eventCount,
    className
}: TimelineType) {

    const [items, setItems] = useState<EventType[][]>([]);

    useEffect(() => {
        if (eventCount) {
            
            const timeSpan = differenceInDays(endDate, startDate);
            const daysPerEventDsp = Math.ceil(timeSpan / eventCount);
            const dates: any = Array.from({ length: eventCount }, () => []);
            
            for (let i in events) {
                const date = new Date(events[i].date + '');
                if (date >= startDate && date <= endDate) {
                    const diff = differenceInDays(date, startDate);
                    const fin = Math.floor(diff / daysPerEventDsp);
                    dates[fin].push(events[i]);
                }
            }

            setItems(dates);
        }
    }, [eventCount])

    return <div className={cn(className, 'flex flex-col')}>
        {items.map((e, i) =>
            <EventDsp
                key={`key_timeline_events_${i}`}
                className='w-full border-b h-full'
                events={e}
            />)}
    </div>
}