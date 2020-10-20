import { h } from "preact";
import { useConfig, useTaskInfo } from "../../configs";
import Map from "../../map";
import { css, cx } from "emotion";
import { FaAngleRight, FaTimes } from "react-icons/fa";
import { Link } from "preact-router";
import SectionHeading from "./sectionHeading";
import WhiteCard from "../../whiteCard";
import { useRerenderFrequency, useServerDate } from "../../time";

const TaskList = () => {
  const [tasks] = useConfig("taskIds");

  return (
    <div className="space-y-4">
      <SectionHeading>Today&apos;s Tasks</SectionHeading>

      <div>
        {tasks.length ? (
          <WhiteCard divide>
            {tasks.map(task => (
              <TaskDisplay key={task} id={task} />
            ))}
          </WhiteCard>
        ) : (
          <div className="text-sm">
            <FaTimes className="inline" /> Nothing. Create a task by opening the
            map.
          </div>
        )}
      </div>

      <MapDisplay />
    </div>
  );
};

const TaskDisplay = ({ id }: { id: string }) => {
  const [task, setTask] = useTaskInfo(id);

  const date = useServerDate();
  useRerenderFrequency(1000);

  if (date.getTime() < task.dueTime) {
    return null;
  }

  return (
    <div className="py-2 flex flex-row space-x-2 cursor-pointer">
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
