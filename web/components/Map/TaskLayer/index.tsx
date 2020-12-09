import React, { memo, useEffect, useMemo } from "react";
import { useConfig } from "../../../utils/configs";
import TaskMarker from "../TaskMarker";
import Footer from "./Footer";
import { useFilteredTasks, useTaskSetters } from "../../../utils/tasks";
import { useMap } from "react-leaflet";
import { useHotkeys } from "react-hotkeys-hook";

const TaskLayer = () => {
  const map = useMap();
  const [focused, setFocused] = useConfig("mapFocusedTask");
  const tasks = useFilteredTasks();
  const taskSetters = useTaskSetters(tasks);

  useEffect(() => {
    !focused && map.closePopup();
  }, [focused, map]);

  useHotkeys("esc", (e) => {
    setFocused(false);
    e.preventDefault();
  });

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
