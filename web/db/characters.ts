import {
  Ballad,
  BloodjadeBranch,
  Diligence,
  DragonLordsCrown,
  DvalinClaw,
  DvalinPlume,
  DvalinSigh,
  Freedom,
  Gold,
  Prosperity,
  Resistance,
  RingOfBoreas,
  ShadowOfTheWarrior,
  ShardOfAFoulLegacy,
  SpiritLocketOfBoreas,
  TailOfBoreas,
  TalentMaterial,
  TuskOfMonocerosCaeli,
} from "./talentMaterials";
import {
  CallaLily,
  Cecilia,
  CommonMaterial,
  CorLapis,
  DandelionSeed,
  FatuiInsignia,
  GlazeLily,
  HilichurlArrowhead,
  HilichurlMask,
  JueyunChili,
  NoctilucousJade,
  PhilanemoMushroom,
  Qingxin,
  SamachurlScroll,
  SilkFlower,
  Slime,
  SmallLampGrass,
  Starconch,
  TreasureHoarderInsignia,
  Valberry,
  Violetgrass,
  WhopperflowerNectar,
  WindwheelAster,
  Wolfhook,
} from "./commonMaterials";
import { registerMessage } from "../utils";

export const CharacterWiki = "https://genshin-impact.fandom.com/wiki/Characters";

export type Character = {
  type: "Character";
  name: string;
  wiki: string;
  talentMaterialWeekly: TalentMaterial[];
  talentMaterials: TalentMaterial[];
  commonMaterials: CommonMaterial[];
};

export const TravelerAnemo: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Traveler (Anemo)" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Traveler#Anemo",
  talentMaterialWeekly: [DvalinSigh],
  talentMaterials: [Resistance, Ballad],
  commonMaterials: [SamachurlScroll, WindwheelAster],
};

export const TravelerGeo: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Traveler (Geo)" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Traveler#Geo",
  talentMaterialWeekly: [DvalinSigh],
  talentMaterials: [Resistance, Diligence],
  commonMaterials: [SamachurlScroll, HilichurlArrowhead, WindwheelAster],
};

export const Amber: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Amber" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Amber",
  talentMaterialWeekly: [DvalinSigh],
  talentMaterials: [Freedom],
  commonMaterials: [HilichurlArrowhead, SmallLampGrass],
};

export const Barbara: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Barbara" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Barbara",
  talentMaterialWeekly: [RingOfBoreas],
  talentMaterials: [Freedom],
  commonMaterials: [SamachurlScroll, PhilanemoMushroom],
};

export const Beidou: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Beidou" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Beidou",
  talentMaterialWeekly: [DvalinSigh],
  talentMaterials: [Gold],
  commonMaterials: [TreasureHoarderInsignia, NoctilucousJade],
};

export const Bennett: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Bennett" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Bennett",
  talentMaterialWeekly: [DvalinPlume],
  talentMaterials: [Resistance],
  commonMaterials: [TreasureHoarderInsignia, WindwheelAster],
};

export const Chongyun: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Chongyun" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Chongyun",
  talentMaterialWeekly: [DvalinSigh],
  talentMaterials: [Diligence],
  commonMaterials: [HilichurlMask, CorLapis],
};

export const Diluc: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Diluc" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Diluc",
  talentMaterialWeekly: [DvalinPlume],
  talentMaterials: [Resistance],
  commonMaterials: [FatuiInsignia, SmallLampGrass],
};

export const Fischl: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Fischl" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Fischl",
  talentMaterialWeekly: [SpiritLocketOfBoreas],
  talentMaterials: [Ballad],
  commonMaterials: [HilichurlArrowhead, SmallLampGrass],
};

export const Jean: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Jean" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Jean",
  talentMaterialWeekly: [DvalinPlume],
  talentMaterials: [Resistance],
  commonMaterials: [HilichurlMask, DandelionSeed],
};

export const Kaeya: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Kaeya" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Kaeya",
  talentMaterialWeekly: [SpiritLocketOfBoreas],
  talentMaterials: [Ballad],
  commonMaterials: [TreasureHoarderInsignia, CallaLily],
};

export const Keqing: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Keqing" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Keqing",
  talentMaterialWeekly: [RingOfBoreas],
  talentMaterials: [Prosperity],
  commonMaterials: [WhopperflowerNectar, CorLapis],
};

export const Lisa: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Lisa" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Lisa",
  talentMaterialWeekly: [DvalinClaw],
  talentMaterials: [Ballad],
  commonMaterials: [Slime, Valberry],
};

export const Mona: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Mona" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Mona",
  talentMaterialWeekly: [RingOfBoreas],
  talentMaterials: [Resistance],
  commonMaterials: [WhopperflowerNectar, PhilanemoMushroom],
};

export const Ningguang: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Ningguang" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Ningguang",
  talentMaterialWeekly: [SpiritLocketOfBoreas],
  talentMaterials: [Prosperity],
  commonMaterials: [FatuiInsignia, GlazeLily],
};

export const Noelle: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Noelle" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Noelle",
  talentMaterialWeekly: [DvalinClaw],
  talentMaterials: [Resistance],
  commonMaterials: [HilichurlMask, Valberry],
};

