import React from "react";
import ReactDOM from "react-dom/client";
import 'styles/root.css';
import 'styles/theme.css';

import { Event } from './Event'

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<div className='flex gap-4'>
    <Event />
</div>)


