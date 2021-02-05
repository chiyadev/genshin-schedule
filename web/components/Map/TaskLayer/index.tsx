import React, { memo, useEffect, useMemo } from "react";
import { useConfig } from "../../../utils/config";
import TaskMarker from "../TaskMarker";
import Footer from "./Footer";
import { useFilteredTasks } from "../../../utils/tasks";
import { useMap } from "react-leaflet";
import { useHotkeys } from "react-hotkeys-hook";
import { useListDispatch } from "../../../utils/dispatch";

const TaskLayer = () => {
  const map = useMap();
  const [focused, setFocused] = useConfig("mapFocusedTask");
  const [tasks, setTasks] = useConfig("tasks");
  const taskDispatches = useListDispatch(useFilteredTasks(tasks), setTasks);

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
          taskDispatches.map(([task, setTask]) => (
            <TaskMarker key={task.id} task={task} setTask={setTask} footer={<Footer task={task} setTask={setTask} />} />
          )),
        [taskDispatches]
      )}
    </>
  );
};

export default memo(TaskLayer);
