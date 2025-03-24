import React, { useState } from 'react';
import { Btn } from 'components/ui/buttons/btn/Btn';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { EventType } from 'types/interfaces';
import { cn } from 'shared/methods';
import { EVENT_HEIGHT } from 'src/shared/constants';

interface EventsType {
    events: EventType[];
    className?: string;
}

export function EventDsp({ events, className }: EventsType) {

    const [index, setIndex] = useState<number>(0);

    const isLastEvent = index === events.length - 1;
    const isFirstEvent = !index;
    const noBtns = events.length < 2;

    function nextEvent() {
        !isLastEvent && setIndex(old => old + 1)
    }
    function prevEvent() {
        !isFirstEvent && setIndex(old => old - 1)
    }

    return <div className={cn(
        className,
        'flex justify-between bg-secondary'
    )}>
        {!noBtns && <Btn
            className={cn(
                'rotate-180 z-10',
                isLastEvent && 'invisible cursor-default pointer-events-none',
            )}
            onClick={nextEvent}
        >
            <ArrowRightIcon />
        </Btn>}
        <div className='relative w-full h-full text-center overflow-hidden'>
            {events.map((e, i) =>
                <span key={`event_key_23526_${i}`}
                    style={{ transform: `translateX(${100 * (index - i)}%)` }}
                    className={cn(
                        'w-full h-full whitespace-nowrap overflow-hidden',
                        'transition-transform duration-300',
                        'absolute top-0 left-0 w-full h-full',
                        'grid-center text-white'
                    )}
                >
                    {e.title}
                </span>
            )}
        </div>
        {!noBtns && <Btn
            className={cn(
                isFirstEvent && 'invisible cursor-default pointer-events-none',
            )}
            onClick={prevEvent}
        >
            <ArrowRightIcon />
        </Btn>}
    </div>
}