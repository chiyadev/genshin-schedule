import { FaCheck } from "react-icons/fa";
import React, { Dispatch, memo, SetStateAction, useState } from "react";
import { Task } from "../configs";
import { useServerDate } from "../time";
import { trackEvent } from "../track";
import { cx } from "emotion";

const Done = ({ setTask }: { setTask: Dispatch<SetStateAction<Task>> }) => {
  const date = useServerDate(1000);
  const [hover, setHover] = useState(false);

  return (
    <div
      className={cx(
        "border rounded-full p-2",
        hover ? "border-green-600" : "border-gray-300"
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={(e) => {
        setTask((task) => ({
          ...task,
          dueTime: date.getTime() + task.refreshTime,
        }));

        trackEvent("taskList", "taskDone");

        e.stopPropagation();
      }}
    >
      <FaCheck className="text-green-600" />
    </div>
  );
};

export default memo(Done);