export const Qiqi: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Qiqi" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Qiqi",
  talentMaterialWeekly: [TailOfBoreas],
  talentMaterials: [Prosperity],
  commonMaterials: [SamachurlScroll, Violetgrass],
};

export const Razor: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Razor" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Razor",
  talentMaterialWeekly: [DvalinClaw],
  talentMaterials: [Resistance],
  commonMaterials: [HilichurlMask, Wolfhook],
};

export const Sucrose: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Sucrose" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Sucrose",
  talentMaterialWeekly: [SpiritLocketOfBoreas],
  talentMaterials: [Freedom],
  commonMaterials: [WhopperflowerNectar, WindwheelAster],
};

export const Venti: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Venti" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Venti",
  talentMaterialWeekly: [TailOfBoreas],
  talentMaterials: [Ballad],
  commonMaterials: [Slime, Cecilia],
};

export const Xiangling: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Xiangling" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Xiangling",
  talentMaterialWeekly: [DvalinClaw],
  talentMaterials: [Diligence],
  commonMaterials: [Slime, JueyunChili],
};

export const Xingqiu: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Xingqiu" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Xingqiu",
  talentMaterialWeekly: [TailOfBoreas],
  talentMaterials: [Gold],
  commonMaterials: [HilichurlMask, SilkFlower],
};

export const Klee: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Klee" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Klee",
  talentMaterialWeekly: [RingOfBoreas],
  talentMaterials: [Freedom],
  commonMaterials: [SamachurlScroll, PhilanemoMushroom],
};

export const Tartaglia: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Tartaglia" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Tartaglia",
  talentMaterialWeekly: [ShardOfAFoulLegacy],
  talentMaterials: [Freedom],
  commonMaterials: [FatuiInsignia, Starconch],
};

export const Diona: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Diona" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Diona",
  talentMaterialWeekly: [ShardOfAFoulLegacy],
  talentMaterials: [Freedom],
  commonMaterials: [HilichurlArrowhead, CallaLily],
};

export const Zhongli: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Zhongli" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Zhongli",
  talentMaterialWeekly: [TuskOfMonocerosCaeli],
  talentMaterials: [Gold],
  commonMaterials: [Slime, CorLapis],
};

export const Xinyan: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Xinyan" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Xinyan",
  talentMaterialWeekly: [TuskOfMonocerosCaeli],
  talentMaterials: [Gold],
  commonMaterials: [TreasureHoarderInsignia, Violetgrass],
};

export const Yanfei: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Yanfei" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Yanfei",
  talentMaterialWeekly: [BloodjadeBranch],
  talentMaterials: [Gold],
  commonMaterials: [TreasureHoarderInsignia, NoctilucousJade],
};

export const Eula: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Eula" }),
  wiki: "https://genshin.honeyhunterworld.com/db/char/eula/",
  talentMaterialWeekly: [DragonLordsCrown],
  talentMaterials: [Resistance],
  commonMaterials: [HilichurlMask, DandelionSeed],
};

export const Albedo: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Albedo" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Albedo",
  talentMaterialWeekly: [TuskOfMonocerosCaeli],
  talentMaterials: [Ballad],
  commonMaterials: [SamachurlScroll, Cecilia],
};

export const Ganyu: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Ganyu" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Ganyu",
  talentMaterialWeekly: [ShadowOfTheWarrior],
  talentMaterials: [Diligence],
  commonMaterials: [WhopperflowerNectar, Qingxin],
};

export const Ayaka: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Ayaka" }),
  wiki: "https://genshin.honeyhunterworld.com/db/char/ayaka/",
  talentMaterialWeekly: [RingOfBoreas],
  talentMaterials: [Prosperity],
  commonMaterials: [SamachurlScroll, WhopperflowerNectar, SmallLampGrass],
};

export const Xiao: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Xiao" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Xiao",
  talentMaterialWeekly: [ShadowOfTheWarrior],
  talentMaterials: [Prosperity],
  commonMaterials: [Slime, Qingxin],
};

export const Rosaria: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Rosaria" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Rosaria",
  talentMaterialWeekly: [ShadowOfTheWarrior],
  talentMaterials: [Ballad],
  commonMaterials: [FatuiInsignia, Valberry],
};

export const HuTao: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Hu Tao" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Hu_Tao",
  talentMaterialWeekly: [ShardOfAFoulLegacy],
  talentMaterials: [Diligence],
  commonMaterials: [WhopperflowerNectar, SilkFlower],
};

export const Characters = [
  //TravelerAnemo,
  //TravelerGeo,
  Albedo,
  Amber,
  Ayaka,
  Barbara,
  Beidou,
  Bennett,
  Chongyun,
  Diluc,
  Diona,
  Eula,
  Fischl,
  Ganyu,
  HuTao,
  Jean,
  Kaeya,
  Keqing,
  Klee,
  Lisa,
  Mona,
  Ningguang,
  Noelle,
  Qiqi,
  Razor,
  Rosaria,
  Sucrose,
  Tartaglia,
  Venti,
  Xiangling,
  Xiao,
  Xingqiu,
  Xinyan,
  Yanfei,
  Zhongli,
];
