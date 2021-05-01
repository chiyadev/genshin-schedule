import EnUS from "./en-US.json";

export type Language = "en-US";
export const Languages: Language[] = ["en-US"];

export const Localizations: Record<Language, any> = {
  "en-US": EnUS,
};
