import { registerMessage } from "../utils";

export const WeaponMaterialWiki = "https://genshin-impact.fandom.com/wiki/Weapon_Ascension_Material";

export type WeaponMaterial = {
  type: "Weapon Ascension Material";
  name: string;
  item: string;
  wiki: string;
};

export const Decarabian: WeaponMaterial = {
  type: "Weapon Ascension Material",
  name: registerMessage({ defaultMessage: "Decarabian" }),
  item: registerMessage({ defaultMessage: "Tile of Decarabian's Tower" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Tile_of_Decarabian%27s_Tower",
};

export const Guyun: WeaponMaterial = {
  type: "Weapon Ascension Material",
  name: registerMessage({ defaultMessage: "Guyun" }),
  item: registerMessage({ defaultMessage: "Luminous Sands from Guyun" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Luminous_Sands_from_Guyun",
};

export const BorealWolf: WeaponMaterial = {
  type: "Weapon Ascension Material",
  name: registerMessage({ defaultMessage: "Boreal Wolf" }),
  item: registerMessage({ defaultMessage: "Boreal Wolf's Milk Tooth" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Boreal_Wolf%27s_Milk_Tooth",
};

export const MistVeiledElixir: WeaponMaterial = {
  type: "Weapon Ascension Material",
  name: registerMessage({ defaultMessage: "Mist Veiled Elixir" }),
  item: registerMessage({ defaultMessage: "Mist Veiled Lead Elixir" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Mist_Veiled_Lead_Elixir",
};

export const DandelionGladiator: WeaponMaterial = {
  type: "Weapon Ascension Material",
  name: registerMessage({ defaultMessage: "Dandelion Gladiator" }),
  item: registerMessage({ defaultMessage: "Fetters of the Dandelion Gladiator" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Fetters_of_the_Dandelion_Gladiator",
};

export const Aerosiderite: WeaponMaterial = {
  type: "Weapon Ascension Material",
  name: registerMessage({ defaultMessage: "Aerosiderite" }),
  item: registerMessage({ defaultMessage: "Grain of Aerosiderite" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Grain_of_Aerosiderite",
};

export const WeaponMaterials = [Decarabian, Guyun, BorealWolf, MistVeiledElixir, DandelionGladiator, Aerosiderite];
