import { ResinCap } from "./db/resins";
import { StateUpdater, useCallback, useEffect, useState } from "preact/hooks";
import { MultiMap } from "./multiMap";

type StorageEventCallback = (value: unknown, parsed: boolean) => void;
const storageEvents = new MultiMap<string, StorageEventCallback>();

window.addEventListener("storage", ev => {
  if (ev.key) {
    let value: unknown;
    let parsed = false;

    // parse only once for performance
    try {
      value = JSON.parse(ev.newValue || "");
      parsed = true;
    } catch {
      value = ev.newValue;
    }

    for (const callback of storageEvents.get(ev.key)) {
      callback(value, parsed);
    }
  }
});

export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, StateUpdater<T>] {
  // returns the latest parsed value or hook default
  const getCurrent = useCallback(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || "") as T;
    } catch {
      return defaultValue;
    }
  }, [key, defaultValue]);

  const [value, setValue] = useState(getCurrent);

  useEffect(() => {
    const handler: StorageEventCallback = (value, parsed) => {
      if (parsed) {
        setValue(value as T);
      } else {
        setValue(defaultValue);
      }
    };

    storageEvents.add(key, handler);

    return () => {
      storageEvents.remove(key, handler);
    };
  }, [key, defaultValue]);

  return [
    value,
    useCallback(
      newValue => {
        // pass latest parsed value if partial updating
        if (typeof newValue === "function") {
          newValue = (newValue as any)(getCurrent());
        }

        localStorage.setItem(key, JSON.stringify(newValue));

        // synchronize value across all hooks
        for (const callback of storageEvents.get(key)) {
          callback(newValue, true);
        }
      },
      [key, getCurrent]
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
  iconQuery: string;
  mapState: MapLocation & { zoom: number };
  mapCreateTask: Task & { visible: boolean };
  mapFocusedTask: string | false;
  mapTaskList: boolean;
  paimonBg: boolean;
  showSiteInfo: boolean;
};

export type Task = {
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
  iconQuery: "",
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
  mapFocusedTask: false,
  mapTaskList: true,
  paimonBg: false,
  showSiteInfo: true
};

export function useConfig<TKey extends keyof Configs>(key: TKey) {
  return useLocalStorage<Configs[TKey]>(key, DefaultConfigs[key]);
}
