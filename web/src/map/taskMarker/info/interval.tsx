import React, { memo, useState } from "react";
import {
  getBestTimeUnit,
  getTimeUnitMs,
  TimeUnit,
  TimeUnits,
} from "../../../time";
import { FaSyncAlt } from "react-icons/fa";

const IntervalPicker = ({
  value,
  setValu,
}: {
  value: number;
  setValue: (value: number) => void;
}) => {
  const [unit, setUnit] = useState<TimeUnit>(() => getBestTimeUnit(value));
  const displayValue = Math.round(value / getTimeUnitMs(unit));

  return (
    <div className="flex flex-row text-xs">
      <div>
        <FaSyncAlt className="inline" />
        <span className="align-middle"> Respawns every:</span>
      </div>

      <input
        type="number"
        min={1}
        value={displayValue}
        onInput={({ currentTarget: { valueAsNumber } }) => {
          setValue((valueAsNumber || 1) * getTimeUnitMs(unit));
        }}
        className="text-right flex-1 min-w-0"
      />

      <select
        value={unit}
        onChange={({ currentTarget: { value } }) => setUnit(value as TimeUnit)}
      >
        {TimeUnits.map((unit) => (
          <option key={unit} value={unit}>
            {unit}
            {displayValue !== 1 && "s"}
          </option>
        ))}
      </select>
    </div>
  );
};

export default memo(IntervalPicker);
