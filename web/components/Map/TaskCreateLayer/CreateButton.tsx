import React, { memo } from "react";
import { useConfig } from "../../../utils/configs";
import { useServerTime } from "../../../utils/time";
import { FaCheck } from "react-icons/fa";
import { trackEvent } from "../../../utils/umami";
import { Button, Icon } from "@chakra-ui/react";

const CreateButton = () => {
  const time = useServerTime(1000);
  const [task, setTask] = useConfig("mapCreateTask");
  const [, setTasks] = useConfig("tasks");
  const [, setFocused] = useConfig("mapFocusedTask");

  return (
    <Button
      variant="link"
      colorScheme="green"
      size="sm"
      fontWeight="normal"
      leftIcon={<Icon as={FaCheck} />}
      onClick={() => {
        setTask((task) => ({ ...task, visible: false }));
        setTasks((tasks) => [...tasks, { ...task, dueTime: time.valueOf() }]);
        setFocused(false);

        trackEvent("map", "taskCreate");
      }}
    >
      Create
    </Button>
  );
};

export default memo(CreateButton);
