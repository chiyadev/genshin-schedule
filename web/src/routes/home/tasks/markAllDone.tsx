import React, { memo } from "react";
import { useConfig } from "../../../configs";
import { useServerDate } from "../../../time";
import { FaCheck } from "react-icons/fa";

const MarkAllDone = () => {
  const [, setTasks] = useConfig("tasks");
  const date = useServerDate(1000);

  return (
    <span
      className="cursor-pointer"
      onClick={() => {
        setTasks((tasks) =>
          tasks.map((task) => {
            if (task.dueTime <= date.getTime()) {
              return {
                ...task,
                dueTime: date.getTime() + task.refreshTime,
              };
            } else {
              return task;
            }
          })
        );
      }}
    >
      <span className="align-middle">Mark everything as done </span>
      <FaCheck className="inline" />
    </span>
  );
};

export default memo(MarkAllDone);
