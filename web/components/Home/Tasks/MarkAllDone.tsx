import React, { memo } from "react";
import { useConfig } from "../../../utils/configs";
import { FaCheck } from "react-icons/fa";
import { trackEvent } from "../../../utils/umami";
import { Button, Icon } from "@chakra-ui/react";
import { getServerResetTime, useServerTime } from "../../../utils/time";

const MarkAllDone = () => {
  const time = useServerTime(1000);
  const [, setTasks] = useConfig("tasks");

  return (
    <Button
      variant="link"
      colorScheme="white"
      size="sm"
      fontWeight="normal"
      rightIcon={<Icon as={FaCheck} />}
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
      Mark everything as done
    </Button>
  );
};

export default memo(MarkAllDone);
