import { useLocalStorage } from "@rehooks/local-storage";

export type Configs = {
  server: "America" | "Europe" | "Asia";
  characters: string[];
};

export const DefaultConfigs: Configs = {
  server: "America",
  characters: []
};

export function useConfig<TKey extends keyof Configs>(key: TKey) {
  return useLocalStorage<Configs[TKey]>(key, DefaultConfigs[key]);
}
