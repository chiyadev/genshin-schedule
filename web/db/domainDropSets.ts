import {
  Adventurer,
  ArchaicPetra,
  Artifact,
  Berserker,
  BloodstainedChivalry,
  BraveHeart,
  CrimsonWitchOfFlames,
  DefendersWill,
  EchoesOfAnOffering,
  EmblemOfSeveredFate,
  Gambler,
  GladiatorsFinale,
  HuskOfOpulentDreams,
  Icebreaker,
  Instructor,
  Lavawalker,
  LuckyDog,
  MaidenBeloved,
  MartialArtist,
  NoblesseOblige,
  OceanConqueror,
  OceanHuedClam,
  PaleFlame,
  PrayersForDestiny,
  PrayersForIllumination,
  PrayersForWisdom,
  PrayersToSpringtime,
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
  VermillionHereafter,
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
  MoltenMoment,
  HellfireButterfly,
  AshenHeart,
  MudraOfTheMaleficGeneral,
  TheMeaningOfAeons,
  TearsOfTheCalamitousGod,
} from "./talentMaterials";
import { Weekday } from "../utils/time";
import { registerMessage } from "../utils";
import {
  AgnidusAgate,
  BasaltPillar,
  CharacterMaterial,
  CleansingHeart,
  CrystallineBloom,
  DewOfRepudiation,
  DragonheirsFalseFin,
  EverflameSeed,
  HoarfrostCore,
  HurricaneSeed,
  JuvenileJade,
  LightningPrism,
  MarionetteCore,
  PerpetualHeart,
  PrithivaTopaz,
  RiftbornRegalia,
  RunicFang,
  ShivadaJade,
  SmolderingPearl,
  StormBeads,
  VajradaAmethyst,
  VarunadaLazurite,
  VayudaTurquoise,
} from "./characterMaterials";

const MonThu: Weekday[] = ["monday", "thursday"];
const TueFri: Weekday[] = ["tuesday", "friday"];
const WedSat: Weekday[] = ["wednesday", "saturday"];
const Sun: Weekday[] = ["sunday"];
const Any: Weekday[] = [...MonThu, ...TueFri, ...WedSat, ...Sun];
const Trounce: Weekday[] = Any;

export type DomainDropSet = {
  type: "Domain Drop Set";
  name?: string;
  days: Weekday[];
  items: (Artifact | CharacterMaterial | WeaponMaterial | TalentMaterial)[];
  itemsAux?: (Artifact | CharacterMaterial | WeaponMaterial | TalentMaterial)[];
};

registerMessage({ defaultMessage: "Domain Drop Set" });

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

export const TrialGroundsOfThunder: DomainDropSet = {
  type: "Domain Drop Set",
  name: registerMessage({ defaultMessage: "Trial Grounds of Thunder" }),
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
  days: Any,
  items: [ThunderingFury, Thundersoother],
  itemsAux: [Adventurer, ResolutionOfSojourner],
};

export const DomainOfGuyunDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: Any,
  items: [ArchaicPetra, RetracingBolide],
  itemsAux: [LuckyDog, BraveHeart],
};

export const ValleyOfRemembranceDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: Any,
  items: [ViridescentVenerer, MaidenBeloved],
  itemsAux: [TravelingDoctor, TinyMiracle],
};

export const HiddenPalaceOfZhouFormulaDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: Any,
  items: [CrimsonWitchOfFlames, Lavawalker],
  itemsAux: [DefendersWill, MartialArtist],
};

export const ClearPoolAndMountainCavernDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: Any,
  items: [BloodstainedChivalry, NoblesseOblige],
  itemsAux: [Gambler, Scholar],
};

export const ConfrontStormterrorDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: Trounce,
  items: [DvalinPlume, DvalinSigh, DvalinClaw],
  itemsAux: [
    Berserker,
    Instructor,
    TheExile,
    GladiatorsFinale,
    WanderersTroupe,
    VayudaTurquoise,
    VajradaAmethyst,
    VarunadaLazurite,
  ],
};

export const WolfOfTheNorthChallengeDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: Trounce,
  items: [RingOfBoreas, SpiritLocketOfBoreas, TailOfBoreas],
  itemsAux: [
    Berserker,
    Instructor,
    TheExile,
    GladiatorsFinale,
    WanderersTroupe,
    ShivadaJade,
    AgnidusAgate,
    PrithivaTopaz,
  ],
};

export const PeakOfVindagnyrDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: Any,
  items: [Icebreaker, OceanConqueror],
  itemsAux: [DefendersWill, Gambler],
};

export const EnterTheGoldenHouseDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: Trounce,
  items: [TuskOfMonocerosCaeli, ShadowOfTheWarrior, ShardOfAFoulLegacy],
  itemsAux: [
    Berserker,
    Instructor,
    TheExile,
    GladiatorsFinale,
    WanderersTroupe,
    VarunadaLazurite,
    VajradaAmethyst,
    ShivadaJade,
  ],
};

export const BeneathTheDragonQuellerDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: Trounce,
  items: [DragonLordsCrown, BloodjadeBranch, GildedScale],
  itemsAux: [
    Berserker,
    Instructor,
    TheExile,
    GladiatorsFinale,
    WanderersTroupe,
    PrithivaTopaz,
    VarunadaLazurite,
    VajradaAmethyst,
    AgnidusAgate,
    ShivadaJade,
  ],
};

export const RidgeWatchDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: Any,
  items: [TenacityOfTheMillelith, PaleFlame],
  itemsAux: [BraveHeart, MartialArtist],
};

export const MomijiDyedCourtDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: Any,
  items: [ShimenawaReminiscence, EmblemOfSeveredFate],
  itemsAux: [ResolutionOfSojourner, TinyMiracle],
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

export const VioletCourtDrops4: DomainDropSet = {
  type: "Domain Drop Set",
  days: Sun,
  items: [Elegance, Light, Transience],
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

export const AnemoHypostasisDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: Any,
  items: [VayudaTurquoise, HurricaneSeed],
  itemsAux: [LuckyDog, Berserker, Instructor, GladiatorsFinale, WanderersTroupe],
};

export const MaguuKenkiDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: Any,
  items: [MarionetteCore],
  itemsAux: [Berserker, Instructor, LuckyDog, GladiatorsFinale, WanderersTroupe, VayudaTurquoise, ShivadaJade],
};

export const CryoRegisvineDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: Any,
  items: [ShivadaJade, HoarfrostCore],
  itemsAux: [LuckyDog, Berserker, TheExile, PrayersToSpringtime, GladiatorsFinale, WanderersTroupe],
};

export const CryoHypostasisDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: Any,
  items: [ShivadaJade, CrystallineBloom],
  itemsAux: [LuckyDog, Berserker, TheExile, PrayersToSpringtime, GladiatorsFinale, WanderersTroupe],
};

export const PrimoGeovishapDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: Any,
  items: [JuvenileJade],
  itemsAux: [
    Berserker,
    Instructor,
    TheExile,
    GladiatorsFinale,
    WanderersTroupe,
    PrayersForWisdom,
    PrayersToSpringtime,
    PrayersForIllumination,
    PrayersForDestiny,
    PrithivaTopaz,
    VajradaAmethyst,
    ShivadaJade,
    AgnidusAgate,
    VarunadaLazurite,
  ],
};

export const ElectroHypostasisDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: Any,
  items: [VajradaAmethyst, LightningPrism],
  itemsAux: [TravelingDoctor, Instructor, TheExile, PrayersForWisdom, GladiatorsFinale, WanderersTroupe],
};

export const GeoHypostasisDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: Any,
  items: [PrithivaTopaz, BasaltPillar],
  itemsAux: [TravelingDoctor, Instructor, TheExile, GladiatorsFinale, WanderersTroupe],
};

