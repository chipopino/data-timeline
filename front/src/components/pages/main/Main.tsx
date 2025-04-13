import React, { useState } from "react";
import { cn } from "shared/methods";
import { Dealer } from "components/dealer/Dealer";
import { Btn } from "components/ui/buttons/btn/Btn";
import { usePost } from "hooks/useFetch";
import { useSelectModal } from "components/modals/select/Select";
import * as t from "lib";

interface props {
  className?: string;
}

export function Main({ className }: props) {
  const [charts, setCharts] = useState([]);
  const [timelines, setTimelines] = useState([]);
  const { post, isError, isLoading, isSuccess } = usePost();
  const selectModal = useSelectModal({
    titles: [],
    className: "bg-primary",
  });

  return (
    <div className={cn(className, "flex flex-col")}>
      <Dealer timelines={timelines} charts={charts} className="w-full h-full" />
      <div className="flex w-full gap-8 p-2">
        <Btn>Add timeline</Btn>
        <Btn>Add chart</Btn>

        <Btn
          onClick={() => {
            post(t.getTimelineTitles.path, {}).then((res) => {
              selectModal({
                titles: res,
              })
                .then((title) => {
                  post(t.getTimelineByTitle.path, { title }).then(
                    (timeline) => {
                      console.log(timeline);
                      setTimelines((old) => [...old, timeline]);
                    }
                  );
                })
                .catch((err) => {
                  console.log(err);
                });
            });
          }}
        >
          Get timelines
        </Btn>

        <Btn
          onClick={() => {
            post(t.getChartTitles.path, {}).then((res) => {
              selectModal({
                titles: res,
              })
                .then((title) => {
                  post(t.getChartByTitle.path, { title }).then((chart) => {
                    setCharts((old) => [...old, chart]);
                  });
                })
                .catch(() => {});
            });
          }}
        >
          Get charts
        </Btn>
      </div>
    </div>
  );
}
