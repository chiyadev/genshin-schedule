import { Task, useConfig } from "./configs";
import { StateUpdater, useMemo } from "preact/hooks";
import { h } from "preact";
import WhiteCard from "./whiteCard";
import { useServerDate } from "./time";
import { memo } from "preact/compat";

export function useCurrentTasks() {
  const [tasks] = useConfig("tasks");
  const date = useServerDate(60000);

  return useMemo(() => {
    return tasks
      .filter(task => task.dueTime <= date.getTime())
      .sort((a, b) => {
        const icon = a.icon.localeCompare(b.icon);
        if (icon !== 0) return icon;

        return a.dueTime + a.refreshTime - b.dueTime - b.refreshTime;
      });
  }, [date, tasks]);
}

const TaskListCard = () => {
  const tasks = useCurrentTasks();
  const [, setTasks] = useConfig("tasks");

  return (
    <WhiteCard divide>
      {tasks.map(task => (
        <TaskDisplay
          key={task.id}
          task={task}
          setTask={newTask =>
            setTasks(tasks => {
              return tasks.map(oldTask => {
                if (oldTask.id === task.id) {
                  if (typeof newTask === "function") {
                    return newTask(oldTask);
                  } else {
                    return newTask;
                  }
                } else {
                  return oldTask;
                }
              });
            })
          }
        />
      ))}
    </WhiteCard>
  );
};

const TaskDisplay = ({ task }: { task: Task; setTask: StateUpdater<Task> }) => {
  const [, setMapState] = useConfig("mapState");
  const [, setFocusedTask] = useConfig("mapFocusedTask");

  return (
    <div
      className="py-2 flex flex-row space-x-2 cursor-pointer"
      onClick={() => {
        setMapState({ ...task.location, zoom: 5.6 });
        setFocusedTask(task.id);
      }}
    >
      <div className="flex flex-col justify-center flex-shrink-0">
        <img
          alt={task.icon}
          src={`/assets/game/${task.icon}.png`}
          className="w-8 h-8 object-contain"
        />
      </div>

      <div className="flex flex-col justify-center">
        <div className="font-bold">{task.name}</div>

        {task.description && (
          <div className="text-xs text-gray-600">{task.description}</div>
        )}
      </div>
    </div>
  );
};

export default memo(TaskListCard);
