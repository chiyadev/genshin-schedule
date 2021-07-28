import { registerMessage } from "../utils";

export const WeaponMaterialWiki = "https://genshin-impact.fandom.com/wiki/Weapon_Ascension_Materials";

export type WeaponMaterial = {
  type: "Weapon Ascension Material";
  name: string;
  item: string;
  wiki: string;
  colorHint?: string;
};

registerMessage({ defaultMessage: "Weapon Ascension Material" });

export const Decarabian: WeaponMaterial = {
  type: "Weapon Ascension Material",
  name: registerMessage({ defaultMessage: "Decarabian" }),
  item: registerMessage({ defaultMessage: "Tile of Decarabian's Tower" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Tile_of_Decarabian%27s_Tower",
  colorHint: "red",
};

export const Guyun: WeaponMaterial = {
  type: "Weapon Ascension Material",
  name: registerMessage({ defaultMessage: "Guyun" }),
  item: registerMessage({ defaultMessage: "Luminous Sands from Guyun" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Luminous_Sands_from_Guyun",
  colorHint: "pink",
};

export const BorealWolf: WeaponMaterial = {
  type: "Weapon Ascension Material",
  name: registerMessage({ defaultMessage: "Boreal Wolf" }),
  item: registerMessage({ defaultMessage: "Boreal Wolf's Milk Tooth" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Boreal_Wolf%27s_Milk_Tooth",
  colorHint: "teal",
};

export const MistVeiledElixir: WeaponMaterial = {
  type: "Weapon Ascension Material",
  name: registerMessage({ defaultMessage: "Mist Veiled Elixir" }),
  item: registerMessage({ defaultMessage: "Mist Veiled Lead Elixir" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Mist_Veiled_Lead_Elixir",
  colorHint: "purple",
};

export const DandelionGladiator: WeaponMaterial = {
  type: "Weapon Ascension Material",
  name: registerMessage({ defaultMessage: "Dandelion Gladiator" }),
  item: registerMessage({ defaultMessage: "Fetters of the Dandelion Gladiator" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Fetters_of_the_Dandelion_Gladiator",
  colorHint: "yellow",
};

export const Aerosiderite: WeaponMaterial = {
  type: "Weapon Ascension Material",
  name: registerMessage({ defaultMessage: "Aerosiderite" }),
  item: registerMessage({ defaultMessage: "Grain of Aerosiderite" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Grain_of_Aerosiderite",
  colorHint: "green",
};

export const BranchOfDistantSea: WeaponMaterial = {
  type: "Weapon Ascension Material",
  name: registerMessage({ defaultMessage: "Branch of Distant Sea" }),
  item: registerMessage({ defaultMessage: "Coral Branch of a Distant Sea" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Coral_Branch_of_a_Distant_Sea",
  colorHint: "cyan",
};

export const Narukami: WeaponMaterial = {
  type: "Weapon Ascension Material",
  name: registerMessage({ defaultMessage: "Narukami" }),
  item: registerMessage({ defaultMessage: "Narukami's Wisdom" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Narukami%27s_Wisdom",
  colorHint: "blue",
};

export const NarukamiMask: WeaponMaterial = {
  type: "Weapon Ascension Material",
  name: registerMessage({ defaultMessage: "Mask" }),
  item: registerMessage({ defaultMessage: "Mask of the Wicked Lieutenant" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Mask_of_the_Wicked_Lieutenant",
  colorHint: "orange",
};

export const WeaponMaterials = [
  Decarabian,
  Guyun,
  BorealWolf,
  MistVeiledElixir,
  DandelionGladiator,
  Aerosiderite,
  BranchOfDistantSea,
  Narukami,
  NarukamiMask,
];
