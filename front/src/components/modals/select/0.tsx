import React from "react";
import renderDev from "shared/renderDev";
import 'styles/root.css';
import 'styles/theme.css';

import { Context } from 'components/context/Context'
import { useSelectModal } from "./Select";
import { Btn } from 'components/ui/buttons/btn/Btn';

function Poop() {
    const selectModal = useSelectModal({ className: 'bg-primary' });

    return <Btn onClick={() => {
        selectModal().then(id => {
            console.log(id);
        }).catch(() => { });
    }}>
        Click me
    </Btn>
}

renderDev(
    <Context>
        <Poop />
    </Context>
)