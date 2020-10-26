import { useConfig } from "../../configs";
import { useServerDate } from "../../time";
import { FaCheck } from "react-icons/fa";
import { h } from "preact";
import { memo } from "preact/compat";

const Create = () => {
  const [task, setTask] = useConfig("mapCreateTask");
  const [, setTasks] = useConfig("tasks");
  const [, setFocusedTask] = useConfig("mapFocusedTask");

  const date = useServerDate(1000);

  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        setTask(task => ({ ...task, visible: false }));
        setTasks(tasks => [...tasks, { ...task, dueTime: date.getTime() }]);
        setFocusedTask(false);
      }}
    >
      <FaCheck className="inline" />
      <span className="align-middle"> Create</span>
    </div>
  );
};

export default memo(Create);
