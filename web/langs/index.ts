// import ZhCN from "./zh-CN.json";

export type Language = "en-US";
export const Languages: Language[] = [
  "en-US",
  // "zh-CN",
];

export const LanguageNames: Record<Language, string> = {
  "en-US": "English (US)",
  // "zh-CN": "中文",
};

export const Localizations: Record<Language, any> = {
  "en-US": {},
  // "zh-CN": { ...EnUS, ...ZhCN },
};
