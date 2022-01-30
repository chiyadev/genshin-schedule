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
import { createApiClient, Notification } from "./api";
import { MultiMap } from "./multiMap";
import { useListItemDispatch } from "./dispatch";
import { ServerResetHour, useServerTime } from "./time";
import { DateTime } from "luxon";
import { Language } from "../langs";
import { CharacterBackgrounds } from "../components/Background";

type MapLocation = { lat: number; lng: number };

export const MapZoomMin = 4;
export const MapZoomMax = 7;

export type Config = {
  language: Language | "default";
  server: "America" | "Europe" | "Asia" | "TW, HK, MO";
  theme: "light" | "dark";
  background: keyof typeof CharacterBackgrounds | "none";
  lastChangelog: number;
  offsetDays: number;
  hiddenWidgets: {
    [key in "clock" | "sync" | "resin" | "tasks" | "domains" | "realm"]?: boolean;
  };
  resin: {
    value: number;
    time: number;
  };
  resinEstimateMode: "time" | "value";
  resinNotifyMark: number;
  realmEnergy: number;
  realmRank: number;
  realmCurrency: {
    value: number;
    time: number;
  };
  resinCalcButtons: number[];
  characters: string[]; // talent mats
  charactersWeekly: string[]; // weekly talent mats
  charactersGem: string[]; // ascension gems
  charactersNormalBoss: string[]; // normal boss mats
  weapons: string[];
  artifacts: string[];
  domainFilter: "all" | "efficiency" | "today" | "noaux";
  domainFilterType: "all" | "character" | "weapon" | "artifact";
  domainFilterRegion: "all" | "mondstadt" | "liyue" | "inazuma";
  itemNotes: { [key: string]: string };
  itemHighlights: string[];
  tasks: Task[];
  taskQuery: string;
  taskListCompact: boolean;
  taskListShowHidden: boolean;
  taskListShowDone: boolean;
  customizeQuery: string;
  iconQuery: string;
  iconListScroll: number;
  mapState: MapLocation & { zoom: number };
  mapTaskDefaultZoom: number;
  mapCreateTask: Task;
  mapFocusedTask: string | false;
  mapTaskList: boolean;
  stats: StatFrame[];
  statRetention: number;
};

export type TaskRefreshTime =
  | number
  | "reset"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type Task = {
  id: string;
  icon: string;
  name: string;
  description?: string;
  visible: boolean;
  location: MapLocation;
  dueTime: number;
  refreshTime: TaskRefreshTime;
  notify?: boolean;
  highlight?: boolean;
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

export const DefaultConfig: Config = {
  language: "default",
  server: "America",
  theme: "light",
  background: "paimon",
  lastChangelog: 0,
  offsetDays: 0,
  hiddenWidgets: {},
  resin: {
    value: 0,
    time: Date.now(),
  },
  resinEstimateMode: "time",
  resinNotifyMark: ResinCap,
  realmEnergy: 0,
  realmRank: 1,
  realmCurrency: {
    value: 0,
    time: Date.now(),
  },
  resinCalcButtons: [-60, -40, -30, -20],
  characters: [],
  charactersWeekly: [],
  charactersGem: [],
  charactersNormalBoss: [],
  weapons: [],
  artifacts: [],
  domainFilter: "efficiency",
  domainFilterType: "all",
  domainFilterRegion: "all",
  itemNotes: {},
  itemHighlights: [],
  tasks: [],
  taskQuery: "",
  taskListCompact: false,
  taskListShowHidden: false,
  taskListShowDone: false,
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
  stats: [],
  statRetention: 28,
};

export const ServerList: Config["server"][] = ["America", "Europe", "Asia", "TW, HK, MO"];
export const ConfigKeys = Object.keys(DefaultConfig) as (keyof Config)[];

export const ConfigContext = createContext<{
  ref: MutableRefObject<Config>;
  set: Dispatch<SetStateAction<Config>>;
  events: MultiMap<string, () => void>;
}>({
  ref: { current: DefaultConfig },
  set: () => {},
  events: new MultiMap(),
});

export function useConfigs(): [Config, Dispatch<SetStateAction<Config>>] {
  const { ref, set, events } = useContext(ConfigContext);
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

export function useConfig<TKey extends keyof Config>(
  key: TKey
): [Config[TKey], Dispatch<SetStateAction<Config[TKey]>>] {
  const { ref, set, events } = useContext(ConfigContext);
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

    const fixed: Notification = {
      ...notification,

      url: new URL(notification.url, window.location.href).href,
      icon: new URL(notification.icon, window.location.href).href,
    };

    if (enabled) {
      await client.setNotification(fixed);
    } else {
      await client.deleteNotification(fixed.key);
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
