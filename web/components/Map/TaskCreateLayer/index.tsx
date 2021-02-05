import React, { memo } from "react";
import { useConfig } from "../../../utils/config";
import TaskMarker from "../TaskMarker";
import CreateButton from "./CreateButton";
import { useMapEvent } from "react-leaflet";
import { randomStr } from "../../../utils";

const TaskCreateLayer = () => {
  const [task, setTask] = useConfig("mapCreateTask");

  useMapEvent("click", ({ latlng }) => {
    setTask((task) => ({
      ...task,
      id: randomStr(6),
      location: latlng,
      visible: true,
    }));
  });

  if (!task.visible) {
    return null;
  }

  return (
    <TaskMarker
      autoPan
      task={task}
      setTask={(newTask) => {
        setTask((oldTask) => {
          if (typeof newTask === "function") {
            newTask = newTask(oldTask);
          }

          return { ...oldTask, ...newTask };
        });
      }}
      alwaysOpen
      showDue={false}
      onClose={() => setTask((task) => ({ ...task, visible: false }))}
      footer={<CreateButton />}
    />
  );
};

export default memo(TaskCreateLayer);
