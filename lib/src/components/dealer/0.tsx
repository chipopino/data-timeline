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
            "date": "1967-06-05"
        },
        {
            "title": "Declaration of the State of Israel",
            "date": "1948-05-14"
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

renderDev(<Dealer
    eventDecks={mock}
    className={cn(
        "w-full h-full",
        '',
    )}
/>)