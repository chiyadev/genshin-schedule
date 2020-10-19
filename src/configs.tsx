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
};

export function useTaskInfo(id: string) {
  return useLocalStorage<Task>(`task_${id}`, {
    id,
    name: "",
    icon: "",
    location: { lat: 0, lng: 0 }
  });
}
