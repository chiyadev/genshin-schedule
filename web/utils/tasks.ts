import { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { DefaultConfigs, Task, useConfig, useSync } from "./configs";
import { useRouter } from "next/router";
import { randomStr } from "./index";
import { getServerResetTime, useServerTime } from "./time";
import { IconNames } from "../components/Map/TaskMarker/IconPage/search";

const iconIndexes = IconNames.reduce((a, b, i) => {
  a[b] = i;
  return a;
}, {} as Record<string, number>);

export function useDueTasks() {
  const [tasks] = useConfig("tasks");
  const time = useServerTime(60000);

  return useMemo(() => {
    return tasks
      .filter((task) => task.visible && task.dueTime <= time.valueOf())
      .sort((a, b) => {
        const icon = iconIndexes[a.icon] - iconIndexes[b.icon];
        if (icon) return icon;

        return a.dueTime - b.dueTime;
      });
  }, [time, tasks]);
}

export function useTaskCreator() {
  const router = useRouter();
  const { synchronize } = useSync();

  const [center] = useConfig("mapState");
  const [, setTask] = useConfig("mapCreateTask");

  return useCallback(
    async (material: { name: string; item?: string }, description?: string, openMap = true) => {
      setTask((task) => ({
        ...task,
        id: randomStr(6),
        location: {
          lat: center.lat - 1.5,
          lng: center.lng,
        },
        name: material.name,
        icon: material.item || material.name,
        description,
        visible: false,
      }));

      await synchronize();

      openMap && (await router.push("/map"));
    },
    [router, center, setTask, synchronize]
  );
}

export function useTaskSetters(
  tasks: Task[],
  setTasks: Dispatch<SetStateAction<Task[]>>
): Dispatch<SetStateAction<Task>>[] {
  return useMemo(() => {
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
}

export function useTaskFocusSetter() {
  const [defaultZoom] = useConfig("mapTaskDefaultZoom");
  const [, setMapState] = useConfig("mapState");
  const [, setFocused] = useConfig("mapFocusedTask");

  return useCallback(
    (task?: Task) => {
      if (task) {
        setMapState({
          lat: task.location.lat + 1.6 + DefaultConfigs.mapTaskDefaultZoom - defaultZoom,
          lng: task.location.lng,
          zoom: defaultZoom,
        });

        setFocused(task.id);
      } else {
        setFocused(false);
      }
    },
    [defaultZoom, setMapState, setFocused]
  );
}

export function useTaskDoneSetter(setTask: Dispatch<SetStateAction<Task>>) {
  const time = useServerTime(1000);

  return useCallback(
    (done: boolean) => {
      if (done) {
        setTask((task) => ({
          ...task,
          dueTime:
            task.refreshTime === "reset" ? getServerResetTime(time).valueOf() : time.plus(task.refreshTime).valueOf(),
        }));
      } else {
        setTask((task) => ({
          ...task,
          dueTime: time.valueOf(),
        }));
      }
    },
    [time, setTask]
  );
}
