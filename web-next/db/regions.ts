import {
  CeciliaGarden,
  ClearPoolAndMountainCavern,
  ConfrontStormterror,
  Domain,
  DomainOfGuyun,
  ForsakenRift,
  HiddenPalaceOfLianshanFormula,
  HiddenPalaceOfZhouFormula,
  MidsummerCourtyard,
  TaishanMansion,
  ValleyOfRemembrance,
  WolfOfTheNorthChallenge,
} from "./domains";
import {
  Amber,
  Barbara,
  Beidou,
  Bennett,
  Character,
  Chongyun,
  Diluc,
  Diona,
  Fischl,
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
  Sucrose,
  Tartaglia,
  Venti,
  Xiangling,
  Xingqiu,
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
    ForsakenRift,
    ConfrontStormterror,
    WolfOfTheNorthChallenge,
  ],
  characters: [
    Amber,
    Barbara,
    Bennett,
    Diluc,
    Fischl,
    Jean,
    Kaeya,
    Lisa,
    Mona,
    Noelle,
    Razor,
    Sucrose,
    Venti,
    Klee,
    Diona,
  ],
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
    TaishanMansion,
  ],
  characters: [Beidou, Chongyun, Keqing, Ningguang, Qiqi, Xiangling, Xingqiu],
};

export const Snezhnaya: Region = {
  type: "Region",
  name: "Snezhnaya",
  wiki: "https://genshin-impact.fandom.com/wiki/Snezhnaya",
  domains: [],
  characters: [Tartaglia],
};

export const Regions = [Mondstadt, Liyue, Snezhnaya];
