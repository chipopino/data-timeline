import React from "react";

interface props {
    className?: string;
}

export function Template({ className }: props) {

    return <span
        className={className}
    >
        template
    </span>
}