import {
  Adventurer,
  ArchaicPetra,
  Artifact,
  Berserker,
  BloodstainedChivalry,
  BraveHeart,
  CrimsonWitchOfFlames,
  DefendersWill,
  Gambler,
  GladiatorsFinale,
  Icebreaker,
  Instructor,
  Lavawalker,
  LuckyDog,
  MaidenBeloved,
  MartialArtist,
  NoblesseOblige,
  OceanConqueror,
  PaleFlame,
  ResolutionOfSojourner,
  RetracingBolide,
  Scholar,
  TenacityOfTheMillelith,
  TheExile,
  ThunderingFury,
  Thundersoother,
  TinyMiracle,
  TravelingDoctor,
  ViridescentVenerer,
  WanderersTroupe,
} from "./artifacts";
import {
  Aerosiderite,
  BorealWolf,
  DandelionGladiator,
  Decarabian,
  Guyun,
  MistVeiledElixir,
  WeaponMaterial,
} from "./weaponMaterials";
import {
  Ballad,
  Diligence,
  Freedom,
  Gold,
  Prosperity,
  Resistance,
  TalentMaterial,
  DvalinPlume,
  DvalinSigh,
  DvalinClaw,
  RingOfBoreas,
  SpiritLocketOfBoreas,
  TailOfBoreas,
  ShadowOfTheWarrior,
  ShardOfAFoulLegacy,
  TuskOfMonocerosCaeli,
  BloodjadeBranch,
  DragonLordsCrown,
  GildedScale,
} from "./talentMaterials";
import { Weekday } from "../utils/time";

const MonThur: Weekday[] = ["monday", "thursday"];
const TuesFri: Weekday[] = ["tuesday", "friday"];
const WedSat: Weekday[] = ["wednesday", "saturday"];
const Sun: Weekday[] = ["sunday"];
const AnyDay: Weekday[] = [...MonThur, ...TuesFri, ...WedSat, ...Sun];
const Trounce: Weekday[] = AnyDay;

export type DomainDropSet = {
  type: "Domain Drop Set";
  name?: string;
  days: Weekday[];
  items: (Artifact | WeaponMaterial | TalentMaterial)[];
};

export const CityOfReflections: DomainDropSet = {
  type: "Domain Drop Set",
  name: "City of Reflections",
  days: MonThur,
  items: [Decarabian],
};

export const SubmergedValley: DomainDropSet = {
  type: "Domain Drop Set",
  name: "Submerged Valley",
  days: TuesFri,
  items: [BorealWolf],
};

export const RuinsOfThirstingCapital: DomainDropSet = {
  type: "Domain Drop Set",
  name: "Ruins of Thirsting Capital",
  days: WedSat,
  items: [DandelionGladiator],
};

export const AltarOfTheFalls: DomainDropSet = {
  type: "Domain Drop Set",
  name: "Altar of the Falls",
  days: Sun,
  items: [Decarabian, BorealWolf, DandelionGladiator],
};

export const Thundercloud: DomainDropSet = {
  type: "Domain Drop Set",
  name: "Thundercloud",
  days: MonThur,
  items: [Guyun],
};

export const ThunderingRuins: DomainDropSet = {
  type: "Domain Drop Set",
  name: "Thundering Ruins",
  days: TuesFri,
  items: [MistVeiledElixir],
};

export const TrailGroundsOfThunder: DomainDropSet = {
  type: "Domain Drop Set",
  name: "Trail Grounds of Thunder",
  days: WedSat,
  items: [Aerosiderite],
};

export const ElectrostaticField: DomainDropSet = {
  type: "Domain Drop Set",
  name: "Electrostatic Field",
  days: Sun,
  items: [Guyun, MistVeiledElixir, Aerosiderite],
};

export const ForsakenRiftDrops1: DomainDropSet = {
  type: "Domain Drop Set",
  days: MonThur,
  items: [Freedom],
};

export const ForsakenRiftDrops2: DomainDropSet = {
  type: "Domain Drop Set",
  days: TuesFri,
  items: [Resistance],
};

export const ForsakenRiftDrops3: DomainDropSet = {
  type: "Domain Drop Set",
  days: WedSat,
  items: [Ballad],
};

