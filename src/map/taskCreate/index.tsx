import { useConfig } from "../../configs";
import TaskMarker from "../taskMarker";
import { h } from "preact";
import Create from "./create";
import { memo } from "preact/compat";

const TaskCreateLayer = () => {
  const [task, setTask] = useConfig("mapCreateTask");

  if (!task.visible) {
    return null;
  }

  return (
    <TaskMarker
      task={task}
      setTask={newTask => {
        setTask(oldTask => {
          if (typeof newTask === "function") {
            newTask = newTask(oldTask);
          }

          return { ...oldTask, ...newTask };
        });
      }}
      alwaysOpen
      showDue={false}
      onClose={() => setTask(task => ({ ...task, visible: false }))}
      footer={<Create />}
    />
  );
};

export default memo(TaskCreateLayer);
