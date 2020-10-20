import { h } from "preact";
import { Task, useConfig } from "../../configs";
import Map from "../../map";
import { css, cx } from "emotion";
import { FaAngleRight, FaTimes } from "react-icons/fa";
import { Link } from "preact-router";
import SectionHeading from "./sectionHeading";
import WhiteCard from "../../whiteCard";
import { useRerenderFrequency, useServerDate } from "../../time";
import { StateUpdater, useMemo } from "preact/hooks";

const TaskList = () => {
  const [tasks, setTasks] = useConfig("tasks");

  return (
    <div className="space-y-4">
      <SectionHeading>Today&apos;s Tasks</SectionHeading>

      <div>
        {useMemo(
          () =>
            tasks.length ? (
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
            ) : (
              <div className="text-sm">
                <FaTimes className="inline" /> Nothing. Create a task by opening
                the map.
              </div>
            ),
          [tasks]
        )}
      </div>

      <MapDisplay />
    </div>
  );
};

const TaskDisplay = ({ task }: { task: Task; setTask: StateUpdater<Task> }) => {
  const [, setMapState] = useConfig("mapState");
  const [, setFocusedTask] = useConfig("mapFocusedTask");

  const date = useServerDate();
  useRerenderFrequency(1000);

  if (date.getTime() < task.dueTime) {
    return null;
  }

  return (
    <div
      className="py-2 flex flex-row space-x-2 cursor-pointer"
      onClick={() => {
        setMapState({ ...task.location, zoom: 6.4 });
        setFocusedTask(task.id);
      }}
    >
      <div className="flex flex-col justify-center flex-shrink-0">
        <img
          className="w-8 h-8 object-contain"
          src={`/assets/game/${task.icon}.png`}
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

const MapDisplay = () => {
  return (
    <div className="space-y-2">
      <Map
        minimal
        className={cx(
          "w-full rounded shadow-lg",
          css`
            height: 26rem;
            background: rgba(0, 0, 0, 0.1) !important;
          `
        )}
      />

      <div className="text-right text-xs">
        <Link href="/map">
          Open map
          <FaAngleRight className="inline" />
        </Link>
      </div>
    </div>
  );
};

export default TaskList;
