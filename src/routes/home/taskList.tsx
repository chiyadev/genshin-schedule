import { h } from "preact";
import { useConfig } from "../../configs";
import Map from "../../map";
import { css, cx } from "emotion";
import { FaAngleRight, FaTimes } from "react-icons/fa";
import { Link } from "preact-router";
import SectionHeading from "./sectionHeading";

const TaskList = () => {
  const [tasks, setTasks] = useConfig("taskIds");

  return (
    <div className="space-y-4">
      <SectionHeading>Today&apos;s Tasks</SectionHeading>

      {tasks.length ? (
        <div className="space-y-4 flex flex-col">
          {tasks.map(task => (
            <TaskDisplay key={task} id={task} />
          ))}
        </div>
      ) : (
        <div className="text-sm">
          <FaTimes className="inline" /> Nothing. Create a task by opening the
          map.
        </div>
      )}

      <MapDisplay />
    </div>
  );
};

const TaskDisplay = ({ id }: { id: string }) => {
  //const [task, setTask] = useConfig();
  return null;
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
