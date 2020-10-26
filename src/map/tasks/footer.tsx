import { h } from "preact";
import { Task } from "../../configs";
import { StateUpdater } from "preact/hooks";
import { memo } from "preact/compat";
import Delete from "./delete";
import Done from "./done";

const Footer = ({
  task,
  setTask
}: {
  task: Task;
  setTask: StateUpdater<Task>;
}) => {
  return (
    <div className="flex flex-row w-full space-x-2">
      <Delete task={task} />
      <div className="flex-1" />
      <Done task={task} setTask={setTask} />
    </div>
  );
};

export default memo(Footer);
