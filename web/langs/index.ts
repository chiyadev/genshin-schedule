import EnUS from "./en_US.json";
import ZhHans from "./zh_Hans.json";
import Id from "./id.json";
import NbNO from "./nb_NO.json";
import Ru from "./ru.json";

export type Language = "en-US" | "zh-Hans" | "id" | "nb-NO" | "ru";
export const Languages: Language[] = ["en-US", "zh-Hans", "id", "nb-NO", "ru"];

export const LanguageAliases: Record<string, Language> = {
  "en-US": "en-US",
  en: "en-US",

  "zh-Hans-CN": "zh-Hans",
  "zh-Hans": "zh-Hans",
  "zh-CN": "zh-Hans",
  zh: "zh-Hans",

  "id-ID": "id",
  id: "id",

  "nb-NO": "nb-NO",
  nb: "nb-NO",

  "ru-RU": "ru",
  ru: "ru",
};

export const LanguageNames: Record<Language, string> = {
  "en-US": "English (US)",
  "zh-Hans": "简体中文",
  id: "Bahasa Indonesia",
  "nb-NO": "Bokmål (Preview)",
  ru: "русский (Preview)",
};

export const Localizations: Record<Language, any> = {
  "en-US": EnUS,
  "zh-Hans": { ...EnUS, ...ZhHans },
  id: { ...EnUS, ...Id },
  "nb-NO": { ...EnUS, ...NbNO },
  ru: { ...EnUS, ...Ru },
};

export function getTranslatedMessages(id: string) {
  const results: string[] = [];

  for (const localization of Object.values(Localizations)) {
    localization[id] && results.push(localization[id]);
  }

  return results;
}
