import Id from "./id.json";
// import ZhHans from "./zh-CN.json";

export type Language = "en-US" | "id";
export const Languages: Language[] = [
  "en-US",
  "id",
  // "zh-CN",
];

export const LanguageNames: Record<Language, string> = {
  "en-US": "English (US)",
  id: "Bahasa Indonesia",
  // "zh-CN": "中文",
};

export const Localizations: Record<Language, any> = {
  "en-US": {},
  id: Id,
  // "zh-CN": ZhHans,
};
