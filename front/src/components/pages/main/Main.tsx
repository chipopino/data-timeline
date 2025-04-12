import React, { useState } from "react";
import { cn } from "shared/methods";
import { Dealer } from "components/dealer/Dealer";
import { Btn } from "components/ui/buttons/btn/Btn";
import { usePost } from "hooks/useFetch";

interface props {
    className?: string;
}

export function Main({ className }: props) {

    const { post, isError, isLoading, isSuccess } = usePost();

    const [charts, setCharts] = useState([]);

    return <div
        className={cn(
            className,
            'flex flex-col'
        )}
    >
        <Dealer
            timelines={[]}
            charts={charts}
            className="w-full h-full"
        />
        <div className="flex w-full gap-8 p-2">
            <Btn >Add timeline</Btn>
            <Btn >Add chart</Btn>
            <Btn >Get timelines</Btn>
            <Btn >Get charts</Btn>
        </div>
    </div>
}