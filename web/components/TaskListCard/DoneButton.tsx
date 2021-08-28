import React, { Dispatch, memo, SetStateAction } from "react";
import { Task, useConfig } from "../../utils/config";
import { trackEvent } from "../../utils/umami";
import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { useTaskDoneSetter, useTaskFocusSetter } from "../../utils/tasks";
import { FormattedMessage, useIntl } from "react-intl";
import { Check, X } from "react-feather";
import { useServerTime } from "../../utils/time";

const DoneButton = ({
  task,
  setTask,
  rounded,
}: {
  task: Task;
  setTask: Dispatch<SetStateAction<Task>>;
  rounded?: boolean;
}) => {
  const { formatMessage } = useIntl();
  const time = useServerTime(60000);
  const [compact] = useConfig("taskListCompact");

  const setDone = useTaskDoneSetter(setTask);
  const setFocused = useTaskFocusSetter();
  const isDue = task.dueTime <= time.valueOf();

  return (
    <Tooltip
      label={
        isDue ? <FormattedMessage defaultMessage="Mark as done" /> : <FormattedMessage defaultMessage="Mark as to-do" />
      }
      closeOnClick={false}
    >
      <IconButton
        variant="outline"
        colorScheme={isDue ? "green" : "red"}
        size={compact ? "xs" : "sm"}
        borderRadius={rounded ? "full" : undefined}
        minW={8}
        icon={<Icon as={isDue ? Check : X} fontSize="lg" />}
        aria-label={
          isDue ? formatMessage({ defaultMessage: "Mark as done" }) : formatMessage({ defaultMessage: "Mark as to-do" })
        }
        onClick={() => {
          setDone(isDue);
          setFocused(task);

          if (isDue) trackEvent("taskList", "taskDone");
          else trackEvent("taskList", "taskUndone");
        }}
      />
    </Tooltip>
  );
};

export default memo(DoneButton);
