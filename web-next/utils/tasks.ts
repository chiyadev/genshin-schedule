import { useCallback, useMemo } from "react";
import { useServerDate } from "./time";
import { useConfig } from "./configs";
import { useRouter } from "next/router";
import { randomStr } from "./index";

export function useDueTasks() {
  const [tasks] = useConfig("tasks");
  const date = useServerDate(60000);

  return useMemo(() => {
    return tasks
      .filter((task) => task.visible && task.dueTime <= date.getTime())
      .sort((a, b) => {
        const icon = a.icon.localeCompare(b.icon);
        if (icon) return icon;

        return a.dueTime + a.refreshTime - b.dueTime - b.refreshTime;
      });
  }, [date, tasks]);
}

export function useTaskCreator() {
  const router = useRouter();

  const [center] = useConfig("mapState");
  const [, setTask] = useConfig("mapCreateTask");

  return useCallback(
    async (material: { name: string; item?: string }, description?: string, openMap = true) => {
      // todo: this is broken
      setTask((task) => ({
        ...task,
        id: randomStr(6),
        location: center,
        name: material.name,
        icon: material.item || material.name,
        description,
        visible: true,
      }));

      openMap && (await router.push("/map"));
    },
    [router, center, setTask]
  );
}
