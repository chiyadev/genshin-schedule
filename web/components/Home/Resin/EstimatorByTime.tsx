import React, { memo, useMemo } from "react";
import { useConfig } from "../../../utils/configs";
import { formatDurationPartSimple, formatDurationSimple, formatTimeSimple, useServerTime } from "../../../utils/time";
import { getResinRecharge, ResinCap, ResinsPerMinute, roundResin } from "../../../db/resins";
import { DateTime, Duration } from "luxon";

const EstimatorByTime = () => {
  const [resin] = useConfig("resin");
  const time = useServerTime(60000);

  const values = useMemo(() => {
    const result: { time: string; value: number }[] = [];

    const addValue = (hours: number) => {
      const resins = roundResin(resin.value + getResinRecharge(time.plus({ hours }).valueOf() - resin.time));

      if (resins < ResinCap) {
        result.push({
          time: formatDurationPartSimple(Duration.fromObject({ hours }), "hour"),
          value: resins,
        });

        return true;
      }
    };

    addValue(2);
    for (let i = 4; addValue(i) && i < 24; i += 4);

    const capTime = DateTime.fromMillis(resin.time)
      .plus({ minutes: (ResinCap - resin.value) / ResinsPerMinute })
      .diff(time);

    result.push({
      time: [
        formatDurationSimple(capTime, ["hour", "minute"]),
        `(${formatTimeSimple(time.plus(capTime), ["hour", "minute"])})`,
      ].join(" "),
      value: ResinCap,
    });

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

export default memo(EstimatorByTime);
