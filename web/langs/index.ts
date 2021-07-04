import Id from "./id.json";
import ZhHans from "./zh_Hans.json";
import NbNO from "./nb_NO.json";

export type Language = "en-US" | "id" | "zh-Hans" | "nb-NO";
export const Languages: Language[] = ["en-US", "id", "zh-Hans", "nb-NO"];

export const LanguageNames: Record<Language, string> = {
  "en-US": "English (US)",
  id: "Bahasa Indonesia",
  "zh-Hans": "中文",
  "nb-NO": "[Preview] Bokmål",
};

export const Localizations: Record<Language, any> = {
  "en-US": {},
  id: Id,
  "zh-Hans": ZhHans,
  "nb-NO": NbNO,
};
