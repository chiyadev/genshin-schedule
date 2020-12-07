import React, { Dispatch, memo, SetStateAction } from "react";
import { Task } from "../../../utils/configs";
import { useServerTime } from "../../../utils/time";
import { FaCheck, FaTimes } from "react-icons/fa";
import { trackEvent } from "../../../utils/umami";
import { Button, Icon } from "@chakra-ui/react";
import { useTaskDoneSetter, useTaskFocusSetter } from "../../../utils/tasks";

const DoneButton = ({ task, setTask }: { task: Task; setTask: Dispatch<SetStateAction<Task>> }) => {
  const time = useServerTime(1000);
  const due = time.valueOf() <= task.dueTime;
  const setDone = useTaskDoneSetter(setTask);
  const setFocused = useTaskFocusSetter();

  return (
    <Button
      variant="link"
      colorScheme={due ? "red" : "green"}
      size="sm"
      fontWeight="normal"
      leftIcon={<Icon as={due ? FaTimes : FaCheck} />}
      onClick={() => {
        setDone(!due);
        setFocused();

        trackEvent("map", due ? "taskUndone" : "taskDone");
      }}
    >
      Mark as {due ? "to-do" : "done"}
    </Button>
  );
};

export default memo(DoneButton);
