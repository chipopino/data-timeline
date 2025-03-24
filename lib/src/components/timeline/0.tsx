import React from "react";
import { Timeline } from "./Timeline";
import 'styles/root.css';
import 'styles/theme.css';

import renderDev from 'shared/renderDev';

const mock = [
    [
        {
            "title": "Declaration of the State of Israel",
            "date": "1948-05-14",
        },
        {
            "title": "made up event",
            "date": "1948-05-13",
        }
    ],
    [{
        "title": "Six-Day War",
        "date": "1967-06-05",
    }],
    [{
        "title": "Yom Kippur War",
        "date": "1973-10-06",
    }],
    [{
        "title": "Israeli Withdrawal from Gaza",
        "date": "2005-08-15",
    }],
    [{
        "title": "Oslo Accords Signing",
        "date": "1993-09-13",
    }]
]

// renderDev(<Timeline events={mock} />)