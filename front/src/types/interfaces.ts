export interface EventType {
    title: string;
    date: string;
}
export interface timelineType {
    title: string;
    description?: string;
    events: EventType[];
}

export interface ChartItemType {
    d: string;
    v: number;
}

export interface chartType {
    title: string;
    description?: string;
    values: ChartItemType[]
}

