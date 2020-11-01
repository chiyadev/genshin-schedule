import React, { memo } from "react";
import { Task, useConfig } from "../../configs";
import { FaTrash } from "react-icons/fa";
import { trackEvent } from "../../track";

const Delete = ({ task }: { task: Task }) => {
  const [, setTasks] = useConfig("tasks");

  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        setTasks((tasks) => tasks.filter((t) => t.id !== task.id));

        trackEvent("map", "taskDelete");
      }}
    >
      <FaTrash className="inline" />
      <span className="align-middle"> Delete</span>
    </div>
  );
};

export default memo(Delete);
