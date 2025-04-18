import React from "react";
import { Dealer } from "./Dealer";
import { cn } from 'shared/methods';
import 'styles/root.css';
import 'styles/theme.css';

import renderDev from 'shared/renderDev';


const timelinesMock = [
    [
        {
            "title": "Declaration of the State of Israel",
            "date": "1948-05-14"
        },
        {
            "title": "Six-Day War",
            "date": "1967-06-05"
        },
        {
            "title": "Yom Kippur War",
            "date": "1973-10-06"
        },
        {
            "title": "The Camp David Accords",
            "date": "1978-09-17"
        },
        {
            "title": "Oslo Accords",
            "date": "1993-09-13"
        },
        {
            "title": "Prime Minister Yitzhak Rabin Assassination",
            "date": "1995-11-04"
        },
        {
            "title": "Gaza Disengagement Plan",
            "date": "2005-08-15"
        },
        {
            "title": "Operation Cast Lead",
            "date": "2008-12-27"
        },
        {
            "title": "Operation Protective Edge",
            "date": "2014-07-08"
        }
    ],
    [
        {
            "title": "1960",
            "date": "1960-06-05",
        },
        {
            "title": "1960",
            "date": "1960-06-05",
        },
        {
            "title": "1960",
            "date": "1960-06-05",
        },
        {
            "title": "1961",
            "date": "1961-05-14",
        },
        {
            "title": "1962",
            "date": "1962-05-13",
        },
        {
            "title": "1963",
            "date": "1963-05-13",
        }
    ],
]

const chartsMock = [
    {
        title: 'test chart title',
        values: [
            { d: '1948-05-14', v: 0 },
            { d: '1963-10-06', v: 10 },
            { d: '1972-05-13', v: -5 },
            { d: '1995-05-13', v: 0 },
        ]
    }
]

renderDev(<Dealer
    setStartDate={() => { }}
    setEndDate={() => { }}
    startDate={new Date('1948-05-14')}
    endDate={new Date('2014-07-08')}
    timelines={timelinesMock}
    charts={chartsMock}
    className={cn("w-full h-full")}
/>)