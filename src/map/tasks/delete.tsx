import { Task, useConfig } from "../../configs";
import { FaTrash } from "react-icons/fa";
import { h } from "preact";
import { memo } from "preact/compat";

const Delete = ({ task }: { task: Task }) => {
  const [, setTasks] = useConfig("tasks");

  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        setTasks(tasks => tasks.filter(t => t.id !== task.id));
      }}
    >
      <FaTrash className="inline" />
      <span className="align-middle"> Delete</span>
    </div>
  );
};

export default memo(Delete);
