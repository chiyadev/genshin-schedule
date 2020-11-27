import React, { memo } from "react";
import { Task, useConfig } from "../../../utils/configs";
import { FaTrash } from "react-icons/fa";
import { trackEvent } from "../../../utils/umami";
import { Button, Icon } from "@chakra-ui/react";

const DeleteButton = ({ task }: { task: Task }) => {
  const [, setTasks] = useConfig("tasks");

  return (
    <Button
      variant="link"
      colorScheme="black"
      size="sm"
      fontWeight="normal"
      leftIcon={<Icon as={FaTrash} />}
      onClick={() => {
        setTasks((tasks) => tasks.filter((t) => t.id !== task.id));

        trackEvent("map", "taskDelete");
      }}
    >
      Delete
    </Button>
  );
};

export default memo(DeleteButton);
