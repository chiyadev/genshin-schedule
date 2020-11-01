import React, { memo } from "react";
import { useServerDate } from "../../../time";
import { useConfig } from "../../../configs";
import { trackEvent } from "../../../track";

const Time = () => {
  const date = useServerDate();
  const [, setOffset] = useConfig("offsetDays");

  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  const second = date.getSeconds().toString().padStart(2, "0");

  return (
    <div className="font-bold text-4xl">
      <span
        className="cursor-pointer"
        onClick={() => {
          setOffset((o) => o - 1);
          trackEvent("clock", "offsetBackward");
        }}
      >
        &lt;
      </span>

      <span> {hour}</span>
      <span>:{minute}:</span>
      <span>{second} </span>

      <span
        className="cursor-pointer"
        onClick={() => {
          setOffset((o) => o + 1);
          trackEvent("clock", "offsetForward");
        }}
      >
        &gt;
      </span>
    </div>
  );
};

export default memo(Time);
