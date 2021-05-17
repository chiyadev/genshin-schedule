import React, { memo, useMemo } from "react";
import { useConfig } from "../../../utils/config";
import { useFormatDurationPart, useFormatDuration, useFormatTime, useServerTime } from "../../../utils/time";
import { getResinRecharge, ResinCap, ResinsPerMinute, roundResin } from "../../../db/resins";
import { DateTime, Duration } from "luxon";
import { FormattedMessage } from "react-intl";

const EstimatorByTime = () => {
  const [resin] = useConfig("resin");
  const time = useServerTime(60000);

  const values = useMemo(() => {
    const result: { capTime: Duration; value: number; full?: boolean }[] = [];

    const addValue = (hours: number) => {
      const resins = roundResin(resin.value + getResinRecharge(time.plus({ hours }).valueOf() - resin.time));

      if (resins < ResinCap) {
        result.push({
          capTime: Duration.fromObject({ hours }),
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
      capTime,
      value: ResinCap,
      full: true,
    });

    return result;
  }, [resin, time]);

  return (
    <div>
      {values.map(({ capTime, value, full }) => (
        <div key={capTime.valueOf()}>
          <FormattedMessage
            defaultMessage="{value} in {duration}"
            values={{
              value,
              duration: full
                ? [
                    useFormatDuration(capTime, ["hour", "minute"]),
                    `(${useFormatTime(time.plus(capTime), ["hour", "minute"])})`,
                  ].join(" ")
                : useFormatDurationPart(capTime, "hour"),
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default memo(EstimatorByTime);
