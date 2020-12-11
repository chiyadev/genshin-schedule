import React, { memo } from "react";
import { Task, useConfig, useSync } from "../../../utils/configs";
import { FaTrash } from "react-icons/fa";
import { trackEvent } from "../../../utils/umami";
import { Button, Icon } from "@chakra-ui/react";
import { createApiClient } from "../../../utils/api";

const DeleteButton = ({ task }: { task: Task }) => {
  const [, setTasks] = useConfig("tasks");
  const { callbacks: syncCallbacks } = useSync();

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

        if (task.notify) {
          syncCallbacks.add(async () => {
            await createApiClient().deleteNotification(`task_${task.id}`);
          });
        }
      }}
    >
      Delete
    </Button>
  );
};

export default memo(DeleteButton);
