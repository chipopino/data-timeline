import React from "react";
import { useCtx } from "components/context/Context";
import { createModal } from "components/modals/main/MainModal";

interface props {
    className?: string;
}

function Select({ className }: props) {

    const { m } = useCtx();

    return <div
        className={className}
    >
        <div onClick={() => {
            m.resolve(5);
            m.setTsx();
        }}>
            resolve
        </div>
    </div>
}
export const useSelectModal = createModal(Select);
