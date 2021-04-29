import {
  BeneathTheDragonQueller,
  CeciliaGarden,
  ClearPoolAndMountainCavern,
  ConfrontStormterror,
  Domain,
  DomainOfGuyun,
  EnterTheGoldenHouse,
  ForsakenRift,
  HiddenPalaceOfLianshanFormula,
  HiddenPalaceOfZhouFormula,
  MidsummerCourtyard,
  PeakOfVindagnyr,
  RidgeWatch,
  TaishanMansion,
  ValleyOfRemembrance,
  WolfOfTheNorthChallenge,
} from "./domains";
import {
  Albedo,
  Amber,
  Ayaka,
  Barbara,
  Beidou,
  Bennett,
  Character,
  Chongyun,
  Diluc,
  Diona,
  Eula,
  Fischl,
  Ganyu,
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
  Xiao,
  Xingqiu,
  Xinyan,
  Yanfei,
  Zhongli,
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
    PeakOfVindagnyr,
  ],
  characters: [
    Albedo,
    Amber,
    Barbara,
    Bennett,
    Diluc,
    Diona,
    Eula,
    Fischl,
    Jean,
    Kaeya,
    Klee,
    Lisa,
    Mona,
    Noelle,
    Razor,
    Sucrose,
    Venti,
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
    EnterTheGoldenHouse,
    BeneathTheDragonQueller,
    RidgeWatch,
  ],
  characters: [Beidou, Chongyun, Ganyu, Keqing, Ningguang, Qiqi, Xiangling, Xiao, Xingqiu, Xinyan, Yanfei, Zhongli],
};

export const Inazuma: Region = {
  type: "Region",
  name: "Inazuma",
  wiki: "https://genshin-impact.fandom.com/wiki/Inazuma",
  domains: [],
  characters: [Ayaka],
};

export const Snezhnaya: Region = {
  type: "Region",
  name: "Snezhnaya",
  wiki: "https://genshin-impact.fandom.com/wiki/Snezhnaya",
  domains: [],
  characters: [Tartaglia],
};

export const Regions = [Mondstadt, Liyue, Inazuma, Snezhnaya];
