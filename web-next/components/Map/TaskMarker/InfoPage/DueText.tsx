import React, { memo } from "react";
import { Task } from "../../../../utils/configs";
import { getLargestTimeUnit, getTimeUnitMs, useServerDate } from "../../../../utils/time";
import { FaClock } from "react-icons/fa";
import { HStack, Icon } from "@chakra-ui/react";

const DueText = ({ task }: { task: Task }) => {
  const date = useServerDate(60000);
  const delta = task.dueTime - date.getTime();
  const unit = getLargestTimeUnit(Math.abs(delta));
  const displayValue = Math.round(delta / getTimeUnitMs(unit));

  return (
    <HStack fontSize="sm" color={displayValue <= 0 ? "red.500" : undefined} spacing={2}>
      <Icon as={FaClock} />

      {displayValue === 0 ? (
        <div>Due now</div>
      ) : displayValue > 0 ? (
        <div>
          Due in {displayValue} {unit}
          {displayValue !== 1 && "s"}
        </div>
      ) : (
        <div>
          Due {-displayValue} {unit}
          {-displayValue !== 1 && "s"} ago
        </div>
      )}
    </HStack>
  );
};

export default memo(DueText);
