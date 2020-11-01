import React, { Dispatch, memo, SetStateAction } from "react";
import { Task } from "../../configs";
import { useServerDate } from "../../time";
import { useLeaflet } from "react-leaflet";
import { FaCheck, FaTimes } from "react-icons/fa";
import { trackEvent } from "../../track";

const Done = ({
  task,
  setTask,
}: {
  task: Task;
  setTask: Dispatch<SetStateAction<Task>>;
}) => {
  const date = useServerDate(1000);
  const leaflet = useLeaflet();

  if (task.dueTime <= date.getTime()) {
    return (
      <div
        className="cursor-pointer text-green-600"
        onClick={() => {
          setTask((task) => ({
            ...task,
            dueTime: date.getTime() + task.refreshTime,
          }));

          leaflet.map?.closePopup();

          trackEvent("map", "taskDone");
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
          setTask((task) => ({
            ...task,
            dueTime: date.getTime(),
          }));

          leaflet.map?.closePopup();

          trackEvent("map", "taskUndone");
        }}
      >
        <FaTimes className="inline" />
        <span className="align-middle"> Mark as to-do</span>
      </div>
    );
  }
};

export default memo(Done);
