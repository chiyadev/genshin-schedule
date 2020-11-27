import { useMemo } from "react";
import { useServerDate } from "./time";
import { useConfig } from "./configs";

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
