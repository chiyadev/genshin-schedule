import React, { Dispatch, memo, SetStateAction } from "react";
import { Task } from "../../../utils/config";
import { useServerTime } from "../../../utils/time";
import { trackEvent } from "../../../utils/umami";
import { HStack, Icon, Link, useColorModeValue } from "@chakra-ui/react";
import { useTaskDoneSetter, useTaskFocusSetter } from "../../../utils/tasks";
import { FormattedMessage } from "react-intl";
import { Check, X } from "react-feather";

const DoneButton = ({ task, setTask }: { task: Task; setTask: Dispatch<SetStateAction<Task>> }) => {
  const time = useServerTime(1000);
  const due = time.valueOf() <= task.dueTime;
  const setDone = useTaskDoneSetter(setTask);
  const setFocused = useTaskFocusSetter();

  return (
    <Link
      as="button"
      color={useColorModeValue(due ? "red.500" : "green.500", due ? "red.300" : "green.300")}
      fontSize="sm"
      onClick={() => {
        setDone(!due);
        setFocused();

        trackEvent("map", due ? "taskUndone" : "taskDone");
      }}
    >
      <HStack spacing={2}>
        <Icon as={due ? X : Check} />
        <div>
          {due ? (
            <FormattedMessage defaultMessage="Mark as to-do" />
          ) : (
            <FormattedMessage defaultMessage="Mark as done" />
          )}
        </div>
      </HStack>
    </Link>
  );
};

export default memo(DoneButton);
