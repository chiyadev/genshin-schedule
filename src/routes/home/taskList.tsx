import { h } from "preact";
import { useConfig } from "../../configs";
import Map from "../../map";
import { css, cx } from "emotion";

const TaskList = () => {
  const [tasks, setTasks] = useConfig("tasks");

  return (
    <div className="space-y-4">
      <div className="text-lg">Today&apos;s tasks</div>

      {tasks.length ? (
        <div className="space-y-4 flex flex-col">
          {tasks.map(task => (
            <TaskDisplay key={task} id={task} />
          ))}
        </div>
      ) : (
        <div className="text-sm">Nothing.</div>
      )}

      <Map
        minimal
        className={cx(
          "w-full rounded shadow-lg",
          css`
            height: 26rem;
            background: rgba(0, 0, 0, 0.1);
          `
        )}
      />
    </div>
  );
};

const TaskDisplay = ({ id }: { id: string }) => {
  //const [task, setTask] = useConfig();
  return null;
};

export default TaskList;
