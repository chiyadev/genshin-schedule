import React, { memo } from "react";
import { getResinRecharge, roundResin } from "../../../db/resins";
import { useConfig } from "../../../utils/config";
import {
  useFormatDurationPart,
  getLargestUnit,
  getServerResetTime,
  useServerTime,
  Weekdays,
  FormattedUnit,
} from "../../../utils/time";
import { FormattedMessage } from "react-intl";

const DateDisplay = () => {
  const time = useServerTime(1000);
  const [offsetDays] = useConfig("offsetDays");

  const resetTime = getServerResetTime(time);
  const resetDue = resetTime.diff(time);
  const resetResins = roundResin(getResinRecharge(resetDue.valueOf()));

  return (
    <div>
      <FormattedUnit id={`day.${Weekdays[(6 + resetTime.weekday) % 7]}`} />,{" "}
      <FormattedMessage
        defaultMessage="{duration} until reset"
        values={{ duration: useFormatDurationPart(resetDue, getLargestUnit(resetDue)) }}
      />
      {!offsetDays && (
        <span>
          {" "}
          (+
          <FormattedMessage
            defaultMessage="{value, plural, one {# resin} other {# resins}}"
            values={{ value: resetResins }}
          />
          )
        </span>
      )}
    </div>
  );
};

export default memo(DateDisplay);