export const ForsakenRiftDrops4: DomainDropSet = {
  type: "Domain Drop Set",
  days: Sun,
  items: [Freedom, Resistance, Ballad],
};

export const TaishanMansionDrops1: DomainDropSet = {
  type: "Domain Drop Set",
  days: MonThur,
  items: [Prosperity],
};

export const TaishanMansionDrops2: DomainDropSet = {
  type: "Domain Drop Set",
  days: TuesFri,
  items: [Diligence],
};

export const TaishanMansionDrops3: DomainDropSet = {
  type: "Domain Drop Set",
  days: WedSat,
  items: [Gold],
};

export const TaishanMansionDrops4: DomainDropSet = {
  type: "Domain Drop Set",
  days: Sun,
  items: [Prosperity, Diligence, Gold],
};

export const MidsummerCourtyardDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: AnyDay,
  items: [Adventurer, ResolutionOfSojourner, ThunderingFury, Thundersoother],
};

export const DomainOfGuyunDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: AnyDay,
  items: [LuckyDog, BraveHeart, ArchaicPetra, RetracingBolide],
};

export const ValleyOfRemembranceDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: AnyDay,
  items: [TravelingDoctor, TinyMiracle, ViridescentVenerer, MaidenBeloved],
};

export const HiddenPalaceOfZhouFormulaDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: AnyDay,
  items: [DefendersWill, MartialArtist, CrimsonWitchOfFlames, Lavawalker],
};

export const ClearPoolAndMountainCavernDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: AnyDay,
  items: [BloodstainedChivalry, NoblesseOblige, Gambler, Scholar],
};

export const ConfrontStormterrorDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: Trounce,
  items: [Berserker, Instructor, TheExile, GladiatorsFinale, WanderersTroupe, DvalinPlume, DvalinSigh, DvalinClaw],
};

export const WolfOfTheNorthChallengeDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: Trounce,
  items: [
    Berserker,
    Instructor,
    TheExile,
    GladiatorsFinale,
    WanderersTroupe,
    RingOfBoreas,
    SpiritLocketOfBoreas,
    TailOfBoreas,
  ],
};

export const PeakOfVindagnyrDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: AnyDay,
  items: [DefendersWill, Gambler, Icebreaker, OceanConqueror],
};

export const EnterTheGoldenHouseDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: Trounce,
  items: [
    Berserker,
    Instructor,
    TheExile,
    GladiatorsFinale,
    WanderersTroupe,
    TuskOfMonocerosCaeli,
    ShadowOfTheWarrior,
    ShardOfAFoulLegacy,
  ],
};

export const BeneathTheDragonQuellerDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: Trounce,
  items: [
    Berserker,
    Instructor,
    TheExile,
    GladiatorsFinale,
    WanderersTroupe,
    DragonLordsCrown,
    BloodjadeBranch,
    GildedScale,
  ],
};

export const RidgeWatchDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: AnyDay,
  items: [BraveHeart, MartialArtist, TenacityOfTheMillelith, PaleFlame],
};

export const DomainDropSets = [
  CityOfReflections,
  SubmergedValley,
  RuinsOfThirstingCapital,
  AltarOfTheFalls,
  Thundercloud,
  ThunderingRuins,
  TrailGroundsOfThunder,
  ElectrostaticField,
  ForsakenRiftDrops1,
  ForsakenRiftDrops2,
  ForsakenRiftDrops3,
  ForsakenRiftDrops4,
  TaishanMansionDrops1,
  TaishanMansionDrops2,
  TaishanMansionDrops3,
  TaishanMansionDrops4,
  MidsummerCourtyardDrops,
  DomainOfGuyunDrops,
  ValleyOfRemembranceDrops,
  HiddenPalaceOfZhouFormulaDrops,
  ClearPoolAndMountainCavernDrops,
  ConfrontStormterrorDrops,
  WolfOfTheNorthChallengeDrops,
  PeakOfVindagnyrDrops,
  EnterTheGoldenHouseDrops,
  BeneathTheDragonQuellerDrops,
  RidgeWatchDrops,
];
