import React, { Dispatch, memo, SetStateAction } from "react";
import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { Task, useConfig } from "../../utils/config";
import { FormattedMessage, useIntl } from "react-intl";
import { Eye, EyeOff } from "react-feather";
import { useTaskFocusSetter } from "../../utils/tasks";

const HideButton = ({
  task,
  setTask,
  rounded,
}: {
  task: Task;
  setTask: Dispatch<SetStateAction<Task>>;
  rounded?: boolean;
}) => {
  const { formatMessage } = useIntl();
  const [compact] = useConfig("taskListCompact");

  const isVisible = task.visible;
  const setFocused = useTaskFocusSetter();

  return (
    <Tooltip
      label={
        isVisible ? (
          <FormattedMessage defaultMessage="Hide temporarily" />
        ) : (
          <FormattedMessage defaultMessage="Unhide" />
        )
      }
      closeOnClick={false}
    >
      <IconButton
        variant="ghost"
        color="gray.500"
        size={compact ? "xs" : "sm"}
        borderRadius={rounded ? "full" : undefined}
        minW={8}
        icon={<Icon as={isVisible ? Eye : EyeOff} fontSize="lg" />}
        aria-label={isVisible ? formatMessage({ defaultMessage: "Hide" }) : formatMessage({ defaultMessage: "Show" })}
        onClick={() => {
          setTask((task) => ({
            ...task,
            visible: !isVisible,
          }));
          setFocused(task);
        }}
      />
    </Tooltip>
  );
};

export default memo(HideButton);
