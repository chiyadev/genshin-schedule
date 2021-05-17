import React, { memo, useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { DateTime, Duration } from "luxon";
import { useConfig } from "../../../utils/config";
import { useFormatDuration, useFormatTime, useServerTime } from "../../../utils/time";
import { getCurrencyCap, getCurrencyRate, getCurrencyRecharge } from "../../../db/realms";

const EstimatorByCurrency = () => {
  const [currency] = useConfig("realmCurrency");
  const [energy] = useConfig("realmEnergy");
  const [rank] = useConfig("realmRank");
  const time = useServerTime(60000);

  const values = useMemo(() => {
    const result: { remainingTime: Duration; value: number }[] = [];
    const cap = getCurrencyCap(rank);

    const addValue = (value: number) => {
      const remainingCurrency = value - (currency.value + getCurrencyRecharge(energy, time.valueOf() - currency.time));
      const remainingTime = Duration.fromObject({ hours: remainingCurrency / getCurrencyRate(energy) });

      if (remainingCurrency > 0) {
        result.push({
          remainingTime,
          value,
        });
      }
    };

    for (let i = 80; i <= cap; i *= 2) {
      addValue(i);
    }
    addValue(cap);

    return result;
  }, [currency, time]);

  return (
    <>
      {values.map(({ remainingTime, value }) => {
        const tomorrow = time.plus(86400000);
        const estimatedDate =
          time.plus(remainingTime).toMillis() > tomorrow.toMillis()
            ? time.plus(remainingTime).toLocaleString(DateTime.DATETIME_SHORT)
            : useFormatTime(time.plus(remainingTime), ["hour", "minute"]);
        return (
          <div key={`currency-${remainingTime.valueOf()}`}>
            <FormattedMessage
              defaultMessage="{value} in {time}"
              values={{
                value,
                time: [useFormatDuration(remainingTime, ["day", "hour", "minute"]), `(${estimatedDate})`].join(" "),
              }}
            />
          </div>
        );
      })}
    </>
  );
};

export default memo(EstimatorByCurrency);
