import React, {useState} from "react";
import renderDev from "shared/renderDev";
import { Context } from "components/context/Context";
import { useSelectModal } from "./Select";
import { Btn } from "components/ui/buttons/btn/Btn";
import "styles/root.css";
import "styles/theme.css";


function Poop() {
  const [t, setT] = useState<string[]>(["initial title"]);

  const selectModal = useSelectModal({
    titles: t,
    className: "bg-primary",
  });

  return (
    <div className="flex flex-col">
      {" "}
      <Btn
        onClick={() => {
          selectModal({
            titles: t,
          })
            .then((id) => {
              console.log(id);
            })
            .catch(() => {});
        }}
      >
        Click me
      </Btn>
      <Btn
        onClick={() => {
          setT((old) => [...old, "added title"]);
        }}
      >
        add title
      </Btn>
    </div>
  );
}

renderDev(
  <Context>
    <Poop />
  </Context>
);
