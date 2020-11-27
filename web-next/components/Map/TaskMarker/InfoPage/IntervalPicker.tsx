import React, { memo, useRef, useState } from "react";
import { getBestTimeUnit, getTimeUnitMs, TimeUnit, TimeUnits } from "../../../../utils/time";
import { FaSyncAlt } from "react-icons/fa";
import { chakra, HStack, Icon, Input, Select } from "@chakra-ui/react";

const IntervalPicker = ({ value, setValue }: { value: number; setValue: (value: number) => void }) => {
  const ref = useRef<HTMLInputElement>(null);
  const [unit, setUnit] = useState<TimeUnit>(() => getBestTimeUnit(value));
  const displayValue = Math.round(value / getTimeUnitMs(unit));

  return (
    <HStack fontSize="sm" spacing={2}>
      <Icon as={FaSyncAlt} />
      <chakra.div flexShrink={0}>Respawns every:</chakra.div>

      <Input
        ref={ref}
        type="number"
        variant="unstyled"
        size="sm"
        min={1}
        value={displayValue}
        onInput={({ currentTarget: { valueAsNumber } }) => {
          setValue((valueAsNumber || 1) * getTimeUnitMs(unit));
        }}
        flex={1}
        h={4}
        p={0}
        textAlign="right"
        onClick={() => ref.current?.select()}
      />

      <Select
        variant="unstyled"
        size="sm"
        w={20}
        h={4}
        value={unit}
        onChange={({ currentTarget: { value } }) => setUnit(value as TimeUnit)}
      >
        {TimeUnits.map((unit) => (
          <option key={unit} value={unit}>
            {unit}
            {displayValue !== 1 && "s"}
          </option>
        ))}
      </Select>
    </HStack>
  );
};

export default memo(IntervalPicker);
