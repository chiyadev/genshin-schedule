import { useLocalStorage } from "@rehooks/local-storage";
import { ResinCap } from "./db/resins";

export type Configs = {
  server: "America" | "Europe" | "Asia";
  characters: string[];
  resin: {
    value: number;
    time: number;
  };
};

export const DefaultConfigs: Configs = {
  server: "America",
  characters: [],
  resin: {
    value: ResinCap,
    time: Date.now()
  }
};

export function useConfig<TKey extends keyof Configs>(key: TKey) {
  return useLocalStorage<Configs[TKey]>(key, DefaultConfigs[key]);
}
