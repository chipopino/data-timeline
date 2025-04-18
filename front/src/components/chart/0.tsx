import React from "react";
import ReactDOM from "react-dom/client";
import 'styles/root.css';
import 'styles/theme.css';

import { Chart } from './Chart'

const mock = [
  { d: '1948-05-14', v: 0 },
  { d: '1948-05-15', v: 13 },
  { d: '1948-05-16', v: -2 },
  { d: '1948-05-17', v: 0 },
  { d: '1948-05-18', v: -4 },
  { d: '1948-05-19', v: 2 },
  { d: '1948-05-20', v: 10 },
  { d: '1948-05-21', v: 7 },

]
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<Chart
  startDate={new Date('1948-05-10')}
  endDate={new Date('1948-05-30')}
  data={mock}
  className="w-full h-full bg-secondary"
/>)

