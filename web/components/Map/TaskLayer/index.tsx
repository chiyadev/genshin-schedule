import React, { memo, useEffect, useMemo } from "react";
import { useConfig } from "../../../utils/configs";
import TaskMarker from "../TaskMarker";
import Footer from "./Footer";
import { useTaskSetters } from "../../../utils/tasks";
import { useMap } from "react-leaflet";
import { useHotkeys } from "react-hotkeys-hook";

const TaskLayer = () => {
  const map = useMap();
  const [focused, setFocused] = useConfig("mapFocusedTask");
  const [tasks, setTasks] = useConfig("tasks");
  const taskSetters = useTaskSetters(tasks, setTasks);

  useEffect(() => {
    !focused && map.closePopup();
  }, [focused, map]);

  useHotkeys("esc", () => setFocused(false));

  return (
    <>
      {useMemo(
        () =>
          tasks.map((task, i) => (
            <TaskMarker
              key={task.id}
              task={task}
              setTask={taskSetters[i]}
              footer={<Footer task={task} setTask={taskSetters[i]} />}
            />
          )),
        [taskSetters, tasks]
      )}
    </>
  );
};

export default memo(TaskLayer);
