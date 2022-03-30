import {
  CeciliaGardenDrops4,
  BeneathTheDragonQuellerDrops,
  CityOfReflections,
  ClearPoolAndMountainCavernDrops,
  ConfrontStormterrorDrops,
  DomainDropSet,
  DomainOfGuyunDrops,
  HiddenPalaceOfLianshanFormulaDrops4,
  EnterTheGoldenHouseDrops,
  ForsakenRiftDrops1,
  ForsakenRiftDrops2,
  ForsakenRiftDrops3,
  ForsakenRiftDrops4,
  HiddenPalaceOfZhouFormulaDrops,
  MidsummerCourtyardDrops,
  MomijiDyedCourtDrops,
  PeakOfVindagnyrDrops,
  RidgeWatchDrops,
  RuinsOfThirstingCapital,
  SubmergedValley,
  TaishanMansionDrops1,
  TaishanMansionDrops2,
  TaishanMansionDrops3,
  TaishanMansionDrops4,
  Thundercloud,
  ThunderingRuins,
  TrialGroundsOfThunder,
  ValleyOfRemembranceDrops,
  VioletCourtDrops1,
  VioletCourtDrops2,
  VioletCourtDrops3,
  VioletCourtDrops4,
  WolfOfTheNorthChallengeDrops,
  SunkenSands,
  AltarOfSands,
  SandBurial,
  CourtOfFlowingSandDrops4,
  AnemoHypostasisDrops,
  MaguuKenkiDrops,
  CryoRegisvineDrops,
  CryoHypostasisDrops,
  PrimoGeovishapDrops,
  ElectroHypostasisDrops,
  GeoHypostasisDrops,
  RhodeiaOfLochDrops,
  PyroRegisvineDrops,
  PyroHypostasisDrops,
  PerpetualMechanicalArrayDrops,
  ThunderManifestationDrops,
  NarukamiIslandTenshukakuDrops,
  HydroHypostasisDrops,
  GoldenWolflordDrops,
  SlumberingCourtDrops,
  BathysmalVishapHerdDrops,
  EndOfTheOneiricEuthymiaDrops,
  TheLostValleyDrops,
  RuinSerpentDrops,
} from "./domainDropSets";
import { registerMessage } from "../utils";

export type Domain = {
  type: "Domain";
  name: string;
  wiki: string;
  drops: DomainDropSet[];
};

registerMessage({ defaultMessage: "Domain" });

export const CeciliaGarden: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Cecilia Garden" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Cecilia_Garden",
  drops: [CityOfReflections, SubmergedValley, RuinsOfThirstingCapital, CeciliaGardenDrops4],
};

export const HiddenPalaceOfLianshanFormula: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Hidden Palace of Lianshan Formula" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Hidden_Palace_of_Lianshan_Formula",
  drops: [Thundercloud, ThunderingRuins, TrialGroundsOfThunder, HiddenPalaceOfLianshanFormulaDrops4],
};

export const MidsummerCourtyard: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Midsummer Courtyard" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Midsummer_Courtyard",
  drops: [MidsummerCourtyardDrops],
};

export const DomainOfGuyun: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Domain of Guyun" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Domain_of_Guyun",
  drops: [DomainOfGuyunDrops],
};

export const ValleyOfRemembrance: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Valley of Remembrance" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Valley_of_Remembrance",
  drops: [ValleyOfRemembranceDrops],
};

export const HiddenPalaceOfZhouFormula: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Hidden Palace of Zhou Formula" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Hidden_Palace_of_Zhou_Formula",
  drops: [HiddenPalaceOfZhouFormulaDrops],
};

export const ClearPoolAndMountainCavern: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Clear Pool and Mountain Cavern" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Clear_Pool_and_Mountain_Cavern",
  drops: [ClearPoolAndMountainCavernDrops],
};

export const ForsakenRift: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Forsaken Rift" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Forsaken_Rift",
  drops: [ForsakenRiftDrops1, ForsakenRiftDrops2, ForsakenRiftDrops3, ForsakenRiftDrops4],
};

export const TaishanMansion: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Taishan Mansion" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Taishan_Mansion",
  drops: [TaishanMansionDrops1, TaishanMansionDrops2, TaishanMansionDrops3, TaishanMansionDrops4],
};

export const ConfrontStormterror: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Confront Stormterror" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Confront_Stormterror",
  drops: [ConfrontStormterrorDrops],
};

export const WolfOfTheNorthChallenge: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Wolf of the North Challenge" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Wolf_of_the_North_Challenge",
  drops: [WolfOfTheNorthChallengeDrops],
};

export const PeakOfVindagnyr: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Peak of Vindagnyr" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Peak_of_Vindagnyr",
  drops: [PeakOfVindagnyrDrops],
};

export const EnterTheGoldenHouse: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Enter the Golden House" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Enter_the_Golden_House",
  drops: [EnterTheGoldenHouseDrops],
};

export const BeneathTheDragonQueller: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Beneath the Dragon-Queller" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Beneath_the_Dragon-Queller",
  drops: [BeneathTheDragonQuellerDrops],
};

