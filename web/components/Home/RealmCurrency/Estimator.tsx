import React, { memo, useMemo } from "react";
import { getCurrencyCap, getCurrencyRate, getCurrencyRecharge } from "../../../db/realms";
import { useConfig } from "../../../utils/config";
import { useFormatDuration, useFormatTime, useServerTime } from "../../../utils/time";
import { Duration } from "luxon";

const Estimator = () => {
  const [currency] = useConfig("realmCurrency");
  const [energy] = useConfig("realmEnergy");
  const [rank] = useConfig("realmRank");
  const time = useServerTime(60000);

  const remainingTime = useMemo(() => {
    const cap = getCurrencyCap(rank);
    const remainingCurrency = cap - (currency.value + getCurrencyRecharge(energy, time.valueOf() - currency.time));
    const remainingTime = Duration.fromObject({ hours: remainingCurrency / getCurrencyRate(energy) });

    return remainingCurrency > 0 && remainingTime;
  }, [currency, energy, rank, time]);

  if (remainingTime) {
    return (
      <div>
        {[
          useFormatDuration(remainingTime, ["day", "hour", "minute"]),
          `(${useFormatTime(time.plus(remainingTime), ["hour", "minute"])})`,
        ].join(" ")}
      </div>
    );
  }
  return null;
};

export default memo(Estimator);
