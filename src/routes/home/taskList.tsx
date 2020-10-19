import { h } from "preact";
import { useConfig } from "../../configs";
import Map from "../../map";

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

      <Map />
    </div>
  );
};

const TaskDisplay = ({ id }: { id: string }) => {
  //const [task, setTask] = useConfig();
  return null;
};

export default TaskList;
