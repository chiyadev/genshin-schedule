import React, { memo, useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { Box } from "@chakra-ui/react";
import { Duration } from "luxon";
import { useConfig } from "../../../utils/config";
import { useFormatDuration, useFormatTime, useServerTime } from "../../../utils/time";
import { getCurrencyCap, getCurrencyRate, getCurrencyRecharge } from "../../../db/realms";

const EstimatorByResin = () => {
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

    for (let i = 60; i <= cap; i += 60) {
      addValue(i);
    }

    return result;
  }, [currency, time]);

  return (
    <Box sx={{ columnCount: [1, 2, 3, 4] }}>
      {values.map(({ remainingTime, value }) => (
        <div key={`currency-${remainingTime.valueOf()}`}>
          <FormattedMessage
            id="resinEstValueEntry"
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
    </Box>
  );
};

export default memo(EstimatorByResin);
