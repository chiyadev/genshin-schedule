import { clampRank } from "../../../db/realms";
import React, { memo, useRef } from "react";
import { useConfig } from "../../../utils/config";
import AutoSizeInput from "../../AutoSizeInput";

const TrustRankInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useConfig("realmRank");

  return (
    <AutoSizeInput
      ref={ref}
      type="number"
      min={1}
      max={10}
      fontSize="lg"
      fontWeight="bold"
      value={value.toString()}
      onClick={() => {
        ref.current?.select();
      }}
      onChange={({ currentTarget: { valueAsNumber } }) => {
        setValue(clampRank(valueAsNumber || 1));
      }}
    />
  );
};

export default memo(TrustRankInput);
