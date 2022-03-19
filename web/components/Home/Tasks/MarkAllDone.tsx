import React, { memo } from "react";
import { useConfig } from "../../../utils/config";
import { trackEvent } from "../../../utils/umami";
import { HStack, Icon, Link } from "@chakra-ui/react";
import { getNextRefreshTime, useServerTime } from "../../../utils/time";
import { FormattedMessage } from "react-intl";
import { Check } from "react-feather";

const MarkAllDone = () => {
  const time = useServerTime(1000);
  const [showHidden] = useConfig("taskListShowHidden");
  const [, setTasks] = useConfig("tasks");

  return (
    <Link
      as="button"
      fontSize="sm"
      onClick={() => {
        setTasks((tasks) =>
          tasks.map((task) => {
            if ((showHidden || task.visible) && task.dueTime <= time.valueOf()) {
              return {
                ...task,
                dueTime:
                  typeof task.refreshTime !== "number"
                    ? getNextRefreshTime(time, task.refreshTime).valueOf()
                    : time.plus(task.refreshTime).valueOf(),
              };
            } else {
              return task;
            }
          })
        );

        trackEvent("taskList", "taskDoneAll");
      }}
    >
      <HStack spacing={2}>
        <div>
          <FormattedMessage defaultMessage="Mark everything as done" />
        </div>
        <Icon as={Check} />
      </HStack>
    </Link>
  );
};

export default memo(MarkAllDone);