export const RhodeiaOfLochDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: Any,
  items: [VarunadaLazurite, CleansingHeart],
  itemsAux: [Adventurer, Berserker, TheExile, PrayersForDestiny, GladiatorsFinale, WanderersTroupe],
};

export const PyroRegisvineDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: Any,
  items: [AgnidusAgate, EverflameSeed],
  itemsAux: [Adventurer, Berserker, Instructor, PrayersForIllumination, GladiatorsFinale, WanderersTroupe],
};

export const PyroHypostasisDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: Any,
  items: [AgnidusAgate, SmolderingPearl],
  itemsAux: [Adventurer, Instructor, Berserker, PrayersForIllumination, GladiatorsFinale, WanderersTroupe],
};

export const PerpetualMechanicalArrayDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: Any,
  items: [PerpetualHeart],
  itemsAux: [Berserker, TheExile, LuckyDog, GladiatorsFinale, WanderersTroupe, PrithivaTopaz, ShivadaJade],
};

export const ThunderManifestationDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: Any,
  items: [VajradaAmethyst, StormBeads],
  itemsAux: [TravelingDoctor, Instructor, TheExile, PrayersForWisdom, GladiatorsFinale, WanderersTroupe],
};

export const HydroHypostasisDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: Any,
  items: [VarunadaLazurite, DewOfRepudiation],
  itemsAux: [TravelingDoctor, Instructor, TheExile, PrayersForDestiny, GladiatorsFinale, WanderersTroupe],
};

export const NarukamiIslandTenshukakuDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: Trounce,
  items: [MoltenMoment, HellfireButterfly, AshenHeart],
  itemsAux: [Berserker, Instructor, TheExile, GladiatorsFinale, WanderersTroupe, ShivadaJade, AgnidusAgate],
};

export const GoldenWolflordDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: Any,
  items: [PrithivaTopaz, RiftbornRegalia],
  itemsAux: [TravelingDoctor, Instructor, TheExile, GladiatorsFinale, WanderersTroupe],
};

export const SlumberingCourtDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: Any,
  items: [OceanHuedClam, HuskOfOpulentDreams],
  itemsAux: [DefendersWill, BraveHeart],
};

export const BathysmalVishapHerdDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: Any,
  items: [DragonheirsFalseFin],
  itemsAux: [
    Berserker,
    TheExile,
    LuckyDog,
    PrayersToSpringtime,
    GladiatorsFinale,
    WanderersTroupe,
    VajradaAmethyst,
    ShivadaJade,
  ],
};

export const EndOfTheOneiricEuthymiaDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: Trounce,
  items: [VajradaAmethyst, MudraOfTheMaleficGeneral, TheMeaningOfAeons, TearsOfTheCalamitousGod],
  itemsAux: [Berserker, Instructor, TheExile, GladiatorsFinale, WanderersTroupe],
};

export const TheLostValleyDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: Any,
  items: [EchoesOfAnOffering, VermillionHereafter],
  itemsAux: [MartialArtist, Gambler],
};

export const RuinSerpentDrops: DomainDropSet = {
  type: "Domain Drop Set",
  days: Any,
  items: [PrithivaTopaz, RunicFang],
  itemsAux: [TravelingDoctor, Instructor, TheExile, GladiatorsFinale, WanderersTroupe],
};

export const DomainDropSets = [
  CityOfReflections,
  SubmergedValley,
  RuinsOfThirstingCapital,
  CeciliaGardenDrops4,
  Thundercloud,
  ThunderingRuins,
  TrialGroundsOfThunder,
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
  VioletCourtDrops4,
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
  HydroHypostasisDrops,
  NarukamiIslandTenshukakuDrops,
  GoldenWolflordDrops,
  SlumberingCourtDrops,
  BathysmalVishapHerdDrops,
  EndOfTheOneiricEuthymiaDrops,
  TheLostValleyDrops,
  RuinSerpentDrops,
];
