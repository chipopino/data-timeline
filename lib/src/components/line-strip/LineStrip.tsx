import React from "react";

interface props {
    normalizedPointsXY: number[];
    className?: string;
}

function move(x: number, y: number) {
    return ` M${x} ${y} `
}
function line(x: number, y: number) {
    return ` L${x} ${y} `
}
function lineStrip(points: number[]) {
    if (points.length % 2 === 1) {
        return "";
    }
    const fin = [];
    for (let i = 0; i < points.length / 2; i++) {
        fin.push({ x: points[i * 2], y: points[i * 2 + 1] });
    }
    return `${fin.map((e, i) => {
        return i === 0 ? move(e.x, e.y) : line(e.x, e.y);
    })}`;
}

export function LineStrip({
    normalizedPointsXY,
    className
}: props) {
    return <svg
        className={className}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d={lineStrip(normalizedPointsXY)}
            stroke="black"
            fill="none"
            strokeWidth="0.3"
        />
    </svg>
}