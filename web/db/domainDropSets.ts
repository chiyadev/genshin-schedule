import {
  Adventurer,
  ArchaicPetra,
  Artifact,
  Berserker,
  BloodstainedChivalry,
  BraveHeart,
  CrimsonWitchOfFlames,
  DefendersWill,
  EmblemOfSeveredFate,
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
  ShimenawaReminiscence,
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
  BranchOfDistantSea,
  DandelionGladiator,
  Decarabian,
  Guyun,
  NarukamiMask,
  MistVeiledElixir,
  Narukami,
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
  Light,
  Transience,
  Elegance,
} from "./talentMaterials";
import { Weekday } from "../utils/time";
import { registerMessage } from "../utils";

const MonThu: Weekday[] = ["monday", "thursday"];
const TueFri: Weekday[] = ["tuesday", "friday"];
const WedSat: Weekday[] = ["wednesday", "saturday"];
const Sun: Weekday[] = ["sunday"];
const AnyDay: Weekday[] = [...MonThu, ...TueFri, ...WedSat, ...Sun];
const Trounce: Weekday[] = AnyDay;

export type DomainDropSet = {
  type: "Domain Drop Set";
  name?: string;
  days: Weekday[];
  items: (Artifact | WeaponMaterial | TalentMaterial)[];
};

export const CityOfReflections: DomainDropSet = {
  type: "Domain Drop Set",
  name: registerMessage({ defaultMessage: "City of Reflections" }),
  days: MonThu,
  items: [Decarabian],
};

export const SubmergedValley: DomainDropSet = {
  type: "Domain Drop Set",
  name: registerMessage({ defaultMessage: "Submerged Valley" }),
  days: TueFri,
  items: [BorealWolf],
};

export const RuinsOfThirstingCapital: DomainDropSet = {
  type: "Domain Drop Set",
  name: registerMessage({ defaultMessage: "Ruins of Thirsting Capital" }),
  days: WedSat,
  items: [DandelionGladiator],
};

export const CeciliaGardenDrops4: DomainDropSet = {
  type: "Domain Drop Set",
  days: Sun,
  items: [Decarabian, BorealWolf, DandelionGladiator],
};

export const Thundercloud: DomainDropSet = {
  type: "Domain Drop Set",
  name: registerMessage({ defaultMessage: "Thundercloud" }),
  days: MonThu,
  items: [Guyun],
};

export const ThunderingRuins: DomainDropSet = {
  type: "Domain Drop Set",
  name: registerMessage({ defaultMessage: "Thundering Ruins" }),
  days: TueFri,
  items: [MistVeiledElixir],
};

export const TrailGroundsOfThunder: DomainDropSet = {
  type: "Domain Drop Set",
  name: registerMessage({ defaultMessage: "Trail Grounds of Thunder" }),
  days: WedSat,
  items: [Aerosiderite],
};

export const HiddenPalaceOfLianshanFormulaDrops4: DomainDropSet = {
  type: "Domain Drop Set",
  name: registerMessage({ defaultMessage: "Electrostatic Field" }),
  days: Sun,
  items: [Guyun, MistVeiledElixir, Aerosiderite],
};

export const ForsakenRiftDrops1: DomainDropSet = {
  type: "Domain Drop Set",
  days: MonThu,
  items: [Freedom],
};

export const ForsakenRiftDrops2: DomainDropSet = {
  type: "Domain Drop Set",
  days: TueFri,
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
  days: MonThu,
  items: [Prosperity],
};

export const TaishanMansionDrops2: DomainDropSet = {
  type: "Domain Drop Set",
  days: TueFri,
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

export const MomijiDyedCourtDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: AnyDay,
  items: [ResolutionOfSojourner, TinyMiracle, ShimenawaReminiscence, EmblemOfSeveredFate],
};

export const VioletCourtDrops1: DomainDropSet = {
  type: "Domain Drop Set",
  days: MonThu,
  items: [Transience],
};

export const VioletCourtDrops2: DomainDropSet = {
  type: "Domain Drop Set",
  days: TueFri,
  items: [Elegance],
};

export const VioletCourtDrops3: DomainDropSet = {
  type: "Domain Drop Set",
  days: WedSat,
  items: [Light],
};

export const SunkenSands: DomainDropSet = {
  type: "Domain Drop Set",
  name: registerMessage({ defaultMessage: "Sunken Sands" }),
  days: MonThu,
  items: [BranchOfDistantSea],
};

export const AltarOfSands: DomainDropSet = {
  type: "Domain Drop Set",
  name: registerMessage({ defaultMessage: "Altar of Sands" }),
  days: TueFri,
  items: [Narukami],
};

export const SandBurial: DomainDropSet = {
  type: "Domain Drop Set",
  name: registerMessage({ defaultMessage: "Sand Burial" }),
  days: WedSat,
  items: [NarukamiMask],
};

export const CourtOfFlowingSandDrops4: DomainDropSet = {
  type: "Domain Drop Set",
  days: Sun,
  items: [BranchOfDistantSea, Narukami, NarukamiMask],
};

export const DomainDropSets = [
  CityOfReflections,
  SubmergedValley,
  RuinsOfThirstingCapital,
  CeciliaGardenDrops4,
  Thundercloud,
  ThunderingRuins,
  TrailGroundsOfThunder,
  HiddenPalaceOfLianshanFormulaDrops4,
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
  MomijiDyedCourtDrops,
  VioletCourtDrops1,
  VioletCourtDrops2,
  VioletCourtDrops3,
  SunkenSands,
  AltarOfSands,
  SandBurial,
  CourtOfFlowingSandDrops4,
];
