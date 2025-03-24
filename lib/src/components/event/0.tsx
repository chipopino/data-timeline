import React from "react";
import ReactDOM from "react-dom/client";
import 'styles/root.css';
import 'styles/theme.css';

import { EventDsp } from './EventDsp'

const mock = [
    {
        title: 'test-0',
        startDate: '',
        endDate: '',
    },
    {
        title: 'test-1 dskjbksjdg  sdkjbkj dsb kjsdks djv ',
        startDate: '',
        endDate: '',
    },
    {
        title: 'test-2',
        startDate: '',
        endDate: '',
    }
]

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<div className='flex gap-4'>
    <EventDsp events={mock} className='w-full' />
</div>)


