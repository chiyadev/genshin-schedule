import React, { Dispatch, memo, SetStateAction } from "react";
import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { Task, useConfig } from "../../utils/config";
import { FormattedMessage, useIntl } from "react-intl";
import { Eye, EyeOff } from "react-feather";
import { useTaskFocusSetter } from "../../utils/tasks";

const HideButton = ({ task, setTask }: { task: Task; setTask: Dispatch<SetStateAction<Task>> }) => {
  const { formatMessage } = useIntl();
  const [compact] = useConfig("taskListCompact");

  const isVisible = task.visible;
  const setFocused = useTaskFocusSetter();

  return (
    <Tooltip
      label={isVisible ? <FormattedMessage defaultMessage="Hide" /> : <FormattedMessage defaultMessage="Show" />}
      closeOnClick={false}
    >
      <IconButton
        variant="outline"
        colorScheme={"white"}
        size={compact ? "xs" : "sm"}
        borderRadius="full"
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
