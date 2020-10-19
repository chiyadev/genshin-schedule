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
  tasks: string[];
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
  tasks: [],
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
