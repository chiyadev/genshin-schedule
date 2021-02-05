import React, { memo, useMemo } from "react";
import { useConfig } from "../../../utils/config";
import { formatDurationSimple, formatTimeSimple, useServerTime } from "../../../utils/time";
import { getResinRecharge, ResinCap, ResinsPerMinute } from "../../../db/resins";
import { Duration } from "luxon";

const EstimatorByResin = () => {
  const [resin] = useConfig("resin");
  const time = useServerTime(60000);

  const values = useMemo(() => {
    const result: { time: string; value: number }[] = [];

    const addValue = (value: number) => {
      const remainingResins = value - (resin.value + getResinRecharge(time.valueOf() - resin.time));
      const remainingTime = Duration.fromObject({ minutes: remainingResins / ResinsPerMinute });

      if (remainingResins > 0) {
        result.push({
          time: [
            formatDurationSimple(remainingTime, ["hour", "minute"]),
            `(${formatTimeSimple(time.plus(remainingTime), ["hour", "minute"])})`,
          ].join(" "),
          value,
        });
      }
    };

    for (let i = 20; i <= ResinCap; i += 20) {
      addValue(i);
    }

    return result;
  }, [resin, time]);

  return (
    <div>
      {values.map(({ time, value }) => (
        <div key={time}>
          {value} in {time}
        </div>
      ))}
    </div>
  );
};

export default memo(EstimatorByResin);
