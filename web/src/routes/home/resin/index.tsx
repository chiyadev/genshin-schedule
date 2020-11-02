import React, { memo, useState } from "react";
import { useConfig } from "../../../configs";
import Heading from "../heading";
import Body from "./body";

export function formatDateSimple(date: Date) {
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");

  return `${hour}:${minute}`;
}

const ResinCalc = () => {
  const [hidden] = useConfig("hiddenWidgets");
  const [hover, setHover] = useState(false);

  return (
    <div
      className="space-y-4"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Heading type="resin">Resin Calculator</Heading>

      {!hidden.resin && <Body hover={hover} />}
    </div>
  );
};

export default memo(ResinCalc);
