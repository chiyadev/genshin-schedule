import React, { memo, useMemo } from "react";
import { useConfig } from "../../../configs";
import { useServerDate } from "../../../time";
import {
  getResinRecharge,
  ResinCap,
  ResinsPerMinute,
} from "../../../db/resins";
import { formatDateSimple } from "./index";

const EstimatesByResin = () => {
  const [resin] = useConfig("resin");
  const date = useServerDate(60000);

  const values = useMemo(() => {
    const values: { time: string; value: number }[] = [];

    const addValue = (value: number) => {
      const remaining =
        value - (resin.value + getResinRecharge(date.getTime() - resin.time));

      const hours = Math.floor(remaining / ResinsPerMinute / 60);
      const minutes = Math.floor((remaining / ResinsPerMinute) % 60);

      if (hours > 0 || minutes > 0) {
        values.push({
          time: [
            hours ? `${hours} hour${hours === 1 ? "" : "s"}` : "",
            minutes ? `${minutes} minute${minutes === 1 ? "" : "s"}` : "",
            `(${formatDateSimple(
              new Date(date.getTime() + (remaining / ResinsPerMinute) * 60000)
            )}),
          ].join(" "),
          valu,
        });
      }
    };

    for (let i = 20; i <= ResinCap; i += 20) {
      addValue(i);
    }

    return values;
  }, [resin, date]);

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

export default memo(EstimatesByResin);
