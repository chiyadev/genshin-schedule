import { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { randomStr } from "./random";
import { useConfig } from "./configs";
import { useServerDate } from "./time";

export function arrayToggle<T>(array: T[], value: T, state: boolean) {
  if (state) {
    return [...array, value].filter((v, i, a) => a.indexOf(v) === i);
  } else {
    return array.filter((v) => v !== value);
  }
}

export function useTabTitle(...parts: (string | undefined)[]) {
  useEffect(() => {
    document.title = [
      ...parts.map((p) => p?.trim()).filter((p) => p),
      "Genshin Schedule",
    ].join(" · ");
  });
}

export function useMeasuredTextWidth(className: string, text: string) {
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    setUpdate((i) => i + 1);

    // attempt to fix https://github.com/chiyadev/genshin-schedule/issues/2
    if ("fonts" in document) {
      (document as any).fonts.ready.then(() => setUpdate((i) => i + 1));
    }

    // font api is unreliable so force rerender periodically
    const interval = window.setInterval(() => setUpdate((i) => i + 1), 1000);

    return () => clearInterval(interval);
  }, []);

  return useMemo(() => {
    const span = document.createElement("span");
    span.className = className;
    span.innerText = text;

    document.body.appendChild(span);
    const width = span.getBoundingClientRect().width;
    document.body.removeChild(span);

    return width;
  }, [update, className, text]); // eslint-disable-line react-hooks/exhaustive-deps
}

export function useDueTasks() {
  const [tasks] = useConfig("tasks");
  const date = useServerDate(60000);

  return useMemo(() => {
    return tasks
      .filter((task) => task.dueTime <= date.getTime())
      .sort((a, b) => {
        const icon = a.icon.localeCompare(b.icon);
        if (icon !== 0) return icon;

        return a.dueTime + a.refreshTime - b.dueTime - b.refreshTime;
      });
  }, [date, tasks]);
}

export function useTaskCreator() {
  const [center] = useConfig("mapState");
  const [, setTask] = useConfig("mapCreateTask");

  const { push } = useHistory();

  return (
    material: { name: string; item?: string },
    description?: string,
    openMap?: boolean
  ) => {
    setTask((task) => ({
      ...task,
      id: randomStr(6),
      location: center,
      name: material.name,
      icon: material.item || material.name,
      description,
      visible: true,
    }));

    openMap && push("/map");
  };
}
