import React from "react";
import { Timeline } from "./Timeline";
import "styles/root.css";
import "styles/theme.css";
import { differenceInDays } from "date-fns";

import renderDev from "shared/renderDev";

const mock = [
  {
    title: "made up event",
    date: "1948-05-13",
  },
  {
    title: "Declaration of the State of Israel",
    date: "1948-05-14",
  },
  {
    title: "Six-Day War",
    date: "1967-06-05",
  },
  {
    title: "Yom Kippur War",
    date: "1973-10-06",
  },
  {
    title: "Oslo Accords Signing",
    date: "1993-09-13",
  },
  {
    title: "Israeli Withdrawal from Gaza",
    date: "2005-08-15",
  },

];

const stdate = new Date('1948-05-13');
const endate = new Date('2005-08-15');
const timespan = differenceInDays(endate, stdate);

renderDev(
  <Timeline
    events={mock}
    startDate={stdate}
    endDate={endate}
    eventCount={10}
    timeSpan={timespan}
    daysPerEventDsp={Math.ceil(timespan/10)}
    className={"w-full h-full"}
  />
);
