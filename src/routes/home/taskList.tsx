import { h } from "preact";

import { Task, useConfig } from "../../configs";
import { FaCheck, FaTimes } from "react-icons/fa";
import SectionHeading from "./sectionHeading";
import { useServerDate } from "../../time";
import { StateUpdater } from "preact/hooks";
import { memo } from "preact/compat";
import TaskListCard, { useCurrentTasks } from "../../taskListCard";

const TaskList = () => {
  const tasks = useCurrentTasks();
  const [, setTasks] = useConfig("tasks");

  return (
    <div className="space-y-4">
      <SectionHeading>
        Today&apos;s Tasks{tasks.length !== 0 && <span> ({tasks.length})</span>}
      </SectionHeading>

      {tasks.length ? (
        <div className="space-y-1">
          <TaskListCard />

          <div className="text-right text-xs">
            <MarkEverythingDone setTasks={setTasks} />
          </div>
        </div>
      ) : (
        <div className="text-sm">
          <FaTimes className="inline" /> No tasks for now. Create one by
          clicking on the map.
        </div>
      )}
    </div>
  );
};

const MarkEverythingDone = ({
  setTasks
}: {
  setTasks: StateUpdater<Task[]>;
}) => {
  const date = useServerDate(1000);

  return (
    <span
      className="cursor-pointer"
      onClick={() => {
        setTasks(tasks =>
          tasks.map(task => {
            if (task.dueTime <= date.getTime()) {
              return {
                ...task,
                dueTime: date.getTime() + task.refreshTime
              };
            } else {
              return task;
            }
          })
        );
      }}
    >
      <span className="align-middle">Mark everything as done </span>
      <FaCheck className="inline" />
    </span>
  );
};

export default memo(TaskList);
