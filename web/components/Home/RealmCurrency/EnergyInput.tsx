import React, { memo, useRef } from "react";
import { clampEnergy } from "../../../db/realms";
import { useConfig } from "../../../utils/config";
import AutoSizeInput from "../../AutoSizeInput";
import { trackEvent } from "../../../utils/umami";

const EnergyInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useConfig("realmEnergy");

  return (
    <AutoSizeInput
      ref={ref}
      type="number"
      min={0}
      fontSize="lg"
      fontWeight="bold"
      value={value.toString()}
      onClick={() => {
        ref.current?.select();
        trackEvent("realmCurrency", "editEnergy");
      }}
      onChange={({ currentTarget: { valueAsNumber } }) => {
        setValue(clampEnergy(valueAsNumber || 0));
      }}
    />
  );
};

export default memo(EnergyInput);
