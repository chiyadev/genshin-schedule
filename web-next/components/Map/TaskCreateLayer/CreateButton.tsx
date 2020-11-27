import React, { memo } from "react";
import { useConfig } from "../../../utils/configs";
import { useServerDate } from "../../../utils/time";
import { FaCheck } from "react-icons/fa";
import { trackEvent } from "../../../utils/umami";
import { Button, Icon } from "@chakra-ui/react";

const CreateButton = () => {
  const [task, setTask] = useConfig("mapCreateTask");
  const [, setTasks] = useConfig("tasks");
  const [, setFocusedTask] = useConfig("mapFocusedTask");

  const date = useServerDate(1000);

  return (
    <Button
      variant="link"
      colorScheme="green"
      size="sm"
      fontWeight="normal"
      leftIcon={<Icon as={FaCheck} />}
      onClick={() => {
        setTask((task) => ({ ...task, visible: false }));
        setTasks((tasks) => [...tasks, { ...task, dueTime: date.getTime() }]);
        setFocusedTask(false);

        trackEvent("map", "taskCreate");
      }}
    >
      Create
    </Button>
  );
};

export default memo(CreateButton);
