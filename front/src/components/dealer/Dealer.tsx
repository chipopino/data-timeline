import React, { useState, useEffect, useRef, useCallback } from "react";
import { addDays, differenceInDays } from "date-fns";
import { Timeline } from "components/timeline/Timeline";
import { Chart } from "components/chart/Chart";

import { EVENT_HEIGHT } from "shared/constants";
import { timelineType, chartType } from "types/interfaces";
import { cn } from "src/shared/methods";

interface DealerProps {
  timelines: timelineType[];
  charts: chartType[];
  className?: string;
  startDate: Date
  endDate: Date;
  setStartDate: any;
  setEndDate: any;
}
interface InnerDealerProps {
  timelines: timelineType[];
  charts: chartType[];
  className?: string;
  height: number;
  startDate: Date
  endDate: Date;
  setStartDate: any;
  setEndDate: any;
}

export function Dealer(props: DealerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<null | number>(null);

  useEffect(() => {
    if (!ref.current) return;

    setHeight(Math.ceil(ref.current.clientHeight));
    const observer = new ResizeObserver(([entry]) => {
      setHeight(Math.floor(entry.contentRect.height));
    });
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={"w-full h-full"}>
      {height && (
        <InnerDealer {...props} height={height} className="w-full h-full" />
      )}
    </div>
  );
}

function InnerDealer({
  timelines,
  charts,
  className,
  height,
  startDate,
  endDate,
  setStartDate,
  setEndDate
}: InnerDealerProps) {
  const mainRef = useRef<HTMLDivElement>(null);

  //const [startDate, setStartDate] = useState<Date>(new Date("1948-01-01"));
  //const [endDate, setEndDate] = useState<Date>(new Date("1999-06-06"));
  const timeSpan = differenceInDays(endDate, startDate);

  const eventCount = Math.ceil(height / EVENT_HEIGHT);
  const daysPerEventDsp = Math.ceil(timeSpan / eventCount) || 0;

  const wheelEvent = useCallback(
    (event: WheelEvent) => {
      const movement = daysPerEventDsp;
      const delta = event.deltaY > 0 ? movement : -movement;
      setStartDate((old: any) => addDays(old, event.shiftKey ? -delta : delta));
      setEndDate((old: any) => addDays(old, delta));
    },
    [daysPerEventDsp]
  );

  useEffect(() => {
    if (!mainRef.current) return;
    const element = mainRef.current;
    element.addEventListener("wheel", wheelEvent);
    return () => element.removeEventListener("wheel", wheelEvent);
  }, [wheelEvent]);

  return (
    <div
      ref={mainRef}
      className={cn(className, "flex border [&>*:not(:first-child)]:border-l")}
    >
      {timelines.map((e, i) => (
        <Timeline
          key={`key_timelines_28375623875_${i}`}
          events={e.events}
          startDate={startDate}
          endDate={endDate}
          eventCount={eventCount}
          timeSpan={timeSpan}
          daysPerEventDsp={daysPerEventDsp}
          className={"w-full h-full"}
        />
      ))}
      {charts.map((e, i) => (
        <Chart
          key={`key_charts_29378569236593_${i}`}
          startDate={startDate}
          endDate={endDate}
          title={e.title}
          data={e.values}
          className="w-full h-full bg-secondary"
        />
      ))}
    </div>
  );
}
