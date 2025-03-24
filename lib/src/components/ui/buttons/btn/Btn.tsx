import React, { useState } from "react";
import { cn } from 'shared/methods';

const ANIMATION_DURATION = 300;

interface BtnProps {
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
}

export function Btn({ onClick, children, className }: BtnProps) {

    return <button
        className={cn(className, 'cursor-pointer')}
        onClick={onClick}
    >
        {children}
    </button>
}