import { getCurrencyCap, getCurrencyRecharge, roundCurrency } from "../../../db/realms";
import React, { memo, useRef } from "react";
import AutoSizeInput from "../../AutoSizeInput";
import { useConfig } from "../../../utils/config";
import { useServerTime } from "../../../utils/time";
import { trackEvent } from "../../../utils/umami";

const CurrencyInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [currency, setCurrency] = useConfig("realmCurrency");
  const [energy] = useConfig("realmEnergy");
  const [rank] = useConfig("realmRank");

  const time = useServerTime(60000);
  const current = currency.value + getCurrencyRecharge(energy, time.valueOf() - currency.time);

  return (
    <AutoSizeInput
      ref={ref}
      type="number"
      min={0}
      max={getCurrencyCap(rank)}
      fontSize="lg"
      fontWeight="bold"
      value={roundCurrency(current, rank).toString()}
      onClick={() => {
        ref.current?.select();
        trackEvent("realmCurrency", "editCurrency");
      }}
      onChange={({ currentTarget: { valueAsNumber } }) => {
        setCurrency({
          value: roundCurrency(valueAsNumber || 0, rank),
          time: time.valueOf(),
        });
      }}
    />
  );
};

export default memo(CurrencyInput);
