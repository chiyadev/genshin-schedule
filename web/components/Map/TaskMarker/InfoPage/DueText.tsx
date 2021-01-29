import React, { memo } from "react";
import { Task } from "../../../../utils/configs";
import { formatDurationPartSimple, getLargestUnit, useServerTime } from "../../../../utils/time";
import { FaClock } from "react-icons/fa";
import { HStack, Icon, useColorModeValue } from "@chakra-ui/react";
import { DateTime } from "luxon";

const DueText = ({ task }: { task: Task }) => {
  const time = useServerTime(1000);
  const due = time.valueOf() <= task.dueTime;
  const dueTime = DateTime.fromMillis(task.dueTime).diff(time);
  const dueColor = useColorModeValue("red.500", "red.300");

  return (
    <HStack fontSize="sm" color={due ? undefined : dueColor} spacing={2}>
      <Icon as={FaClock} />

      {due ? (
        <div>Due in {formatDurationPartSimple(dueTime, getLargestUnit(dueTime))}</div>
      ) : (
        <div>Due {formatDurationPartSimple(dueTime.negate(), getLargestUnit(dueTime))} ago</div>
      )}
    </HStack>
  );
};

export default memo(DueText);
