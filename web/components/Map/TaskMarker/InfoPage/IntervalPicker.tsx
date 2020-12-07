import React, { Dispatch, memo, useRef, useState } from "react";
import { getAccuratestUnit, getUnitMs, ServerResetHour, TimeUnit } from "../../../../utils/time";
import { FaSyncAlt } from "react-icons/fa";
import { chakra, HStack, Icon, Input, Select } from "@chakra-ui/react";
import { Task } from "../../../../utils/configs";
import pluralize from "pluralize";
import { Duration } from "luxon";

const IntervalPicker = ({ value, setValue }: { value: number; setValue: Dispatch<Task["refreshTime"]> }) => {
  const ref = useRef<HTMLInputElement>(null);
  const [unit, setUnit] = useState<TimeUnit>(() => getAccuratestUnit(Duration.fromMillis(value)));
  const displayValue = Math.floor(value / getUnitMs(unit));

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
        onChange={({ currentTarget: { valueAsNumber } }) => {
          setValue((valueAsNumber || 1) * getUnitMs(unit));
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
        onChange={({ currentTarget: { value } }) => {
          switch (value) {
            case "reset":
              setValue("reset");
              break;

            default:
              setUnit(value as TimeUnit);
              break;
          }
        }}
      >
        {["week", "day", "hour", "minute"].map((unit) => (
          <option key={unit} value={unit}>
            {pluralize(unit, displayValue)}
          </option>
        ))}

        <option value="reset">server reset ({ServerResetHour}AM)</option>
      </Select>
    </HStack>
  );
};

export default memo(IntervalPicker);
