import React, { Dispatch, memo, SetStateAction } from "react";
import { Task, useConfig } from "../configs";
import GameImage from "../gameImage";
import { trackEvent } from "../track";
import Done from "./done";

const Item = ({
  task,
  setTask,
}: {
  task: Task;
  setTask: Dispatch<SetStateAction<Task>>;
}) => {
  const [, setMapState] = useConfig("mapState");
  const [, setFocusedTask] = useConfig("mapFocusedTask");

  return (
    <div
      className="py-2 flex flex-row space-x-2 cursor-pointer"
      onClick={() => {
        setMapState({
          lat: task.location.lat + 1.2,
          lng: task.location.lng,
          zoom: 5.6,
        });
        setFocusedTask(task.id);

        trackEvent("taskList", "taskFocus");
      }}
    >
      <div className="flex flex-col justify-center flex-shrink-0">
        <GameImage name={task.icon} className="w-8 h-8 object-contain" />
      </div>

      <div className="flex flex-col flex-1 justify-center">
        <div className="font-bold">{task.name}</div>

        {task.description && (
          <div className="text-xs text-gray-600">{task.description}</div>
        )}
      </div>

      <div className="flex-shrink-0 flex flex-col justify-center">
        <Done setTask={setTask} />
      </div>
    </div>
  );
};

export default memo(Item);
