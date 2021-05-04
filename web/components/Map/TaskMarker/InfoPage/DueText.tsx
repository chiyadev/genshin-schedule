import React, { memo } from "react";
import { Task } from "../../../../utils/config";
import { useFormatDurationPart, getLargestUnit, useServerTime } from "../../../../utils/time";
import { FaClock } from "react-icons/fa";
import { HStack, Icon, useColorModeValue } from "@chakra-ui/react";
import { DateTime } from "luxon";
import { FormattedMessage } from "react-intl";

const DueText = ({ task }: { task: Task }) => {
  const time = useServerTime(1000);
  const due = time.valueOf() <= task.dueTime;
  const dueTime = DateTime.fromMillis(task.dueTime).diff(time);
  const dueColor = useColorModeValue("red.500", "red.300");

  return (
    <HStack fontSize="sm" color={due ? undefined : dueColor} spacing={2}>
      <Icon as={FaClock} />

      <div>
        {due ? (
          <FormattedMessage defaultMessage="Due in {time}" values={{ time: useFormatDurationPart(dueTime, getLargestUnit(dueTime)) }} />
        ) : (
          <FormattedMessage
            defaultMessage="Due {time} ago"
            values={{ time: useFormatDurationPart(dueTime.negate(), getLargestUnit(dueTime)) }}
          />
        )}
      </div>
    </HStack>
  );
};

export default memo(DueText);
