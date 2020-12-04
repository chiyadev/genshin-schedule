import { FaCheck } from "react-icons/fa";
import React, { Dispatch, memo, SetStateAction } from "react";
import { Task } from "../../utils/configs";
import { trackEvent } from "../../utils/umami";
import { Icon, IconButton } from "@chakra-ui/react";
import { useTaskDoneSetter, useTaskFocusSetter } from "../../utils/tasks";

const DoneButton = ({ task, setTask }: { task: Task; setTask: Dispatch<SetStateAction<Task>> }) => {
  const setDone = useTaskDoneSetter(setTask);
  const setFocused = useTaskFocusSetter();

  return (
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
  );
};

export default memo(DoneButton);
