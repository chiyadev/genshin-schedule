import React, { memo } from "react";
import { getResinRecharge, ResinCap, roundResin } from "../../../db/resins";
import { chakra } from "@chakra-ui/react";
import { useConfig } from "../../../utils/configs";
import {
  formatDurationPartSimple,
  getLargestUnit,
  getServerResetTime,
  useServerTime,
  Weekdays,
} from "../../../utils/time";
import pluralize from "pluralize";

const DateDisplay = () => {
  const time = useServerTime(60000);
  const [offsetDays] = useConfig("offsetDays");

  const resetTime = getServerResetTime(time);
  const resetDue = resetTime.diff(time);
  const resetResins = roundResin(getResinRecharge(resetDue.valueOf()));

  return (
    <chakra.div fontSize="sm" color="gray.500">
      <span>{Weekdays[(6 + resetTime.weekday) % 7]}, </span>
      <span>{formatDurationPartSimple(resetDue, getLargestUnit(resetDue))} until reset</span>

      {!offsetDays && resetResins < ResinCap && (
        <span>
          {" "}
          (+{resetResins} {pluralize("resin", resetResins)})
        </span>
      )}
    </chakra.div>
  );
};

export default memo(DateDisplay);
