import React, { memo, SetStateAction, useCallback, useMemo } from "react";
import WhiteCard from "../WhiteCard";
import { useDueTasks, useFilteredTasks, useTaskDoneSetter, useTaskFocusSetter } from "../../utils/tasks";
import Item from "./Item";
import { Task, useConfig } from "../../utils/config";
import { useHotkeys } from "react-hotkeys-hook";
import { trackEvent } from "../../utils/umami";
import { useListDispatch } from "../../utils/dispatch";

const TaskListCard = ({ onItemClick }: { onItemClick?: (task: Task) => void }) => {
  const [tasks, setTasks] = useConfig("tasks");
  const dueTasks = useDueTasks(useFilteredTasks(tasks));
  const taskDispatches = useListDispatch(dueTasks, setTasks);

  const [focused] = useConfig("mapFocusedTask");
  const setFocused = useTaskFocusSetter();

  const focusNext = useCallback(() => {
    if (focused) {
      setFocused(dueTasks[(dueTasks.findIndex((task) => task.id === focused) + 1) % dueTasks.length]);
    } else {
      setFocused(dueTasks[0]);
    }
  }, [focused, setFocused, dueTasks]);

  const focusPrevious = useCallback(() => {
    if (focused) {
      setFocused(dueTasks[(dueTasks.length + dueTasks.findIndex((task) => task.id === focused) - 1) % dueTasks.length]);
    } else {
      setFocused(dueTasks[0]);
    }
  }, [focused, setFocused, dueTasks]);

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

  useHotkeys(
    "n",
    (e) => {
      focusNext();
      trackEvent("taskList", "taskFocusNext");

      e.preventDefault();
    },
    [focusNext]
  );

  useHotkeys(
    "shift+n",
    (e) => {
      focusPrevious();
      trackEvent("taskList", "taskFocusPrevious");

      e.preventDefault();
    },
    [focusPrevious]
  );

  useHotkeys(
    "d",
    (e) => {
      focusedDone();
      trackEvent("taskList", "taskDoneNext");

      e.preventDefault();
    },
    [focusedDone]
  );

  return (
    <WhiteCard divide>
      {useMemo(
        () =>
          taskDispatches.map(([task, setTask]) => (
            <Item key={task.id} task={task} setTask={setTask} onTaskClick={onItemClick} />
          )),
        [taskDispatches, onItemClick]
      )}
    </WhiteCard>
  );
};

export default memo(TaskListCard);
