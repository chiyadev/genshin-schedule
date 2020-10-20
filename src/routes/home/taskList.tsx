import { h } from "preact";
import { Task, useConfig } from "../../configs";
import Map from "../../map";
import { css, cx } from "emotion";
import { FaAngleRight, FaTimes } from "react-icons/fa";
import { Link } from "preact-router";
import SectionHeading from "./sectionHeading";
import WhiteCard from "../../whiteCard";
import { useServerDate } from "../../time";
import { StateUpdater, useMemo } from "preact/hooks";
import { memo } from "preact/compat";

const TaskList = () => {
  const [tasks, setTasks] = useConfig("tasks");
  const date = useServerDate(60000);

  const filtered = useMemo(() => {
    return tasks
      .filter(task => task.dueTime <= date.getTime())
      .sort((a, b) => {
        const icon = a.icon.localeCompare(b.icon);
        if (icon !== 0) return icon;

        return a.dueTime + a.refreshTime - b.dueTime - b.refreshTime;
      });
  }, [date, tasks]);

  return (
    <div className="space-y-4">
      <SectionHeading>Today&apos;s Tasks</SectionHeading>

      <div>
        {useMemo(
          () =>
            filtered.length ? (
              <WhiteCard divide>
                {filtered.map(task => (
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
                <FaTimes className="inline" /> Nothing. Create a task by
                clicking on the map.
              </div>
            ),
          [filtered, setTasks]
        )}
      </div>

      <MapDisplay />
    </div>
  );
};

const TaskDisplay = ({ task }: { task: Task; setTask: StateUpdater<Task> }) => {
  const [, setMapState] = useConfig("mapState");
  const [, setFocusedTask] = useConfig("mapFocusedTask");

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

export default memo(TaskList);
