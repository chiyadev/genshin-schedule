import React, { Dispatch, memo, SetStateAction, useMemo } from "react";
import WhiteCard from "../WhiteCard";
import { useDueTasks } from "../../utils/tasks";
import Item from "./Item";
import { Task, useConfig } from "../../utils/configs";

const TaskListCard = ({ onTaskClick }: { onTaskClick?: (task: Task) => void }) => {
  const tasks = useDueTasks();
  const [, setTasks] = useConfig("tasks");

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
    <WhiteCard divide>
      {useMemo(
        () =>
          tasks.map((task, i) => <Item key={task.id} task={task} setTask={taskSetters[i]} onTaskClick={onTaskClick} />),
        [taskSetters, tasks, onTaskClick]
      )}
    </WhiteCard>
  );
};

export default memo(TaskListCard);
