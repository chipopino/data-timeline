import React from "react";
import ReactDOM from "react-dom/client";
import 'styles/root.css';
import 'styles/theme.css';

import { Loader } from './Loader'

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<Loader />)

