import { h } from "preact";
import { css, cx } from "emotion";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import { useConfig } from "../../configs";
import {
  clampResin,
  getResinRecharge,
  ResinCap,
  ResinRechargePerMinute
} from "../../db/resins";
import { useServerDate } from "../../time";
import WhiteCard from "../../whiteCard";
import SectionHeading from "./sectionHeading";
import { memo } from "preact/compat";

function useMeasuredTextWidth(className: string, text: string) {
  // fixes https://github.com/chiyadev/genshin-schedule/issues/2
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    setUpdate(i => i + 1);

    if ("fonts" in document) {
      (document as any).fonts.ready.then(() => setUpdate(i => i + 1));
    }
  }, []);

  return useMemo(() => {
    const span = document.createElement("span");
    span.className = className;
    span.innerText = text;

    document.body.appendChild(span);
    const width = span.getBoundingClientRect().width;
    document.body.removeChild(span);

    return width;
  }, [update, className, text]);
}

const ResinCalculator = () => {
  const [resin, setResin] = useConfig("resin");
  const resinInput = useRef<HTMLInputElement>(null);

  const date = useServerDate(60000);

  const current = useMemo(() => {
    return resin.value + getResinRecharge(date.getTime() - resin.time);
  }, [resin, date]);

  const inputWidth = useMeasuredTextWidth(
    "text-xl font-bold",
    clampResin(current).toString()
  );

  return (
    <div className="space-y-4">
      <SectionHeading>Resin Calculator</SectionHeading>

      <WhiteCard>
        <div className="flex flex-row space-x-2">
          <img alt="Resin" src="/assets/game/Resin.png" className="w-10 h-10" />

          <input
            ref={resinInput}
            type="number"
            style={{ maxWidth: inputWidth }}
            className={cx(
              "flex-1 text-xl font-bold text-right",
              css`
                background: transparent;
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
            value={clampResin(current)}
            onClick={() => resinInput.current.select()}
            onInput={({ currentTarget: { valueAsNumber } }) =>
              setResin({
                value: Math.max(0, Math.min(ResinCap, valueAsNumber || 0)),
                time: date.getTime()
              })
            }
          />

          <div className="flex flex-col justify-center">/ {ResinCap}</div>
        </div>

        <ResinExtrapolations current={current} />
      </WhiteCard>
    </div>
  );
};

const ResinExtrapolations = ({ current }: { current: number }) => {
  const [resin] = useConfig("resin");
  const date = useServerDate(60000);

  const values = useMemo(() => {
    const values: { time: string; value: number }[] = [];

    const addValue = (hours: number) => {
      const value = clampResin(current + getResinRecharge(hours * 3600000));

      if (value < 120) {
        values.push({ time: `${hours} hours`, value });
      }
    };

    addValue(2);

    for (let i = 4; i < 24; i += 4) {
      addValue(i);
    }

    const capDate = new Date(
      resin.time + ((ResinCap - resin.value) / ResinRechargePerMinute) * 60000
    );
    const capTime = capDate.getTime() - date.getTime();
    const capHours = Math.floor(capTime / 3600000);
    const capMinutes = Math.floor((capTime % 3600000) / 60000);
    const capHoursText = `${capHours} hour${capHours === 1 ? "" : "s"}`;
    const capMinutesText = `${capMinutes} minutes`;

    values.push({
      time: [
        capHours === 0 ? "" : capHoursText,
        capMinutes === 0 ? "" : capMinutesText,
        `(${capDate
          .getHours()
          .toString()
          .padStart(2, "0")}:${capDate
          .getMinutes()
          .toString()
          .padStart(2, "0")})`
      ].join(" "),
      value: ResinCap
    });

    return values;
  }, [current, resin, date]);

  return (
    <div className="text-xs text-gray-600 ml-2 pl-10">
      {current >= 120 ? (
        <div>Your resins are full!</div>
      ) : (
        values.map(({ time, value }) => (
          <div key={time}>
            {value} in {time}
          </div>
        ))
      )}
    </div>
  );
};

export default memo(ResinCalculator);
