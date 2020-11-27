import { createContext, Dispatch, MutableRefObject, SetStateAction, useCallback, useContext } from "react";
import { ResinCap } from "../db/resins";
import { setAuthToken } from "./api";

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
    [key in "clock" | "info" | "sync" | "resin" | "tasks" | "domains"]?: boolean;
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

export const ServerList: Configs["server"][] = ["America", "Europe", "Asia"];
export const ConfigKeys = Object.keys(DefaultConfigs) as (keyof Configs)[];

// migration: if there is a token saved in localStorage, move it to cookies
if (typeof window !== "undefined") {
  const auth = localStorage.getItem("auth");

  if (auth) {
    setAuthToken(JSON.parse(auth).token);

    for (const key of ["auth", ...ConfigKeys]) {
      localStorage.removeItem(key);
    }

    setTimeout(() => window.location.reload());
  }
}

export const ConfigContext = createContext<[Configs, Dispatch<SetStateAction<Configs>>, MutableRefObject<Configs>]>([
  DefaultConfigs,
  () => {},
  { current: DefaultConfigs },
]);

export function useConfigs(): [Configs, Dispatch<SetStateAction<Configs>>] {
  const [value, setValue, ref] = useContext(ConfigContext);

  return [
    value,
    useCallback(
      (newValue) => {
        if (typeof newValue === "function") {
          newValue = newValue(ref.current);
        }

        setValue((ref.current = newValue));
      },
      [setValue, ref]
    ),
  ];
}

export function useConfig<TKey extends keyof Configs>(
  key: TKey
): [Configs[TKey], Dispatch<SetStateAction<Configs[TKey]>>] {
  const [value, setValue] = useConfigs();

  return [
    value[key],
    useCallback(
      (newValue) => {
        setValue((value) => ({
          ...value,
          [key]: typeof newValue === "function" ? newValue(value[key]) : newValue,
        }));
      },
      [key, setValue]
    ),
  ];
}
