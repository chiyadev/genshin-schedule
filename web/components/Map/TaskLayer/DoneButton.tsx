import React, { Dispatch, memo, SetStateAction } from "react";
import { Task } from "../../../utils/configs";
import { useServerTime } from "../../../utils/time";
import { FaCheck, FaTimes } from "react-icons/fa";
import { trackEvent } from "../../../utils/umami";
import { HStack, Icon, Link } from "@chakra-ui/react";
import { useTaskDoneSetter, useTaskFocusSetter } from "../../../utils/tasks";

const DoneButton = ({ task, setTask }: { task: Task; setTask: Dispatch<SetStateAction<Task>> }) => {
  const time = useServerTime(1000);
  const due = time.valueOf() <= task.dueTime;
  const setDone = useTaskDoneSetter(setTask);
  const setFocused = useTaskFocusSetter();

  return (
    <Link
      as="button"
      color={due ? "red.500" : "green.500"}
      fontSize="sm"
      onClick={() => {
        setDone(!due);
        setFocused();

        trackEvent("map", due ? "taskUndone" : "taskDone");
      }}
    >
      <HStack spacing={2}>
        <Icon as={due ? FaTimes : FaCheck} />
        <div>Mark as {due ? "to-do" : "done"}</div>
      </HStack>
    </Link>
  );
};

export default memo(DoneButton);
