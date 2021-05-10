import EnUS from "./en-US.json";
import idID from "./id-ID.json";
// import ZhCN from "./zh-CN.json";

export type Language = "en-US" | "id-ID";
export const Languages: Language[] = [
  "en-US",
  "id-ID",
  // "zh-CN",
];

export const LanguageNames: Record<Language, string> = {
  "en-US": "English (US)",
  "id-ID": "Bahasa Indonesia (Indonesia)",
  // "zh-CN": "中文",
};

export const Localizations: Record<Language, any> = {
  "en-US": EnUS,
  "id-ID": idID,
  // "zh-CN": { ...EnUS, ...ZhCN },
};
