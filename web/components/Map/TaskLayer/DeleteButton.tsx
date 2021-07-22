import React, { memo } from "react";
import { Task, useConfig, useSync } from "../../../utils/config";
import { trackEvent } from "../../../utils/umami";
import { HStack, Icon, Link } from "@chakra-ui/react";
import { createApiClient } from "../../../utils/api";
import { FormattedMessage } from "react-intl";
import { Trash } from "react-feather";

const DeleteButton = ({ task }: { task: Task }) => {
  const [, setTasks] = useConfig("tasks");
  const { callbacks: syncCallbacks } = useSync();

  return (
    <Link
      as="button"
      fontSize="sm"
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
      <HStack spacing={2}>
        <Icon as={Trash} />
        <div>
          <FormattedMessage defaultMessage="Delete" />
        </div>
      </HStack>
    </Link>
  );
};

export default memo(DeleteButton);
