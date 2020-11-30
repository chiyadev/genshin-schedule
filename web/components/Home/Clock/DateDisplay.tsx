import React, { memo } from "react";
import { getServerDayOfWeek, getServerNextResetDate, useServerDate } from "../../../utils/time";
import { getResinRecharge, ResinCap, roundResin } from "../../../db/resins";
import { chakra } from "@chakra-ui/react";
import { useConfig } from "../../../utils/configs";

const DateDisplay = () => {
  const date = useServerDate();
  const [offsetDays] = useConfig("offsetDays");

  const resetDate = getServerNextResetDate(date);
  const resetTime = resetDate.getTime() - date.getTime();
  const resetHours = Math.floor(resetTime / 3600000);
  const resetMinutes = Math.floor(resetTime / 60000);
  const resetResins = roundResin(getResinRecharge(resetTime));

  return (
    <chakra.div fontSize="sm" color="gray.500">
      <span>{getServerDayOfWeek(date)}, </span>

      {resetMinutes > 60 ? (
        <span>
          {resetHours} hour{resetHours !== 1 && "s"}
        </span>
      ) : (
        <span>
          {resetMinutes} minute{resetMinutes !== 1 && "s"}
        </span>
      )}

      <span> until reset</span>

      {!offsetDays && resetResins < ResinCap && (
        <span>
          {" "}
          (+{resetResins} resin{resetResins !== 1 && "s"})
        </span>
      )}
    </chakra.div>
  );
};

export default memo(DateDisplay);
