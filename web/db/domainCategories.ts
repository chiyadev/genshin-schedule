import {
  AnemoHypostasis,
  BeneathTheDragonQueller,
  CeciliaGarden,
  ClearPoolAndMountainCavern,
  ConfrontStormterror,
  CourtOfFlowingSand,
  CryoHypostasis,
  CryoRegisvine,
  Domain,
  DomainOfGuyun,
  ElectroHypostasis,
  EnterTheGoldenHouse,
  ForsakenRift,
  GeoHypostasis,
  GoldenWolflord,
  HiddenPalaceOfLianshanFormula,
  HiddenPalaceOfZhouFormula,
  HydroHypostasis,
  MaguuKenki,
  MidsummerCourtyard,
  MomijiDyedCourt,
  NarukamiIslandTenshukaku,
  SlumberingCourt,
  PeakOfVindagnyr,
  PerpetualMechanicalArray,
  PrimoGeovishap,
  PyroHypostasis,
  PyroRegisvine,
  RhodeiaOfLoch,
  RidgeWatch,
  TaishanMansion,
  ThunderManifestation,
  ValleyOfRemembrance,
  VioletCourt,
  WolfOfTheNorthChallenge,
  BathysmalVishapHerd,
  EndOfTheOneiricEuthymia,
  TheLostValley,
  RuinSerpent,
} from "./domains";
import { registerMessage } from "../utils";

export type DomainCategory = {
  type: "Domain Category";
  name: string;
  dropDescription: string;
  domains: Domain[];
  wiki: string;
  colorHint?: string;
};

registerMessage({ defaultMessage: "Domain Category" });

export const Trounce: DomainCategory = {
  type: "Domain Category",
  name: registerMessage({ defaultMessage: "Trounce" }),
  dropDescription: registerMessage({ defaultMessage: "Weekly Challenge" }),
  domains: [
    ConfrontStormterror,
    WolfOfTheNorthChallenge,
    EnterTheGoldenHouse,
    BeneathTheDragonQueller,
    NarukamiIslandTenshukaku,
    EndOfTheOneiricEuthymia,
  ],
  wiki: "https://genshin-impact.fandom.com/wiki/Category:Weekly_Bosses",
  colorHint: "green",
};

export const DomainOfMastery: DomainCategory = {
  type: "Domain Category",
  name: registerMessage({ defaultMessage: "Mastery" }),
  dropDescription: registerMessage({ defaultMessage: "Talent Level-Up Materials" }),
  domains: [ForsakenRift, TaishanMansion, VioletCourt],
  wiki: "https://genshin-impact.fandom.com/wiki/Category:Domains_of_Mastery",
  colorHint: "pink",
};

export const DomainOfForgery: DomainCategory = {
  type: "Domain Category",
  name: registerMessage({ defaultMessage: "Forgery" }),
  dropDescription: registerMessage({ defaultMessage: "Weapon Ascension Materials" }),
  domains: [CeciliaGarden, HiddenPalaceOfLianshanFormula, CourtOfFlowingSand],
  wiki: "https://genshin-impact.fandom.com/wiki/Category:Domains_of_Forgery",
  colorHint: "blue",
};

export const DomainOfBlessing: DomainCategory = {
  type: "Domain Category",
  name: registerMessage({ defaultMessage: "Blessing" }),
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
    SlumberingCourt,
    TheLostValley,
  ],
  wiki: "https://genshin-impact.fandom.com/wiki/Category:Domains_of_Blessing",
  colorHint: "yellow",
};

// Normal boss feature is implemented using the same infrastructure
// as domains because they are functionally the same things.
export const NormalBoss: DomainCategory = {
  type: "Domain Category",
  name: registerMessage({ defaultMessage: "Boss" }),
  dropDescription: registerMessage({ defaultMessage: "Character Ascension Materials and Artifacts" }),
  domains: [
    AnemoHypostasis,
    MaguuKenki,
    CryoRegisvine,
    CryoHypostasis,
    PrimoGeovishap,
    ElectroHypostasis,
    GeoHypostasis,
    HydroHypostasis,
    RhodeiaOfLoch,
    PyroRegisvine,
    PyroHypostasis,
    PerpetualMechanicalArray,
    ThunderManifestation,
    GoldenWolflord,
    BathysmalVishapHerd,
    RuinSerpent,
  ],
  wiki: "https://genshin-impact.fandom.com/wiki/Category:Normal_Bosses",
  colorHint: "purple",
};

export const DomainCategories = [Trounce, DomainOfMastery, DomainOfForgery, DomainOfBlessing, NormalBoss];
