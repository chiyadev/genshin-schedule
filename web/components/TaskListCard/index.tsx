import React, { memo, SetStateAction, useCallback, useMemo } from "react";
import WhiteCard from "../WhiteCard";
import { useDueTasks, useTaskDoneSetter, useTaskFocusSetter, useTaskSetters } from "../../utils/tasks";
import Item from "./Item";
import { Task, useConfig } from "../../utils/configs";
import { useHotkeys } from "react-hotkeys-hook";

const TaskListCard = ({ onItemClick }: { onItemClick?: (task: Task) => void }) => {
  const tasks = useDueTasks();
  const [, setTasks] = useConfig("tasks");
  const taskSetters = useTaskSetters(tasks, setTasks);

  const [focused] = useConfig("mapFocusedTask");
  const setFocused = useTaskFocusSetter();

  const focusNext = useCallback(() => {
    if (focused) {
      setFocused(tasks[(tasks.findIndex((task) => task.id === focused) + 1) % tasks.length]);
    } else {
      setFocused(tasks[0]);
    }
  }, [focused, setFocused, tasks]);

  const focusPrevious = useCallback(() => {
    if (focused) {
      setFocused(tasks[(tasks.length + tasks.findIndex((task) => task.id === focused) - 1) % tasks.length]);
    } else {
      setFocused(tasks[0]);
    }
  }, [focused, setFocused, tasks]);

  const setFocusedTask = useCallback(
    (newTask: SetStateAction<Task>) => {
      setTasks((tasks) => {
        return tasks.map((task) => {
          if (task.id === focused) {
            if (typeof newTask === "function") {
              return newTask(task);
            } else {
              return newTask;
            }
          } else {
            return task;
          }
        });
      });
    },
    [setTasks, focused]
  );

  const setFocusedDone = useTaskDoneSetter(setFocusedTask);

  const focusedDone = useCallback(() => {
    if (focused) {
      setFocusedDone(true);
      focusNext();
    }
  }, [setFocusedDone, focused, focusNext]);

  useHotkeys("n", focusNext, [focusNext]);
  useHotkeys("shift+n", focusPrevious, [focusPrevious]);

  useHotkeys("d", focusedDone, [focusedDone]);

  return (
    <WhiteCard divide>
      {useMemo(
        () =>
          tasks.map((task, i) => <Item key={task.id} task={task} setTask={taskSetters[i]} onTaskClick={onItemClick} />),
        [tasks, taskSetters, onItemClick]
      )}
    </WhiteCard>
  );
};

export default memo(TaskListCard);
