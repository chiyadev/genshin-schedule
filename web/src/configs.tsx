import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { ResinCap } from "./db/resins";
import { MultiMap } from "./multiMap";

const storageEvents = new MultiMap<
  string,
  (value: unknown, parsed: boolean) => void
>();

const storageEventsAny = new Set<
  (key: string, value: unknown, parsed: boolean) => void
>();

function invokeStorageListeners(key: string, value: unknown, parsed: boolean) {
  storageEvents.get(key).forEach((c) => c(value, parsed));
  storageEventsAny.forEach((c) => c(key, value, parsed));
}

window.addEventListener("storage", (ev) => {
  if (!ev.key) return;

  const key = ev.key || "";
  let value: unknown;
  let parsed = false;

  try {
    value = JSON.parse(ev.newValue || "");
    parsed = true;
  } catch {
    value = ev.newValue;
  }

  invokeStorageListeners(key, value, parsed);
});

export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>] {
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
    const handler = (value: unknown, parsed: boolean) => {
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
      (newValue) => {
        if (typeof newValue === "function") {
          newValue = (newValue as any)(getCurrent());
        }

        localStorage.setItem(key, JSON.stringify(newValue));
        invokeStorageListeners(key, newValue, true);
      },
      [key, getCurrent]
    ),
  ];
}

export function useLocalStorageListener(
  callback: (key: string, value: unknown) => void
) {
  useEffect(() => {
    const handler = (key: string, value: unknown, parsed: boolean) => {
      parsed && callback(key, value);
    };

    storageEventsAny.add(handler);

    return () => {
      storageEventsAny.delete(handler);
    };
  }, [callback]);
}

export type LocalConfigs = {
  apiUrl: string;
  auth:
    | false
    | {
        token: string;
        username: string;
      };
};

export const DefaultLocalConfigs: LocalConfigs = {
  apiUrl: "https://genshin.chiya.dev/api/v1",
  auth: false,
};

type MapLocation = { lat: number; lng: number };

export type Configs = {
  server: "America" | "Europe" | "Asia";
  offsetDays: number;
  resin: {
    value: number;
    time: number;
  };
  resinEstimateMode: "time" | "value";
  characters: string[];
  weapons: string[];
  artifacts: string[];
  itemNotes: { [key: string]: string };
  tasks: Task[];
  customizeQuery: string;
  iconQuery: string;
  iconListScroll: number;
  mapState: MapLocation & { zoom: number };
  mapCreateTask: Task;
  mapFocusedTask: string | false;
  mapTaskList: boolean;
  paimonBg: boolean;
  hiddenWidgets: {
    [key in
      | "clock"
      | "info"
      | "sync"
      | "resin"
      | "tasks"
      | "domains"]?: boolean;
  };
};

export type Task = {
  id: string;
  icon: string;
  name: string;
  description?: string;
  visible: boolean;
  location: MapLocation;
  dueTime: number;
  refreshTime: number;
};

const defaultMapCenter = {
  lat: -24.83,
  lng: 54.73,
};

export const DefaultConfigs: Configs = {
  server: "America",
  offsetDays: 0,
  resin: {
    value: ResinCap,
    time: 0,
  },
  resinEstimateMode: "time",
  characters: [],
  weapons: [],
  artifacts: [],
  itemNotes: {},
  tasks: [],
  customizeQuery: "",
  iconQuery: "",
  iconListScroll: 0,
  mapState: {
    ...defaultMapCenter,
    zoom: 5,
  },
  mapCreateTask: {
    id: "temp",
    name: "Iron Chunk",
    icon: "Iron Chunk",
    location: defaultMapCenter,
    dueTime: 0,
    refreshTime: 86400000,
    visible: false,
  },
  mapFocusedTask: false,
  mapTaskList: true,
  paimonBg: true,
  hiddenWidgets: {},
};

export function useLocalConfig<TKey extends keyof LocalConfigs>(key: TKey) {
  return useLocalStorage<LocalConfigs[TKey]>(key, DefaultLocalConfigs[key]);
}

export function useConfig<TKey extends keyof Configs>(key: TKey) {
  return useLocalStorage<Configs[TKey]>(key, DefaultConfigs[key]);
}

export const ConfigKeys = Object.keys(DefaultConfigs) as (keyof Configs)[];

export function getConfigs(): Partial<Configs> {
  const configs: Partial<Configs> = {};

  for (const key of ConfigKeys) {
    try {
      const data = localStorage.getItem(key);

      if (data) {
        configs[key] = JSON.parse(data);
      }
    } catch {
      // ignored
    }
  }

  return configs;
}

export function setConfigs(configs: Partial<Configs>) {
  for (const key of ConfigKeys) {
    const data = configs[key];

    if (typeof data !== "undefined") {
      localStorage.setItem(key, JSON.stringify(data));
      invokeStorageListeners(key, data, true);
    }
  }
}
