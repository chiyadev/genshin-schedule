import {
  BeneathTheDragonQueller,
  CeciliaGarden,
  ClearPoolAndMountainCavern,
  ConfrontStormterror,
  CourtOfFlowingSand,
  Domain,
  DomainOfGuyun,
  EnterTheGoldenHouse,
  ForsakenRift,
  HiddenPalaceOfLianshanFormula,
  HiddenPalaceOfZhouFormula,
  MidsummerCourtyard,
  MomijiDyedCourt,
  PeakOfVindagnyr,
  RidgeWatch,
  TaishanMansion,
  ValleyOfRemembrance,
  VioletCourt,
  WolfOfTheNorthChallenge,
} from "./domains";
import { registerMessage } from "../utils";

export type DomainCategory = {
  name: string;
  dropDescription: string;
  domains: Domain[];
  wiki: string;
  colorHint?: string;
};

export const DomainOfForgery: DomainCategory = {
  name: registerMessage({ defaultMessage: "Domain of Forgery" }),
  dropDescription: registerMessage({ defaultMessage: "Weapon Ascension Materials" }),
  domains: [CeciliaGarden, HiddenPalaceOfLianshanFormula, CourtOfFlowingSand],
  wiki: "https://genshin-impact.fandom.com/wiki/Category:Domains_of_Forgery",
  colorHint: "blue",
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
    MomijiDyedCourt,
  ],
  wiki: "https://genshin-impact.fandom.com/wiki/Category:Domains_of_Blessing",
  colorHint: "yellow",
};

export const DomainOfMastery: DomainCategory = {
  name: registerMessage({ defaultMessage: "Domain of Mastery" }),
  dropDescription: registerMessage({ defaultMessage: "Talent Level-Up Materials" }),
  domains: [ForsakenRift, TaishanMansion, VioletCourt],
  wiki: "https://genshin-impact.fandom.com/wiki/Category:Domains_of_Mastery",
  colorHint: "pink",
};

export const Trounce: DomainCategory = {
  name: registerMessage({ defaultMessage: "Trounce" }),
  dropDescription: registerMessage({ defaultMessage: "Weekly Challenge" }),
  domains: [ConfrontStormterror, WolfOfTheNorthChallenge, EnterTheGoldenHouse, BeneathTheDragonQueller],
  wiki: "https://genshin-impact.fandom.com/wiki/Category:Weekly_Bosses",
  colorHint: "green",
};

export const DomainCategories = [DomainOfForgery, DomainOfBlessing, DomainOfMastery, Trounce];
