import { useLocalStorage } from "@rehooks/local-storage";
import { ResinCap } from "./db/resins";

export type Configs = {
  server: "America" | "Europe" | "Asia";
  offsetDays: number;
  resin: {
    value: number;
    time: number;
  };
  characters: string[];
  weapons: string[];
  taskIds: string[];
  customizeQuery: string;
  mapState: { lat: number; lng: number; zoom: number };
  mapCreateTask: Task | null;
  mapDefaultTask: Pick<Task, "name" | "icon" | "refreshTime">;
  paimonBg: boolean;
  showSiteInfo: boolean;
};

export const DefaultConfigs: Configs = {
  server: "America",
  offsetDays: 0,
  resin: {
    value: ResinCap,
    time: 0
  },
  characters: [],
  weapons: [],
  taskIds: [],
  customizeQuery: "",
  mapState: {
    lat: -24.83,
    lng: 54.73,
    zoom: 5.6
  },
  mapCreateTask: null,
  mapDefaultTask: {
    name: "Iron Chunk",
    icon: "Iron Chunk",
    refreshTime: 86400000
  },

  paimonBg: false,
  showSiteInfo: true
};

export function useConfig<TKey extends keyof Configs>(key: TKey) {
  return useLocalStorage<Configs[TKey]>(key, DefaultConfigs[key]);
}

export type Task = {
  id: string;
  icon: string;
  name: string;
  description?: string;
  location: { lat: number; lng: number };
  dueTime: number;
  refreshTime: number;
};

export function useTaskInfo(id: string) {
  return useLocalStorage<Task>(`task_${id}`, {
    id,
    ...DefaultConfigs.mapDefaultTask,

    location: { lat: 0, lng: 0 },
    dueTime: 0
  });
}

export function useTaskCreator() {
  const [tasks, setTasks] = useConfig("taskIds");

  return (task: Task) => {
    localStorage.setItem(`task_${task.id}`, JSON.stringify(task));
    setTasks([...tasks, task.id].filter((v, i, a) => a.indexOf(v) === i));
  };
}
