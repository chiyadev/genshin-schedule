import { useLocalStorage } from "@rehooks/local-storage";
import { ResinCap } from "./db/resins";

export type Configs = {
  server: "America" | "Europe" | "Asia";
  characters: string[];
  weapons: string[];
  resin: {
    value: number;
    time: number;
  };
  customizeQuery: string;
};

export const DefaultConfigs: Configs = {
  server: "America",
  characters: [],
  weapons: [],
  resin: {
    value: ResinCap,
    time: Date.now()
  },
  customizeQuery: ""
};

export function useConfig<TKey extends keyof Configs>(key: TKey) {
  return useLocalStorage<Configs[TKey]>(key, DefaultConfigs[key]);
}
