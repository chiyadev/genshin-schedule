import React, { memo } from "react";
import { useConfig } from "../../../utils/config";
import { FaCheck } from "react-icons/fa";
import { trackEvent } from "../../../utils/umami";
import { HStack, Icon, Link } from "@chakra-ui/react";
import { getServerResetTime, useServerTime } from "../../../utils/time";
import { FormattedMessage } from "react-intl";

const MarkAllDone = () => {
  const time = useServerTime(1000);
  const [, setTasks] = useConfig("tasks");

  return (
    <Link
      as="button"
      fontSize="sm"
      onClick={() => {
        setTasks((tasks) =>
          tasks.map((task) => {
            if (task.visible && task.dueTime <= time.valueOf()) {
              return {
                ...task,
                dueTime:
                  task.refreshTime === "reset"
                    ? getServerResetTime(time).valueOf()
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
          <FormattedMessage id="markAllDone" />
        </div>
        <Icon as={FaCheck} />
      </HStack>
    </Link>
  );
};

export default memo(MarkAllDone);
