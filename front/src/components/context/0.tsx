import React from "react";
import renderDev from "shared/renderDev";
import 'styles/root.css';
import 'styles/theme.css';

import { Context, useCtx } from './Context'
import { Btn } from "../ui/buttons/btn/Btn";

function Poop() {
    const { m } = useCtx();

    return <Btn onClick={() => {
        m.setTsx(<span>qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq</span>)
    }}>
        Click me
    </Btn>
}
renderDev(<Context>
    <Poop />
</Context>)