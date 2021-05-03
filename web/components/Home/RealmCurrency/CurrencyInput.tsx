import { clampCurrency, getCurrencyCap, getCurrencyRecharge } from "../../../db/realms";
import React, { memo, useRef } from "react";
import AutoSizeInput from "../../AutoSizeInput";
import { useConfig } from "../../../utils/config";
import { useServerTime } from "../../../utils/time";

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
      value={current.toString()}
      onClick={() => {
        ref.current?.select();
      }}
      onChange={({ currentTarget: { valueAsNumber } }) => {
        setCurrency({
          value: clampCurrency(rank, valueAsNumber || 0),
          time: time.valueOf(),
        });
      }}
    />
  );
};

export default memo(CurrencyInput);
