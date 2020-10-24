import {
  Ballad,
  Diligence,
  Freedom,
  Gold,
  Prosperity,
  Resistance,
  TalentMaterial
} from "./talentMaterials";
import {
  CommonMaterial,
  FatuiInsignia,
  HilichurlArrowhead,
  HilichurlMask,
  SamachurlScroll,
  Slime,
  TreasureHoarderInsignia,
  WhopperflowerNectar
} from "./commonMaterials";

export type Character = {
  type: "Character";
  name: string;
  wiki: string;
  talentMaterial: TalentMaterial;
  commonMaterial: CommonMaterial;
};

export const Amber: Character = {
  type: "Character",
  name: "Amber",
  wiki: "https://genshin-impact.fandom.com/wiki/Amber",
  talentMaterial: Freedom,
  commonMaterial: HilichurlArrowhead
};

export const Barbara: Character = {
  type: "Character",
  name: "Barbara",
  wiki: "https://genshin-impact.fandom.com/wiki/Barbara",
  talentMaterial: Freedom,
  commonMaterial: SamachurlScroll
};

export const Beidou: Character = {
  type: "Character",
  name: "Beidou",
  wiki: "https://genshin-impact.fandom.com/wiki/Beidou",
  talentMaterial: Gold,
  commonMaterial: TreasureHoarderInsignia
};

export const Bennett: Character = {
  type: "Character",
  name: "Bennett",
  wiki: "https://genshin-impact.fandom.com/wiki/Bennett",
  talentMaterial: Resistance,
  commonMaterial: TreasureHoarderInsignia
};

export const Chongyun: Character = {
  type: "Character",
  name: "Chongyun",
  wiki: "https://genshin-impact.fandom.com/wiki/Chongyun",

  talentMaterial: Diligence,
  commonMaterial: HilichurlMask
};

export const Diluc: Character = {
  type: "Character",
  name: "Diluc",
  wiki: "https://genshin-impact.fandom.com/wiki/Diluc",
  talentMaterial: Resistance,
  commonMaterial: FatuiInsignia
};

export const Fischl: Character = {
  type: "Character",
  name: "Fischl",
  wiki: "https://genshin-impact.fandom.com/wiki/Fischl",
  talentMaterial: Ballad,
  commonMaterial: HilichurlArrowhead
};

export const Jean: Character = {
  type: "Character",
  name: "Jean",
  wiki: "https://genshin-impact.fandom.com/wiki/Jean",
  talentMaterial: Resistance,
  commonMaterial: HilichurlMask
};

export const Kaeya: Character = {
  type: "Character",
  name: "Kaeya",
  wiki: "https://genshin-impact.fandom.com/wiki/Kaeya",
  talentMaterial: Ballad,
  commonMaterial: TreasureHoarderInsignia
};

export const Keqing: Character = {
  type: "Character",
  name: "Keqing",
  wiki: "https://genshin-impact.fandom.com/wiki/Keqing",
  talentMaterial: Prosperity,
  commonMaterial: WhopperflowerNectar
};

export const Lisa: Character = {
  type: "Character",
  name: "Lisa",
  wiki: "https://genshin-impact.fandom.com/wiki/Lisa",
  talentMaterial: Ballad,
  commonMaterial: Slime
};

export const Mona: Character = {
  type: "Character",
  name: "Mona",
  wiki: "https://genshin-impact.fandom.com/wiki/Mona",
  talentMaterial: Resistance,
  commonMaterial: WhopperflowerNectar
};

export const Ningguang: Character = {
  type: "Character",
  name: "Ningguang",
  wiki: "https://genshin-impact.fandom.com/wiki/Ningguang",
  talentMaterial: Prosperity,
  commonMaterial: FatuiInsignia
};

export const Noelle: Character = {
  type: "Character",
  name: "Noelle",
  wiki: "https://genshin-impact.fandom.com/wiki/Noelle",
  talentMaterial: Resistance,
  commonMaterial: HilichurlMask
};

export const Qiqi: Character = {
  type: "Character",
  name: "Qiqi",
  wiki: "https://genshin-impact.fandom.com/wiki/Qiqi",
  talentMaterial: Prosperity,
  commonMaterial: SamachurlScroll
};

export const Razor: Character = {
  type: "Character",
  name: "Razor",
  wiki: "https://genshin-impact.fandom.com/wiki/Razor",
  talentMaterial: Resistance,
  commonMaterial: HilichurlMask
};

export const Sucrose: Character = {
  type: "Character",
  name: "Sucrose",

  wiki: "https://genshin-impact.fandom.com/wiki/Sucrose",
  talentMaterial: Freedom,
  commonMaterial: WhopperflowerNectar
};

export const Venti: Character = {
  type: "Character",
  name: "Venti",
  wiki: "https://genshin-impact.fandom.com/wiki/Venti",
  talentMaterial: Ballad,
  commonMaterial: Slime
};

export const Xiangling: Character = {
  type: "Character",
  name: "Xiangling",
  wiki: "https://genshin-impact.fandom.com/wiki/Xiangling",
  talentMaterial: Diligence,
  commonMaterial: Slime
};

export const Xingqiu: Character = {
  type: "Character",
  name: "Xingqiu",
  wiki: "https://genshin-impact.fandom.com/wiki/Xingqiu",
  talentMaterial: Gold,
  commonMaterial: HilichurlMask
};

export const Klee: Character = {
  type: "Character",
  name: "Klee",
  wiki: "https://genshin-impact.fandom.com/wiki/Klee",
  talentMaterial: Freedom,
  commonMaterial: SamachurlScroll
};

export const Characters = [
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
  Klee
];
