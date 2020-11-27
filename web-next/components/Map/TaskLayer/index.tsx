import React, { Dispatch, memo, SetStateAction, useMemo } from "react";
import { Task, useConfig } from "../../../utils/configs";
import TaskMarker from "../TaskMarker";
import Footer from "./Footer";

const TaskLayer = () => {
  const [tasks, setTasks] = useConfig("tasks");

  const taskSetters: Dispatch<SetStateAction<Task>>[] = useMemo(() => {
    return tasks.map((task) => {
      return (newTask) => {
        setTasks((tasks) =>
          tasks.map((oldTask) => {
            if (oldTask.id === task.id) {
              if (typeof newTask === "function") {
                return newTask(oldTask);
              } else {
                return newTask;
              }
            } else {
              return oldTask;
            }
          })
        );
      };
    });
  }, [tasks, setTasks]);

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
