import React, { Dispatch, memo, useRef, useState } from "react";
import { getAccuratestUnit, getUnitMs, ServerResetHour, TimeUnit, useFormatUnit } from "../../../../utils/time";
import { chakra, HStack, Icon, Input, Select } from "@chakra-ui/react";
import { Task } from "../../../../utils/config";
import { Duration } from "luxon";
import { FormattedMessage, useIntl } from "react-intl";
import { Repeat } from "react-feather";

const IntervalPicker = ({ value, setValue }: { value: number; setValue: Dispatch<Task["refreshTime"]> }) => {
  const { formatMessage } = useIntl();
  const ref = useRef<HTMLInputElement>(null);
  const [focus, setFocus] = useState(false);
  const [unit, setUnit] = useState<TimeUnit>(() => getAccuratestUnit(Duration.fromMillis(value)));
  const displayValue = Math.floor(value / getUnitMs(unit));

  return (
    <HStack fontSize="sm" spacing={2}>
      <Icon as={Repeat} />
      <chakra.div flexShrink={0}>
        <FormattedMessage defaultMessage="Respawns every" />:
      </chakra.div>

      <Input
        ref={ref}
        type="number"
        variant={focus ? "outline" : "unstyled"}
        size="sm"
        min={1}
        value={displayValue}
        onChange={({ currentTarget: { valueAsNumber } }) => {
          setValue((valueAsNumber || 1) * getUnitMs(unit));
        }}
        flex={1}
        minW={0}
        h={4}
        p={0}
        textAlign="right"
        borderRadius={0}
        onClick={() => ref.current?.select()}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
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
            {useFormatUnit(`unit.${unit}`)}
          </option>
        ))}

        <option value="reset">
          {formatMessage({ defaultMessage: "Server reset" })} (
          {formatMessage({ defaultMessage: "{time}AM" }, { time: ServerResetHour })})
        </option>
      </Select>
    </HStack>
  );
};

export default memo(IntervalPicker);
