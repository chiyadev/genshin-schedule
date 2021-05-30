import React, { memo, useMemo } from "react";
import { useConfig } from "../../../utils/config";
import { useFormatDuration, useServerTime } from "../../../utils/time";
import { DateTime, Duration } from "luxon";
import { FormattedMessage } from "react-intl";
import { getCurrencyCap, getCurrencyRate, getCurrencyRecharge, roundCurrency } from "../../../db/realms";

const EstimatorByTime = () => {
  const [currency] = useConfig("realmCurrency");
  const [energy] = useConfig("realmEnergy");
  const [rank] = useConfig("realmRank");
  const time = useServerTime(60000);

  const values = useMemo(() => {
    const result: { capTime: Duration; value: number; full?: boolean }[] = [];
    const cap = getCurrencyCap(rank);

    const addValue = (hours: number) => {
      const currencyValue = roundCurrency(
        currency.value + getCurrencyRecharge(energy, time.plus({ hours }).valueOf() - currency.time),
        rank
      );

      if (currencyValue < cap) {
        result.push({
          capTime: Duration.fromObject({ hours }),
          value: currencyValue,
        });

        return true;
      }
    };

    for (let i = 2; addValue(i); i *= 2);

    const remainingCurrency = cap - (currency.value + getCurrencyRecharge(energy, time.valueOf() - currency.time));
    const remainingTime = Duration.fromObject({ hours: remainingCurrency / getCurrencyRate(energy) });

    result.push({
      capTime: remainingTime,
      value: cap,
      full: true,
    });

    return result;
  }, [currency, time]);

  return (
    <>
      {values.map(({ capTime, value, full }) => (
        <div key={`currency-${capTime.valueOf()}`}>
          <FormattedMessage
            defaultMessage="{value} in {duration}"
            values={{
              value,
              duration: full
                ? [
                    useFormatDuration(capTime, ["day", "hour"]),
                    `(${time.plus(capTime).toLocaleString(DateTime.DATETIME_SHORT)})`,
                  ].join(" ")
                : useFormatDuration(capTime, ["day", "hour"]),
            }}
          />
        </div>
      ))}
    </>
  );
};

export default memo(EstimatorByTime);
