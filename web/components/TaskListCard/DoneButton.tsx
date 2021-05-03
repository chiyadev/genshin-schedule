import { FaCheck } from "react-icons/fa";
import React, { Dispatch, memo, SetStateAction } from "react";
import { Task, useConfig } from "../../utils/config";
import { trackEvent } from "../../utils/umami";
import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { useTaskDoneSetter, useTaskFocusSetter } from "../../utils/tasks";
import { FormattedMessage, useIntl } from "react-intl";

const DoneButton = ({ task, setTask }: { task: Task; setTask: Dispatch<SetStateAction<Task>> }) => {
  const { formatMessage } = useIntl();
  const [compact] = useConfig("taskListCompact");

  const setDone = useTaskDoneSetter(setTask);
  const setFocused = useTaskFocusSetter();

  return (
    <Tooltip label={<FormattedMessage id="taskDone" />}>
      <IconButton
        variant="outline"
        colorScheme="green"
        size={compact ? "xs" : "sm"}
        borderRadius="full"
        icon={<Icon as={FaCheck} />}
        aria-label={formatMessage({ id: "taskDone" })}
        onClick={() => {
          setDone(true);
          setFocused(task);

          trackEvent("taskList", "taskDone");
        }}
      />
    </Tooltip>
  );
};

export default memo(DoneButton);
