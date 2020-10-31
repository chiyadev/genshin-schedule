import React, { memo, useMemo, useRef, useState } from "react";
import { css, cx } from "emotion";
import { Configs, useConfig } from "../../../configs";
import { roundResin, getResinRecharge, ResinCap } from "../../../db/resins";
import { useServerDate } from "../../../time";
import WhiteCard from "../../../whiteCard";
import SectionHeading from "../sectionHeading";
import EstimatesByTime from "./estimatesByTime";
import { useMeasuredTextWidth } from "../../../utils";
import Subtract from "./subtract";
import EstimatesByResin from "./estimatesByResin";
import Resin from "../../../assets/game/Resin.png";

export function formatDateSimple(date: Date) {
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");

  return `${hour}:${minute}`;
}

const estimateModes: Configs["resinEstimateMode"][] = ["time", "value"];

const ResinCalculator = () => {
  const [resin, setResin] = useConfig("resin");
  const [mode, setMode] = useConfig("resinEstimateMode");

  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const resinInput = useRef<HTMLInputElement>(null);

  const date = useServerDate(60000);

  const current = useMemo(
    () => resin.value + getResinRecharge(date.getTime() - resin.time),
    [resin, date]
  );

  const inputWidth = useMeasuredTextWidth(
    "text-xl font-bold",
    roundResin(current).toString()
  );

  return (
    <div
      className="space-y-4"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <SectionHeading>Resin Calculator</SectionHeading>

      <WhiteCard>
        <div className="flex flex-row space-x-2">
          <img
            alt="Resin"
            src={Resin}
            className="w-10 h-10 pointer-events-auto cursor-pointer"
            onClick={() => {
              setMode((mode) => {
                return estimateModes[
                  (estimateModes.indexOf(mode) + 1) % estimateModes.length
                ];
              });
            }}
          />

          <input
            ref={resinInput}
            type="number"
            style={{ maxWidth: inputWidth }}
            className={cx(
              "flex-1 text-xl font-bold text-right",
              { "cursor-pointer": !focus },
              // hide arrows from number input
              css`
                -moz-appearance: textfield;

                ::-webkit-outer-spin-button,
                ::-webkit-inner-spin-button {
                  /* display: none; <- Crashes Chrome on hover */
                  -webkit-appearance: none;
                  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
                }
              `
            )}
            min={0}
            max={ResinCap}
            value={roundResin(current)}
            onClick={() => resinInput.current?.select()}
            onInput={({ currentTarget: { valueAsNumber } }) => {
              setResin({
                value: roundResin(valueAsNumber || 0),
                time: date.getTime(),
              });
            }}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />

          <div className="flex flex-col justify-center">/ {ResinCap}</div>
          <div className="flex-1" />

          {hover && <Subtract />}
        </div>

        <div className="text-xs text-gray-600 ml-2 pl-10">
          {current >= ResinCap ? (
            <span>Your resins are full!</span>
          ) : mode === "time" ? (
            <EstimatesByTime />
          ) : mode === "value" ? (
            <EstimatesByResin />
          ) : null}
        </div>
      </WhiteCard>
    </div>
  );
};

export default memo(ResinCalculator);
