import {
  createContext,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ResinCap } from "../db/resins";
import { createApiClient, Notification, setAuthToken } from "./api";
import { MultiMap } from "./multiMap";
import { useListItemDispatch } from "./dispatch";
import { ServerResetHour, useServerTime } from "./time";
import { DateTime } from "luxon";

type MapLocation = { lat: number; lng: number };

export const MapZoomMin = 4;
export const MapZoomMax = 7;

export type Configs = {
  server: "America" | "Europe" | "Asia" | "TW, HK, MO";
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
  taskQuery: string;
  customizeQuery: string;
  iconQuery: string;
  iconListScroll: number;
  mapState: MapLocation & { zoom: number };
  mapTaskDefaultZoom: number;
  mapCreateTask: Task;
  mapFocusedTask: string | false;
  mapTaskList: boolean;
  background: "paimon" | "klee" | "zhongli" | "none";
  hiddenWidgets: {
    [key in "signIn" | "clock" | "info" | "sync" | "resin" | "tasks" | "domains"]?: boolean;
  };
  tutorial: boolean;
  lastChangelog: number;
  stats: StatFrame[];
  statRetention: number;
  charactersWeekly: string[];
  domainFilters: ("character" | "weapon" | "artifact")[];
  theme: "light" | "dark";
};

export type Task = {
  id: string;
  icon: string;
  name: string;
  description?: string;
  visible: boolean;
  location: MapLocation;
  dueTime: number;
  refreshTime: number | "reset";
  notify?: boolean;
};

export type StatFrame = {
  id: string;
  time: number;
  resinsSpent: number;
  tasksDone: number;
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
    time: Date.now(),
  },
  resinEstimateMode: "time",
  characters: [],
  weapons: [],
  artifacts: [],
  itemNotes: {},
  tasks: [],
  taskQuery: "",
  customizeQuery: "",
  iconQuery: "",
  iconListScroll: 0,
  mapState: {
    ...defaultMapCenter,
    zoom: 5,
  },
  mapTaskDefaultZoom: 5.6,
  mapCreateTask: {
    id: "temp",
    name: "Iron Chunk",
    icon: "Iron Chunk",
    location: defaultMapCenter,
    dueTime: 0,
    refreshTime: 86400000,
    visible: false,
    notify: false,
  },
  mapFocusedTask: false,
  mapTaskList: true,
  background: "paimon",
  hiddenWidgets: {
    signIn: true,
  },
  tutorial: true,
  lastChangelog: 0,
  stats: [],
  statRetention: 28,
  charactersWeekly: [],
  domainFilters: [],
  theme: "light",
};

export const ServerList: Configs["server"][] = ["America", "Europe", "Asia", "TW, HK, MO"];
export const ConfigKeys = Object.keys(DefaultConfigs) as (keyof Configs)[];

// migration: if there is a token saved in localStorage, move it to cookies
if (typeof window !== "undefined") {
  const auth = localStorage.getItem("auth");

  if (auth) {
    localStorage.removeItem("auth");

    setAuthToken(undefined, JSON.parse(auth).token);
    setTimeout(() => window.location.reload());
  }
}

export const ConfigsContext = createContext<{
  ref: MutableRefObject<Configs>;
  set: Dispatch<SetStateAction<Configs>>;
  events: MultiMap<string, () => void>;
}>({
  ref: { current: DefaultConfigs },
  set: () => {},
  events: new MultiMap(),
});

export function useConfigs(): [Configs, Dispatch<SetStateAction<Configs>>] {
  const { ref, set, events } = useContext(ConfigsContext);
  const [, setUpdate] = useState(0);

  useEffect(() => {
    const handler = () => setUpdate((i) => i + 1);

    for (const key of ConfigKeys) {
      events.add(key, handler);
    }

    return () => {
      for (const key of ConfigKeys) {
        events.remove(key, handler);
      }
    };
  }, [ref, events]);

  return [ref.current, set];
}

export function useConfig<TKey extends keyof Configs>(
  key: TKey
): [Configs[TKey], Dispatch<SetStateAction<Configs[TKey]>>] {
  const { ref, set, events } = useContext(ConfigsContext);
  const [, setUpdate] = useState(0);

  useEffect(() => {
    const handler = () => setUpdate((i) => i + 1);

    events.add(key, handler);
    return () => {
      events.remove(key, handler);
    };
  }, [key, ref, events]);

  return [
    ref.current[key],
    useCallback(
      (newValue) => {
        set((value) => ({
          ...value,
          [key]: typeof newValue === "function" ? newValue(value[key]) : newValue,
        }));
      },
      [key, set]
    ),
  ];
}

export const SyncContext = createContext<{
  enabled: boolean;
  synchronize: () => Promise<void>;
  callbacks: Set<() => Promise<void>>;
}>({
  enabled: false,
  synchronize: () => Promise.resolve(),
  callbacks: new Set(),
});

export function useSync() {
  return useContext(SyncContext);
}

export function useSyncEffect(callback: () => Promise<void> | void, deps: any[]) {
  const { callbacks } = useSync();
  const lastDeps = useRef(deps);

  useEffect(() => {
    const handler = async () => {
      if (!compareDeps(deps, lastDeps.current)) {
        await callback();
      }

      lastDeps.current = deps;
    };

    callbacks.add(handler);
    return () => {
      callbacks.delete(handler);
    };
  }, [callbacks, callback, ...deps]);
}

function compareDeps(a: any[], b: any[]) {
  if (a === b) return true;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}

export function useApiNotification(notification: Notification, enabled: boolean) {
  useSyncEffect(async () => {
    const client = createApiClient();

    if (enabled) {
      await client.setNotification(notification);
    } else {
      await client.deleteNotification(notification.key);
    }
  }, [enabled && notification]);
}

export function getStatFrameTime(time: DateTime) {
  time = time.minus({ hours: ServerResetHour });
  return DateTime.fromObject({ year: time.year, month: time.month, day: time.day });
}

export function useCurrentStats() {
  const [stats, setStats] = useConfig("stats");
  const time = useServerTime(60000);
  const frameId = getStatFrameTime(time).toSQLDate();

  return useListItemDispatch(stats, setStats, frameId);
}
