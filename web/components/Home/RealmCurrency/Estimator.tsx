import React, { memo, useMemo } from "react";
import { chakra } from "@chakra-ui/react";
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

  return (
    <chakra.div color="gray.500" fontSize="sm">
      {remainingTime && (
        <div>
          {[
            useFormatDuration(remainingTime, ["day", "hour", "minute"]),
            `(${useFormatTime(time.plus(remainingTime), ["hour", "minute"])})`,
          ].join(" ")}
        </div>
      )}
    </chakra.div>
  );
};

export default memo(Estimator);
