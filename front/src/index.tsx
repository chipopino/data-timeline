import React from "react";
import { Button } from "@mui/material";
import 'styles/root.css';

import { Event, Btn } from 'front-lib';

import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<div className='flex flex-col gap-8'>
  <Button variant="contained" color="primary">
    Hello MUI
  </Button>
  <Event />
  <Btn>POOP</Btn>
</div>);
