import React, { Dispatch, memo, SetStateAction } from "react";
import { Task } from "../../../utils/configs";
import { getServerNextResetDate, useServerDate } from "../../../utils/time";
import { FaCheck, FaTimes } from "react-icons/fa";
import { trackEvent } from "../../../utils/umami";
import { useMap } from "react-leaflet";
import { Button, Icon } from "@chakra-ui/react";

const DoneButton = ({ task, setTask }: { task: Task; setTask: Dispatch<SetStateAction<Task>> }) => {
  const date = useServerDate(1000);
  const map = useMap();

  if (task.dueTime <= date.getTime()) {
    return (
      <Button
        variant="link"
        colorScheme="green"
        size="sm"
        fontWeight="normal"
        leftIcon={<Icon as={FaCheck} />}
        onClick={() => {
          setTask((task) => ({
            ...task,
            dueTime:
              task.refreshTime === "reset" ? getServerNextResetDate(date).getTime() : date.getTime() + task.refreshTime,
          }));

          map.closePopup();
          trackEvent("map", "taskDone");
        }}
      >
        Mark as done
      </Button>
    );
  } else {
    return (
      <Button
        variant="link"
        colorScheme="red"
        size="sm"
        fontWeight="normal"
        leftIcon={<Icon as={FaTimes} />}
        onClick={() => {
          setTask((task) => ({
            ...task,
            dueTime: date.getTime(),
          }));

          map.closePopup();
          trackEvent("map", "taskUndone");
        }}
      >
        Mark as to-do
      </Button>
    );
  }
};

export default memo(DoneButton);
