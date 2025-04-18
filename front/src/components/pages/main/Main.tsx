import React, { useState } from "react";
import { cn } from "shared/methods";
import { Dealer } from "components/dealer/Dealer";
import { Btn } from "components/ui/buttons/btn/Btn";
import { usePost } from "hooks/useFetch";
import { useSelectModal } from "components/modals/select/Select";
import * as t from "lib";
import { chartType, timelineType } from "types/interfaces";

interface props {
  className?: string;
}

export function Main({ className }: props) {
  const [startDate, setStartDate] = useState<Date>(new Date("1948-01-01"));
  const [endDate, setEndDate] = useState<Date>(new Date("1999-06-06"));
  const [charts, setCharts] = useState<chartType[]>([]);
  const [timelines, setTimelines] = useState<timelineType[]>([]);
  const { post, isError, isLoading, isSuccess } = usePost();
  const selectModal = useSelectModal({
    titles: [],
    className: "bg-primary",
  });

  return (
    <div className={cn(className, "flex flex-col")}>
      <Dealer
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        timelines={timelines}
        charts={charts}
        className="w-full h-full"
      />
      <div className="flex w-full gap-8 p-2">
        <Btn>Add timeline</Btn>
        <Btn>Add chart</Btn>

        <Btn
          onClick={() => {
            post<t.req_getTimelineTitles, t.res_getTimelineTitles>(
              t.getTimelineTitles.path, {}
            ).then(res => {
              selectModal({
                titles: res,
              })
                .then(title => {
                  post<t.req_getTimelineByTitle, t.res_getTimelineByTitle>(
                    t.getTimelineByTitle.path, { title }
                  ).then(timeline => {
                    setTimelines(old => [...old, timeline]);
                  });
                })
                .catch((err) => {
                  // TODO
                  console.log(err);
                });
            });
          }}
        >
          Get timelines
        </Btn>

        <Btn
          onClick={() => {
            post<t.req_getChartTitles, t.res_getChartTitles>(
              t.getChartTitles.path, {}
            ).then(res => {
              selectModal({
                titles: res,
              })
                .then(title => {
                  post<t.req_getChartByTitle, t.res_getChartByTitle>(
                    t.getChartByTitle.path, { title }
                  ).then(chart => {
                    console.log(chart)
                    setStartDate(new Date(chart.values[0].d));
                    setEndDate(new Date(chart.values[chart.values.length - 1].d));
                    setCharts(old => [...old, chart]);
                  });
                })
                .catch(() => { });
            });
          }}
        >
          Get charts
        </Btn>
      </div>
    </div>
  );
}
