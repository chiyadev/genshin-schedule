import React, { Dispatch, memo, SetStateAction } from "react";
import { Task } from "../../../utils/configs";
import { useServerDate } from "../../../utils/time";
import { FaCheck, FaTimes } from "react-icons/fa";
import { trackEvent } from "../../../utils/umami";
import { Button, Icon } from "@chakra-ui/react";
import { useTaskDoneSetter, useTaskFocusSetter } from "../../../utils/tasks";

const DoneButton = ({ task, setTask }: { task: Task; setTask: Dispatch<SetStateAction<Task>> }) => {
  const date = useServerDate(1000);
  const due = task.dueTime <= date.getTime();
  const setDone = useTaskDoneSetter(setTask);
  const setFocused = useTaskFocusSetter();

  return (
    <Button
      variant="link"
      colorScheme={due ? "green" : "red"}
      size="sm"
      fontWeight="normal"
      leftIcon={<Icon as={due ? FaCheck : FaTimes} />}
      onClick={() => {
        setDone(due);
        setFocused();

        trackEvent("map", due ? "taskDone" : "taskUndone");
      }}
    >
      Mark as {due ? "done" : "to-do"}
    </Button>
  );
};

export default memo(DoneButton);
