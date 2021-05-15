import {
  BeneathTheDragonQueller,
  CeciliaGarden,
  ClearPoolAndMountainCavern,
  ConfrontStormterror,
  Domain,
  DomainOfGuyun,
  EnterTheGoldenHouse,
  ForsakenRift,
  HiddenPalaceOfLianshanFormula,
  HiddenPalaceOfZhouFormula,
  MidsummerCourtyard,
  PeakOfVindagnyr,
  RidgeWatch,
  TaishanMansion,
  ValleyOfRemembrance,
  WolfOfTheNorthChallenge,
} from "./domains";
import { registerMessage } from "../utils";

export type DomainCategory = {
  name: string;
  dropDescription: string;
  domains: Domain[];
  wiki: string;
};

export const DomainOfForgery: DomainCategory = {
  name: registerMessage({ defaultMessage: "Domain of Forgery" }),
  dropDescription: registerMessage({ defaultMessage: "Weapon Ascension Materials" }),
  domains: [CeciliaGarden, HiddenPalaceOfLianshanFormula],
  wiki: "https://genshin-impact.fandom.com/wiki/Category:Domain_of_Forgery",
};

export const DomainOfBlessing: DomainCategory = {
  name: registerMessage({ defaultMessage: "Domain of Blessing" }),
  dropDescription: registerMessage({ defaultMessage: "Artifacts" }),
  domains: [
    MidsummerCourtyard,
    DomainOfGuyun,
    ValleyOfRemembrance,
    HiddenPalaceOfZhouFormula,
    ClearPoolAndMountainCavern,
    PeakOfVindagnyr,
    RidgeWatch,
  ],
  wiki: "https://genshin-impact.fandom.com/wiki/Category:Domain_of_Blessing",
};

export const DomainOfMastery: DomainCategory = {
  name: registerMessage({ defaultMessage: "Domain of Mastery" }),
  dropDescription: registerMessage({ defaultMessage: "Talent Level-Up Materials" }),
  domains: [ForsakenRift, TaishanMansion],
  wiki: "https://genshin-impact.fandom.com/wiki/Category:Domain_of_Mastery",
};

export const Trounce: DomainCategory = {
  name: registerMessage({ defaultMessage: "Trounce" }),
  dropDescription: registerMessage({ defaultMessage: "Weekly Challenge" }),
  domains: [ConfrontStormterror, WolfOfTheNorthChallenge, EnterTheGoldenHouse, BeneathTheDragonQueller],
  wiki: "https://genshin-impact.fandom.com/wiki/Category:Weekly_Bosses",
};

export const DomainCategories = [DomainOfForgery, DomainOfBlessing, DomainOfMastery, Trounce];
