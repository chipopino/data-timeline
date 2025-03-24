import React, { useState, useEffect, useRef } from 'react';
import { Timeline } from 'components/timeline/Timeline';

import { EVENT_HEIGHT } from 'shared/constants';
import { EventType } from 'types/interfaces';

interface DealerProps {
    eventDecks: EventType[][];
    className?: string;
}

export function Dealer({ eventDecks, className }: DealerProps) {

    const divRef = useRef<HTMLDivElement>(null);
    const [eventCount, setEventCount] = useState(0);

    useEffect(() => {
        if (!divRef.current) return;

        const observer = new ResizeObserver(([entry]) => {
            setEventCount(Math.floor(
                entry.contentRect.height / EVENT_HEIGHT
            ) - 1);
        });

        observer.observe(divRef.current);

        return () => observer.disconnect();
    }, []);

    const startDate = new Date('1948-05-13');
    const endDate = new Date('1967-06-06');

    return <div
        ref={divRef}
        className={className}
    >
        {eventDecks.map((e, i) =>
            <Timeline
                key={`key_eventDocks_28375623875_${i}`}
                events={e}
                startDate={startDate}
                endDate={endDate}
                eventCount={eventCount}
                className={'w-full'}
            />
        )}
    </div>
}