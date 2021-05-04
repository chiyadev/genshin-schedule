import React, { memo } from "react";
import { getResinRecharge, roundResin } from "../../../db/resins";
import { chakra } from "@chakra-ui/react";
import { useConfig } from "../../../utils/config";
import {
  useFormatDurationPart,
  getLargestUnit,
  getServerResetTime,
  useServerTime,
  Weekdays,
} from "../../../utils/time";
import { FormattedMessage, FormattedMessage as FormattedMessageId } from "react-intl";

const DateDisplay = () => {
  const time = useServerTime(1000);
  const [offsetDays] = useConfig("offsetDays");

  const resetTime = getServerResetTime(time);
  const resetDue = resetTime.diff(time);
  const resetResins = roundResin(getResinRecharge(resetDue.valueOf()));

  return (
    <chakra.div fontSize="sm" color="gray.500">
      <FormattedMessageId id={`day.${Weekdays[(6 + resetTime.weekday) % 7]}`} />,{" "}
      <FormattedMessage
        defaultMessage="{duration} until reset"
        values={{ duration: useFormatDurationPart(resetDue, getLargestUnit(resetDue)) }}
      />
      {!offsetDays && (
        <span>
          {" "}
          (+
          <FormattedMessage defaultMessage="{value, plural, one {# resin} other {# resins}}" values={{ value: resetResins }} />)
        </span>
      )}
    </chakra.div>
  );
};

export default memo(DateDisplay);
