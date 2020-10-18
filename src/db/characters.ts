import {
  Ballad,
  Diligence,
  Freedom,
  Gold,
  Prosperity,
  Resistance,
  TalentMaterial
} from "./talentMaterials";

export type Character = {
  type: "Character";
  name: string;
  wiki: string;
  talentMaterial: TalentMaterial;
};

export const Amber: Character = {
  type: "Character",
  name: "Amber",
  wiki: "https://genshin-impact.fandom.com/wiki/Amber",
  talentMaterial: Freedom
};

export const Barbara: Character = {
  type: "Character",
  name: "Barbara",
  wiki: "https://genshin-impact.fandom.com/wiki/Barbara",
  talentMaterial: Freedom
};

export const Beidou: Character = {
  type: "Character",
  name: "Beidou",
  wiki: "https://genshin-impact.fandom.com/wiki/Beidou",
  talentMaterial: Gold
};

export const Bennet: Character = {
  type: "Character",
  name: "Bennet",
  wiki: "https://genshin-impact.fandom.com/wiki/Bennet",
  talentMaterial: Resistance
};

export const Chongyun: Character = {
  type: "Character",
  name: "Chongyun",
  wiki: "https://genshin-impact.fandom.com/wiki/Chongyun",
  talentMaterial: Diligence
};

export const Diluc: Character = {
  type: "Character",
  name: "Diluc",
  wiki: "https://genshin-impact.fandom.com/wiki/Diluc",
  talentMaterial: Resistance
};

export const Fischl: Character = {
  type: "Character",
  name: "Fischl",
  wiki: "https://genshin-impact.fandom.com/wiki/Fischl",
  talentMaterial: Ballad
};

export const Jean: Character = {
  type: "Character",
  name: "Jean",
  wiki: "https://genshin-impact.fandom.com/wiki/Jean",
  talentMaterial: Resistance
};

export const Kaeya: Character = {
  type: "Character",
  name: "Kaeya",
  wiki: "https://genshin-impact.fandom.com/wiki/Kaeya",
  talentMaterial: Ballad
};

export const Keqing: Character = {
  type: "Character",
  name: "Keqing",
  wiki: "https://genshin-impact.fandom.com/wiki/Keqing",
  talentMaterial: Prosperity
};

export const Lisa: Character = {
  type: "Character",
  name: "Lisa",
  wiki: "https://genshin-impact.fandom.com/wiki/Lisa",
  talentMaterial: Ballad
};

export const Mona: Character = {
  type: "Character",
  name: "Mona",
  wiki: "https://genshin-impact.fandom.com/wiki/Mona",
  talentMaterial: Resistance
};

export const Ningguang: Character = {
  type: "Character",
  name: "Ningguang",
  wiki: "https://genshin-impact.fandom.com/wiki/Ningguang",
  talentMaterial: Prosperity
};

export const Noelle: Character = {
  type: "Character",
  name: "Noelle",
  wiki: "https://genshin-impact.fandom.com/wiki/Noelle",
  talentMaterial: Resistance
};

export const Qiqi: Character = {
  type: "Character",
  name: "Qiqi",
  wiki: "https://genshin-impact.fandom.com/wiki/Qiqi",
  talentMaterial: Prosperity
};

export const Razor: Character = {
  type: "Character",
  name: "Razor",
  wiki: "https://genshin-impact.fandom.com/wiki/Razor",
  talentMaterial: Resistance
};

export const Sucrose: Character = {
  type: "Character",
  name: "Sucrose",
  wiki: "https://genshin-impact.fandom.com/wiki/Sucrose",
  talentMaterial: Freedom
};

export const Venti: Character = {
  type: "Character",
  name: "Venti",
  wiki: "https://genshin-impact.fandom.com/wiki/Venti",
  talentMaterial: Ballad
};

export const Xiangling: Character = {
  type: "Character",
  name: "Xiangling",
  wiki: "https://genshin-impact.fandom.com/wiki/Xiangling",
  talentMaterial: Diligence
};

export const Xingqiu: Character = {
  type: "Character",
  name: "Xingqiu",
  wiki: "https://genshin-impact.fandom.com/wiki/Xingqiu",
  talentMaterial: Gold
};

export const Characters = [
  Amber,
  Barbara,
  Beidou,
  Bennet,
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
  Xingqiu
];
