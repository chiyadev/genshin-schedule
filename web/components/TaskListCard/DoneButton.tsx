import { FaCheck } from "react-icons/fa";
import React, { Dispatch, memo, SetStateAction } from "react";
import { Task } from "../../utils/configs";
import { getServerNextResetDate, useServerDate } from "../../utils/time";
import { trackEvent } from "../../utils/umami";
import { Icon, IconButton } from "@chakra-ui/react";

const DoneButton = ({ setTask }: { setTask: Dispatch<SetStateAction<Task>> }) => {
  const date = useServerDate(1000);

  return (
    <IconButton
      variant="outline"
      colorScheme="green"
      size="sm"
      borderRadius="full"
      icon={<Icon as={FaCheck} />}
      aria-label="Mark as done"
      onClick={() => {
        setTask((task) => ({
          ...task,
          dueTime:
            task.refreshTime === "reset" ? getServerNextResetDate(date).getTime() : date.getTime() + task.refreshTime,
        }));

        trackEvent("taskList", "taskDone");
      }}
    />
  );
};

export default memo(DoneButton);
