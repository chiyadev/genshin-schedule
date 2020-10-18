import {
  CeciliaGarden,
  ClearPoolAndMountainCavern,
  Domain,
  DomainOfGuyun,
  ForsakenRift,
  HiddenPalaceOfLianshanFormula,
  HiddenPalaceOfZhouFormula,
  MidsummerCourtyard,
  TaishanMansion,
  ValleyOfRemembrance
} from "./domains";
import {
  Amber,
  Barbara,
  Beidou,
  Bennet,
  Character,
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
} from "./characters";

export type Region = {
  type: "Region";
  name: string;
  wiki: string;
  domains: Domain[];
  characters: Character[];
};

export const Mondstadt: Region = {
  type: "Region",
  name: "Mondstadt",
  wiki: "https://genshin-impact.fandom.com/wiki/Mondstadt",
  domains: [
    CeciliaGarden,
    MidsummerCourtyard,
    ValleyOfRemembrance,
    ForsakenRift
  ],
  characters: [
    Amber,
    Barbara,
    Bennet,
    Diluc,
    Fischl,
    Jean,
    Kaeya,
    Lisa,
    Mona,
    Noelle,
    Razor,
    Sucrose,
    Venti
  ]
};

export const Liyue: Region = {
  type: "Region",
  name: "Liyue",
  wiki: "https://genshin-impact.fandom.com/wiki/Liyue",
  domains: [
    HiddenPalaceOfLianshanFormula,
    DomainOfGuyun,
    HiddenPalaceOfZhouFormula,
    ClearPoolAndMountainCavern,
    TaishanMansion
  ],
  characters: [Beidou, Chongyun, Keqing, Ningguang, Qiqi, Xiangling, Xingqiu]
};

export const Regions = [Mondstadt, Liyue];