export const NarukamiIslandTenshukaku: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Narukami Island: Tenshukaku" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Narukami_Island:_Tenshukaku",
  drops: [NarukamiIslandTenshukakuDrops],
};

export const RidgeWatch: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Ridge Watch" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Ridge_Watch",
  drops: [RidgeWatchDrops],
};

export const MomijiDyedCourt: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Momiji-Dyed Court" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Momiji-Dyed_Court",
  drops: [MomijiDyedCourtDrops],
};

export const VioletCourt: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Violet Court" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Violet_Court",
  drops: [VioletCourtDrops1, VioletCourtDrops2, VioletCourtDrops3, VioletCourtDrops4],
};

export const CourtOfFlowingSand: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Court of Flowing Sand" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Court_of_Flowing_Sand",
  drops: [SunkenSands, AltarOfSands, SandBurial, CourtOfFlowingSandDrops4],
};

export const AnemoHypostasis: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Anemo Hypostasis" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Anemo_Hypostasis",
  drops: [AnemoHypostasisDrops],
};

export const MaguuKenki: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Maguu Kenki" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Maguu_Kenki",
  drops: [MaguuKenkiDrops],
};

export const CryoRegisvine: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Cryo Regisvine" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Cryo_Regisvine",
  drops: [CryoRegisvineDrops],
};

export const CryoHypostasis: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Cryo Hypostasis" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Cryo_Hypostasis",
  drops: [CryoHypostasisDrops],
};

export const PrimoGeovishap: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Primo Geovishap" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Primo_Geovishap",
  drops: [PrimoGeovishapDrops],
};

export const ElectroHypostasis: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Electro Hypostasis" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Electro_Hypostasis",
  drops: [ElectroHypostasisDrops],
};

export const GeoHypostasis: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Geo Hypostasis" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Geo_Hypostasis",
  drops: [GeoHypostasisDrops],
};

export const RhodeiaOfLoch: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Rhodeia of Loch" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Rhodeia_of_Loch",
  drops: [RhodeiaOfLochDrops],
};

export const PyroRegisvine: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Pyro Regisvine" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Pyro_Regisvine",
  drops: [PyroRegisvineDrops],
};

export const PyroHypostasis: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Pyro Hypostasis" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Pyro_Hypostasis",
  drops: [PyroHypostasisDrops],
};

export const PerpetualMechanicalArray: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Perpetual Mechanical Array" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Perpetual_Mechanical_Array",
  drops: [PerpetualMechanicalArrayDrops],
};

export const ThunderManifestation: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Thunder Manifestation" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Thunder_Manifestation",
  drops: [ThunderManifestationDrops],
};

export const HydroHypostasis: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Hydro Hypostasis" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Hydro_Hypostasis",
  drops: [HydroHypostasisDrops],
};

export const GoldenWolflord: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Golden Wolflord" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Golden_Wolflord",
  drops: [GoldenWolflordDrops],
};

export const SlumberingCourt: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Slumbering Court" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Slumbering_Court",
  drops: [SlumberingCourtDrops],
};

export const BathysmalVishapHerd: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Bathysmal Vishap Herd" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Bathysmal_Vishap_Herd",
  drops: [BathysmalVishapHerdDrops],
};

export const EndOfTheOneiricEuthymia: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "End of the Oneiric Euthymia" }),
  wiki: "https://genshin-impact.fandom.com/wiki/End_of_the_Oneiric_Euthymia",
  drops: [EndOfTheOneiricEuthymiaDrops],
};

export const TheLostValley: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "The Lost Valley" }),
  wiki: "https://genshin-impact.fandom.com/wiki/The_Lost_Valley",
  drops: [TheLostValleyDrops],
};

export const RuinSerpent: Domain = {
  type: "Domain",
  name: registerMessage({ defaultMessage: "Ruin Serpent" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Ruin_Serpent",
  drops: [RuinSerpentDrops],
};

export const Domains = [
  CeciliaGarden,
  HiddenPalaceOfLianshanFormula,
  MidsummerCourtyard,
  DomainOfGuyun,
  ValleyOfRemembrance,
  HiddenPalaceOfZhouFormula,
  ClearPoolAndMountainCavern,
  ForsakenRift,
  TaishanMansion,
  ConfrontStormterror,
  WolfOfTheNorthChallenge,
  PeakOfVindagnyr,
  EnterTheGoldenHouse,
  BeneathTheDragonQueller,
  RidgeWatch,
  MomijiDyedCourt,
  VioletCourt,
  CourtOfFlowingSand,
  AnemoHypostasis,
  MaguuKenki,
  CryoRegisvine,
  CryoHypostasis,
  PrimoGeovishap,
  ElectroHypostasis,
  GeoHypostasis,
  RhodeiaOfLoch,
  PyroRegisvine,
  PyroHypostasis,
  PerpetualMechanicalArray,
  ThunderManifestation,
  HydroHypostasis,
  NarukamiIslandTenshukaku,
  GoldenWolflord,
  SlumberingCourt,
  BathysmalVishapHerd,
  EndOfTheOneiricEuthymia,
  TheLostValley,
  RuinSerpent,
];
