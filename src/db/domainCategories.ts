import {
  CeciliaGarden,
  ClearPoolAndMountainCavern,
  Domain,
  DomainOfGuyun,
  ForsakenRift,
  HiddenPalaceOfLianshanFormula,
  HiddenPalaceOfZhouFormula,
  MidsummerCourtyard,
  TaishanMansion,
  ValleyOfRemembrance
} from "./domains";

export type DomainCategory = {
  name: string;
  wiki: string;
  dropDescription: string;
  domains: Domain[];
};

export const DomainOfForgery: DomainCategory = {
  name: "Domain of Forgery",
  wiki: "https://genshin-impact.fandom.com/wiki/Category:Domain_of_Forgery",
  dropDescription: "Weapon Ascension Materials",
  domains: [CeciliaGarden, HiddenPalaceOfLianshanFormula]
};

export const DomainOfBlessing: DomainCategory = {
  name: "Domain of Blessing",
  wiki: "https://genshin-impact.fandom.com/wiki/Category:Domain_of_Blessing",
  dropDescription: "Artifacts",
  domains: [
    MidsummerCourtyard,
    DomainOfGuyun,
    ValleyOfRemembrance,
    HiddenPalaceOfZhouFormula,
    ClearPoolAndMountainCavern
  ]
};

export const DomainOfMastery: DomainCategory = {
  name: "Domain of Mastery",
  wiki: "https://genshin-impact.fandom.com/wiki/Category:Domain_of_Mastery",
  dropDescription: "Talent Level-Up Materials",
  domains: [ForsakenRift, TaishanMansion]
};

export const DomainCategories = [
  DomainOfForgery,
  DomainOfBlessing,
  DomainOfMastery
];
