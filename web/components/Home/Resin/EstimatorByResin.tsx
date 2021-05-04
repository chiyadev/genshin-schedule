import React, { memo, useMemo } from "react";
import { useConfig } from "../../../utils/config";
import { useFormatDuration, useFormatTime, useServerTime } from "../../../utils/time";
import { getResinRecharge, ResinCap, ResinsPerMinute } from "../../../db/resins";
import { Duration } from "luxon";
import { FormattedMessage } from "react-intl";

const EstimatorByResin = () => {
  const [resin] = useConfig("resin");
  const time = useServerTime(60000);

  const values = useMemo(() => {
    const result: { remainingTime: Duration; value: number }[] = [];

    const addValue = (value: number) => {
      const remainingResins = value - (resin.value + getResinRecharge(time.valueOf() - resin.time));
      const remainingTime = Duration.fromObject({ minutes: remainingResins / ResinsPerMinute });

      if (remainingResins > 0) {
        result.push({
          remainingTime,
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
      {values.map(({ remainingTime, value }) => (
        <div key={remainingTime.valueOf()}>
          <FormattedMessage
            defaultMessage="{value} in {time}"
            values={{
              value,
              time: [
                useFormatDuration(remainingTime, ["hour", "minute"]),
                `(${useFormatTime(time.plus(remainingTime), ["hour", "minute"])})`,
              ].join(" "),
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default memo(EstimatorByResin);
