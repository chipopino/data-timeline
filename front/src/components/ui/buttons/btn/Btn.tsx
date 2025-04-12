import React, { useState } from "react";
import { cn } from 'shared/methods';

const ANIMATION_DURATION = 300;

interface props {
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
}

export function Btn({ onClick, children, className }: props) {

    return <button
        className={cn(className, 'cursor-pointer')}
        onClick={onClick}
    >
        {children}
    </button>
}