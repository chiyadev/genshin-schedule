import {
  Ballad,
  Diligence,
  Freedom,
  Gold,
  Prosperity,
  Resistance,
  TalentMaterial,
} from "./talentMaterials";
import {
  CommonMaterial,
  FatuiInsignia,
  HilichurlArrowhead,
  HilichurlMask,
  SamachurlScroll,
  Slime,
  TreasureHoarderInsignia,
  WhopperflowerNectar,
} from "./commonMaterials";

export type Character = {
  type: "Character";
  name: string;
  wiki: string;
  talentMaterials: TalentMaterial[];
  commonMaterials: CommonMaterial[];
};

export const TravelerAnemo: Character = {
  type: "Character",
  name: "Traveler (Anemo)",
  wiki: "https://genshin-impact.fandom.com/wiki/Traveler#Anemo",
  talentMaterials: [Resistance, Ballad],
  commonMaterials: [SamachurlScroll],
};

export const TravelerGeo: Character = {
  type: "Character",
  name: "Traveler (Geo)",
  wiki: "https://genshin-impact.fandom.com/wiki/Traveler#Geo",
  talentMaterials: [Resistance, Diligence],
  commonMaterials: [SamachurlScroll, HilichurlArrowhead],
};

export const Amber: Character = {
  type: "Character",
  name: "Amber",
  wiki: "https://genshin-impact.fandom.com/wiki/Amber",
  talentMaterials: [Freedom],
  commonMaterials: [HilichurlArrowhead],
};

export const Barbara: Character = {
  type: "Character",
  name: "Barbara",
  wiki: "https://genshin-impact.fandom.com/wiki/Barbara",
  talentMaterials: [Freedom],
  commonMaterials: [SamachurlScroll],
};

export const Beidou: Character = {
  type: "Character",
  name: "Beidou",
  wiki: "https://genshin-impact.fandom.com/wiki/Beidou",
  talentMaterials: [Gold],
  commonMaterials: [TreasureHoarderInsignia],
};

export const Bennett: Character = {
  type: "Character",
  name: "Bennett",
  wiki: "https://genshin-impact.fandom.com/wiki/Bennett",
  talentMaterials: [Resistance],
  commonMaterials: [TreasureHoarderInsignia],
};

export const Chongyun: Character = {
  type: "Character",
  name: "Chongyun",
  wiki: "https://genshin-impact.fandom.com/wiki/Chongyun",
  talentMaterials: [Diligence],
  commonMaterials: [HilichurlMask],
};

export const Diluc: Character = {
  type: "Character",
  name: "Diluc",
  wiki: "https://genshin-impact.fandom.com/wiki/Diluc",
  talentMaterials: [Resistance],
  commonMaterials: [FatuiInsignia],
};

export const Fischl: Character = {
  type: "Character",
  name: "Fischl",
  wiki: "https://genshin-impact.fandom.com/wiki/Fischl",
  talentMaterials: [Ballad],
  commonMaterials: [HilichurlArrowhead],
};

export const Jean: Character = {
  type: "Character",
  name: "Jean",
  wiki: "https://genshin-impact.fandom.com/wiki/Jean",
  talentMaterials: [Resistance],
  commonMaterials: [HilichurlMask],
};

export const Kaeya: Character = {
  type: "Character",
  name: "Kaeya",
  wiki: "https://genshin-impact.fandom.com/wiki/Kaeya",
  talentMaterials: [Ballad],
  commonMaterials: [TreasureHoarderInsignia],
};

export const Keqing: Character = {
  type: "Character",
  name: "Keqing",
  wiki: "https://genshin-impact.fandom.com/wiki/Keqing",
  talentMaterials: [Prosperity],
  commonMaterials: [WhopperflowerNectar],
};

export const Lisa: Character = {
  type: "Character",
  name: "Lisa",
  wiki: "https://genshin-impact.fandom.com/wiki/Lisa",
  talentMaterials: [Ballad],
  commonMaterials: [Slime],
};

export const Mona: Character = {
  type: "Character",
  name: "Mona",
  wiki: "https://genshin-impact.fandom.com/wiki/Mona",
  talentMaterials: [Resistance],
  commonMaterials: [WhopperflowerNectar],
};

export const Ningguang: Character = {
  type: "Character",
  name: "Ningguang",
  wiki: "https://genshin-impact.fandom.com/wiki/Ningguang",
  talentMaterials: [Prosperity],
  commonMaterials: [FatuiInsignia],
};

export const Noelle: Character = {
  type: "Character",
  name: "Noelle",
  wiki: "https://genshin-impact.fandom.com/wiki/Noelle",
  talentMaterials: [Resistance],
  commonMaterials: [HilichurlMask],
};

export const Qiqi: Character = {
  type: "Character",
  name: "Qiqi",
  wiki: "https://genshin-impact.fandom.com/wiki/Qiqi",
  talentMaterials: [Prosperity],
  commonMaterials: [SamachurlScroll],
};

export const Razor: Character = {
  type: "Character",
  name: "Razor",
  wiki: "https://genshin-impact.fandom.com/wiki/Razor",
  talentMaterials: [Resistance],
  commonMaterials: [HilichurlMask],
};

export const Sucrose: Character = {
  type: "Character",
  name: "Sucrose",

  wiki: "https://genshin-impact.fandom.com/wiki/Sucrose",
  talentMaterials: [Freedom],
  commonMaterials: [WhopperflowerNectar],
};

export const Venti: Character = {
  type: "Character",
  name: "Venti",
  wiki: "https://genshin-impact.fandom.com/wiki/Venti",
  talentMaterials: [Ballad],
  commonMaterials: [Slime],
};

export const Xiangling: Character = {
  type: "Character",
  name: "Xiangling",
  wiki: "https://genshin-impact.fandom.com/wiki/Xiangling",
  talentMaterials: [Diligence],
  commonMaterials: [Slime],
};

export const Xingqiu: Character = {
  type: "Character",
  name: "Xingqiu",
  wiki: "https://genshin-impact.fandom.com/wiki/Xingqiu",
  talentMaterials: [Gold],
  commonMaterials: [HilichurlMask],
};

export const Klee: Character = {
  type: "Character",
  name: "Klee",
  wiki: "https://genshin-impact.fandom.com/wiki/Klee",
  talentMaterials: [Freedom],
  commonMaterials: [SamachurlScroll],
};

export const Tartaglia: Character = {
  type: "Character",
  name: "Tartaglia",
  wiki: "https://genshin-impact.fandom.com/wiki/Tartaglia",
  talentMaterials: [Freedom],
  commonMaterials: [FatuiInsignia],
};

export const Diona: Character = {
  type: "Character",
  name: "Diona",
  wiki: "https://genshin-impact.fandom.com/wiki/Diona",
  talentMaterials: [Freedom],
  commonMaterials: [HilichurlArrowhead],
};

export const Characters = [
  //TravelerAnemo,
  //TravelerGeo,
  Amber,
  Barbara,
  Beidou,
  Bennett,
  Chongyun,
  Diluc,
  Fischl,
  Jean,
  Kaeya,
  Keqing,
  Lisa,
  Mona,
  Ningguang,
  Noelle,
  Qiqi,
  Razor,
  Sucrose,
  Venti,
  Xiangling,
  Xingqiu,
  Klee,
  Tartaglia,
  Diona,
];
