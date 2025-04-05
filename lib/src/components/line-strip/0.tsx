import React from "react";
import ReactDOM from "react-dom/client";
import 'styles/root.css';
import 'styles/theme.css';

import { LineStrip } from './LineStrip'

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<div className='w-full h-full'>
  <LineStrip
    normalizedPointsXY={
      [50, 50, 100, 100, 100, 0, 0, 100, 30, 30]
    }
    className='w-full h-full'
  />
</div>)

