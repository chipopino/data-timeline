import React from "react";
import { useCtx } from "components/context/Context";
import { createModal } from "components/modals/main/MainModal";
import { Btn } from "components/ui/buttons/btn/Btn";
import { cn } from "shared/methods";

interface props {
  titles: string[];
  className?: string;
}

function Select({ className, titles }: props) {
  const { m } = useCtx();

  return (
    <div className={cn(className, "flex flex-col gap-4")}>
      {titles.map((e, i) => (
        <Btn
          key={`key_title_btn_7234538295_${i}`}
          onClick={() => {
            m.resolve(e);
          }}
        >
          {e}
        </Btn>
      ))}
    </div>
  );
}
export const useSelectModal = createModal<props, string>(Select);
