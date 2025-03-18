import React from "react";

interface BtnProps {
    children: React.ReactNode;
}

export function Btn({ children }: BtnProps) {
    return <button>{children}</button>
}