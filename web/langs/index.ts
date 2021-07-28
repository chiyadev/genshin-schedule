import EnUS from "./en_US.json";
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
  "en-US": EnUS,
  id: { ...EnUS, ...Id },
  "zh-Hans": { ...EnUS, ...ZhHans },
  "nb-NO": { ...EnUS, ...NbNO },
};

export function getTranslatedMessages(id: string) {
  const results: string[] = [];

  for (const localization of Object.values(Localizations)) {
    localization[id] && results.push(localization[id]);
  }

  return results;
}
