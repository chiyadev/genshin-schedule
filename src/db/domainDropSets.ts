import {
  Adventurer,
  ArchaicPetra,
  Artifact,
  BraveHeart,
  CrimsonWitchOfFlames,
  DefendersWill,
  Lavawalker,
  LuckyDog,
  MaidenBeloved,
  MartialArtist,
  NoblesseOblige,
  ResolutionOfSojourner,
  RetracingBolide,
  ThunderingFury,
  Thundersoother,
  TinyMiracle,
  TravelingDoctor,
  ViridescentVenerer
} from "./artifacts";
import {
  Aerosiderite,
  BorealWolf,
  DandelionGladiator,
  Decarabian,
  Guyun,
  MistVeiledElixir,
  WeaponMaterial
} from "./weaponMaterials";
import {
  Ballad,
  Diligence,
  Freedom,
  Gold,
  Prosperity,
  Resistance,
  TalentMaterial
} from "./talentMaterials";

export type DayOfWeek =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export const DaysOfWeek: DayOfWeek[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const MonThur: DayOfWeek[] = ["Monday", "Thursday"];
const TuesFri: DayOfWeek[] = ["Tuesday", "Friday"];
const WedSat: DayOfWeek[] = ["Wednesday", "Saturday"];
const Sun: DayOfWeek[] = ["Sunday"];
const All: DayOfWeek[] = [...MonThur, ...TuesFri, ...WedSat, ...Sun];

export type DomainDropSet = {
  type: "Domain Drop Set";
  name?: string;
  days: DayOfWeek[];
  items: (Artifact | WeaponMaterial | TalentMaterial)[];
};

export const CityOfReflections: DomainDropSet = {
  type: "Domain Drop Set",
  name: "City of Reflections",
  days: MonThur,
  items: [Decarabian]
};

export const SubmergedValley: DomainDropSet = {
  type: "Domain Drop Set",
  name: "Submerged Valley",
  days: TuesFri,
  items: [BorealWolf]
};

export const RuinsOfThirstingCapital: DomainDropSet = {
  type: "Domain Drop Set",
  name: "Ruins of Thirsting Capital",
  days: WedSat,
  items: [DandelionGladiator]
};

export const AltarOfTheFalls: DomainDropSet = {
  type: "Domain Drop Set",
  name: "Altar of the Falls",
  days: Sun,
  items: [Decarabian, BorealWolf, DandelionGladiator]
};

export const Thundercloud: DomainDropSet = {
  type: "Domain Drop Set",
  name: "Thundercloud",
  days: MonThur,
  items: [Guyun]
};

export const ThunderingRuins: DomainDropSet = {
  type: "Domain Drop Set",
  name: "Thundering Ruins",
  days: TuesFri,
  items: [MistVeiledElixir]
};

export const TrailGroundsOfThunder: DomainDropSet = {
  type: "Domain Drop Set",
  name: "Trail Grounds of Thunder",
  days: WedSat,
  items: [Aerosiderite]
};

export const ElectrostaticField: DomainDropSet = {
  type: "Domain Drop Set",
  name: "Electrostatic Field",
  days: Sun,
  items: [Guyun, MistVeiledElixir, Aerosiderite]
};

export const ForsakenRiftDrops1: DomainDropSet = {
  type: "Domain Drop Set",
  days: MonThur,
  items: [Freedom]
};

export const ForsakenRiftDrops2: DomainDropSet = {
  type: "Domain Drop Set",
  days: TuesFri,
  items: [Resistance]
};

export const ForsakenRiftDrops3: DomainDropSet = {
  type: "Domain Drop Set",
  days: WedSat,
  items: [Ballad]
};

export const ForsakenRiftDrops4: DomainDropSet = {
  type: "Domain Drop Set",
  days: Sun,
  items: [Freedom, Resistance, Ballad]
};

export const TaishanMansionDrops1: DomainDropSet = {
  type: "Domain Drop Set",
  days: MonThur,
  items: [Prosperity]
};

export const TaishanMansionDrops2: DomainDropSet = {
  type: "Domain Drop Set",
  days: TuesFri,
  items: [Diligence]
};

export const TaishanMansionDrops3: DomainDropSet = {
  type: "Domain Drop Set",
  days: WedSat,
  items: [Gold]
};

export const TaishanMansionDrops4: DomainDropSet = {
  type: "Domain Drop Set",
  days: Sun,
  items: [Prosperity, Diligence, Gold]
};

export const MidsummerCourtyardDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: All,
  items: [Adventurer, ResolutionOfSojourner, ThunderingFury, Thundersoother]
};

export const DomainOfGuyunDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: All,
  items: [LuckyDog, BraveHeart, ArchaicPetra, RetracingBolide]
};

export const ValleyOfRemembranceDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: All,
  items: [TravelingDoctor, TinyMiracle, ViridescentVenerer, MaidenBeloved]
};

export const HiddenPalaceOfZhouFormulaDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: All,
  items: [DefendersWill, MartialArtist, CrimsonWitchOfFlames, Lavawalker]
};

export const ClearPoolAndMountainCavernDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: All,
  items: [NoblesseOblige]
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
  ClearPoolAndMountainCavernDrops
];
