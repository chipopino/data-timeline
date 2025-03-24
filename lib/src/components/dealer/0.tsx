import React from "react";
import { Dealer } from "./Dealer";
import { cn } from 'shared/methods';
import 'styles/root.css';
import 'styles/theme.css';

import renderDev from 'shared/renderDev';

const mock = [
    [
        {
            "title": "Six-Day War",
            "date": "1967-06-05",
        }
        ,
        {
            "title": "Declaration of the State of Israel",
            "date": "1948-05-14",
        },
        {
            "title": "made up event",
            "date": "1948-05-13",
        },
        {
            "title": "made up event 2",
            "date": "1950-05-13",
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

renderDev(<Dealer
    eventDecks={mock}
    className={cn(
        "w-full h-full flex",
        'border [&>*:not(:first-child)]:border-l',
    )}
/>)