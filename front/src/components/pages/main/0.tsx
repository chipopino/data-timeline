import React from "react";
import renderDev from "shared/renderDev";
import { Context } from "components/context/Context";
import "styles/root.css";
import "styles/theme.css";

import { Main } from "./Main";

renderDev(
  <Context>
    <Main className="bg-primary w-full h-full" />
  </Context>
);
