import { FaCheck } from "react-icons/fa";
import React, { Dispatch, memo, SetStateAction } from "react";
import { Task } from "../../utils/config";
import { trackEvent } from "../../utils/umami";
import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { useTaskDoneSetter, useTaskFocusSetter } from "../../utils/tasks";

const DoneButton = ({ task, setTask }: { task: Task; setTask: Dispatch<SetStateAction<Task>> }) => {
  const setDone = useTaskDoneSetter(setTask);
  const setFocused = useTaskFocusSetter();

  return (
    <Tooltip label="Mark as done">
      <IconButton
        variant="outline"
        colorScheme="green"
        size="sm"
        borderRadius="full"
        icon={<Icon as={FaCheck} />}
        aria-label="Mark as done"
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
