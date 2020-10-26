import { Task } from "../../configs";
import { StateUpdater } from "preact/hooks";
import { useServerDate } from "../../time";
import { useLeaflet } from "react-leaflet";
import { FaCheck, FaTimes } from "react-icons/fa";
import { h } from "preact";
import { memo } from "preact/compat";

const Done = ({
  task,
  setTask
}: {
  task: Task;
  setTask: StateUpdater<Task>;
}) => {
  const date = useServerDate(1000);
  const leaflet = useLeaflet();

  if (task.dueTime <= date.getTime()) {
    return (
      <div
        className="cursor-pointer text-green-600"
        onClick={() => {
          setTask(task => ({
            ...task,
            dueTime: date.getTime() + task.refreshTime
          }));

          leaflet.map?.closePopup();
        }}
      >
        <FaCheck className="inline" />
        <span className="align-middle"> Mark as done</span>
      </div>
    );
  } else {
    return (
      <div
        className="cursor-pointer text-red-600"
        onClick={() => {
          setTask(task => ({
            ...task,
            dueTime: date.getTime()
          }));

          leaflet.map?.closePopup();
        }}
      >
        <FaTimes className="inline" />
        <span className="align-middle"> Mark as to-do</span>
      </div>
    );
  }
};

export default memo(Done);
