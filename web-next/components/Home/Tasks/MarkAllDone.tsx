import React, { memo } from "react";
import { useConfig } from "../../../utils/configs";
import { useServerDate } from "../../../utils/time";
import { FaCheck } from "react-icons/fa";
import { trackEvent } from "../../../utils/umami";
import { Button, Icon } from "@chakra-ui/react";

const MarkAllDone = () => {
  const [, setTasks] = useConfig("tasks");
  const date = useServerDate(1000);

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
            if (task.visible && task.dueTime <= date.getTime()) {
              return {
                ...task,
                dueTime: date.getTime() + task.refreshTime,
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
