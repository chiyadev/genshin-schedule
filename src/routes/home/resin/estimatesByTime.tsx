import { useConfig } from "../../../configs";
import { useServerDate } from "../../../time";
import { useMemo } from "preact/hooks";
import {
  clampResin,
  getResinRecharge,
  ResinCap,
  ResinsPerMinute
} from "../../../db/resins";
import { h } from "preact";
import { memo } from "preact/compat";

const EstimatesByTime = () => {
  const [resin] = useConfig("resin");
  const date = useServerDate(60000);

  const values = useMemo(() => {
    const values: { time: string; value: number }[] = [];

    const addValue = (hours: number) => {
      const value = clampResin(
        resin.value +
          getResinRecharge(date.getTime() - resin.time + hours * 3600000)
      );

      if (value && value < ResinCap) {
        values.push({ time: `${hours} hours`, value });
        return true;
      }
    };

    addValue(2);

    for (let i = 4; addValue(i); i += 4);

    const capDate = new Date(
      resin.time + ((ResinCap - resin.value) / ResinsPerMinute) * 60000
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
  }, [resin, date]);

  const capped =
    getResinRecharge(date.getTime() - resin.time) >= ResinCap - resin.value;

  return (
    <div className="text-xs text-gray-600 ml-2 pl-10">
      {capped ? (
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

export default memo(EstimatesByTime);
