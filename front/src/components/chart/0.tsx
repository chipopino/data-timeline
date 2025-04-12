import React from "react";
import ReactDOM from "react-dom/client";
import 'styles/root.css';
import 'styles/theme.css';

import { Chart } from './Chart'

const mock = [
  { d: '1948-05-14', v: 0 },
  { d: '1948-05-15', v: 20 },
  { d: '1948-05-16', v: -20 },
  { d: '1948-05-17', v: 0 },
]
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<Chart
  startDate={new Date('1948-05-14')}
  endDate={new Date('1948-05-17')}
  data={mock}
  className="w-full h-full bg-secondary"
/>)

