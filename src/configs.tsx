import { ResinCap } from "./db/resins";
import { StateUpdater, useCallback, useEffect, useState } from "preact/hooks";

export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, StateUpdater<T>] {
  const getValue = useCallback(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || "") as T;
    } catch {
      return defaultValue;
    }
  }, [key, defaultValue]);

  const [value, setValue] = useState(getValue);

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === key) {
        setValue(getValue());
      }
    };

    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [key, getValue]);

  return [
    value,
    useCallback(
      newValue => {
        if (typeof newValue === "function") {
          newValue = (newValue as any)(getValue());
        }

        localStorage.setItem(key, JSON.stringify(newValue));
      },
      [key, getValue]
    )
  ];
}

type MapLocation = { lat: number; lng: number };

export type Configs = {
  server: "America" | "Europe" | "Asia";
  offsetDays: number;
  resin: {
    value: number;
    time: number;
  };
  characters: string[];
  weapons: string[];
  tasks: Task[];
  customizeQuery: string;
  mapState: MapLocation & { zoom: number };
  mapCreateTask: Task & { visible: boolean };
  paimonBg: boolean;
  showSiteInfo: boolean;
};

type Task = {
  id: string;
  icon: string;
  name: string;
  description?: string;
  location: MapLocation;
  dueTime: number;
  refreshTime: number;
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
  tasks: [],
  customizeQuery: "",
  mapState: {
    lat: -24.83,
    lng: 54.73,
    zoom: 5.6
  },
  mapCreateTask: {
    id: "temp",
    name: "Iron Chunk",
    icon: "Iron Chunk",
    location: { lat: 0, lng: 0 },
    dueTime: 0,

    refreshTime: 86400000,
    visible: false
  },
  paimonBg: false,
  showSiteInfo: true
};

export function useConfig<TKey extends keyof Configs>(key: TKey) {
  return useLocalStorage<Configs[TKey]>(key, DefaultConfigs[key]);
}
