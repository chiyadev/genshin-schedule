import { registerMessage } from "../utils";

export const TalentMaterialWiki = "https://genshin-impact.fandom.com/wiki/Talent_Level-Up_Material";

export type TalentMaterial = {
  type: "Talent Level-Up Material";
  name: string;
  item: string;
  wiki: string;
};

export const Freedom: TalentMaterial = {
  type: "Talent Level-Up Material",
  name: registerMessage({ defaultMessage: "Freedom" }),
  item: registerMessage({ defaultMessage: "Teachings of Freedom" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Teachings_of_%22Freedom%22",
};

export const Prosperity: TalentMaterial = {
  type: "Talent Level-Up Material",
  name: registerMessage({ defaultMessage: "Prosperity" }),
  item: registerMessage({ defaultMessage: "Teachings of Prosperity" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Teachings_of_%22Prosperity%22",
};

export const Resistance: TalentMaterial = {
  type: "Talent Level-Up Material",
  name: registerMessage({ defaultMessage: "Resistance" }),
  item: registerMessage({ defaultMessage: "Teachings of Resistance" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Teachings_of_%22Resistance%22",
};

export const Diligence: TalentMaterial = {
  type: "Talent Level-Up Material",
  name: registerMessage({ defaultMessage: "Diligence" }),
  item: registerMessage({ defaultMessage: "Teachings of Diligence" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Teachings_of_%22Diligence%22",
};

export const Ballad: TalentMaterial = {
  type: "Talent Level-Up Material",
  name: registerMessage({ defaultMessage: "Ballad" }),
  item: registerMessage({ defaultMessage: "Teachings of Ballad" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Teachings_of_%22Ballad%22",
};

export const Gold: TalentMaterial = {
  type: "Talent Level-Up Material",
  name: registerMessage({ defaultMessage: "Gold" }),
  item: registerMessage({ defaultMessage: "Teachings of Gold" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Teachings_of_%22Gold%22",
};

export const DvalinPlume: TalentMaterial = {
  type: "Talent Level-Up Material",
  name: registerMessage({ defaultMessage: "Dvalin's Plume" }),
  item: registerMessage({ defaultMessage: "Dvalin's Plume" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Dvalin%27s_Plume",
};

export const DvalinSigh: TalentMaterial = {
  type: "Talent Level-Up Material",
  name: registerMessage({ defaultMessage: "Dvalin's Sigh" }),
  item: registerMessage({ defaultMessage: "Dvalin's Sigh" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Dvalin%27s_Sigh",
};

export const DvalinClaw: TalentMaterial = {
  type: "Talent Level-Up Material",
  name: registerMessage({ defaultMessage: "Dvalin's Claw" }),
  item: registerMessage({ defaultMessage: "Dvalin's Claw" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Dvalin%27s_Claw",
};

export const TailOfBoreas: TalentMaterial = {
  type: "Talent Level-Up Material",
  name: registerMessage({ defaultMessage: "Tail of Boreas" }),
  item: registerMessage({ defaultMessage: "Tail of Boreas" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Tail_of_Boreas",
};

export const RingOfBoreas: TalentMaterial = {
  type: "Talent Level-Up Material",
  name: registerMessage({ defaultMessage: "Ring of Boreas" }),
  item: registerMessage({ defaultMessage: "Ring of Boreas" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Ring_of_Boreas",
};

export const SpiritLocketOfBoreas: TalentMaterial = {
  type: "Talent Level-Up Material",
  name: registerMessage({ defaultMessage: "Spirit Locket of Boreas" }),
  item: registerMessage({ defaultMessage: "Spirit Locket of Boreas" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Spirit_Locket_of_Boreas",
};

export const TuskOfMonocerosCaeli: TalentMaterial = {
  type: "Talent Level-Up Material",
  name: registerMessage({ defaultMessage: "Tusk of Monoceros Caeli" }),
  item: registerMessage({ defaultMessage: "Tusk of Monoceros Caeli" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Tusk_of_Monoceros_Caeli",
};

export const ShardOfAFoulLegacy: TalentMaterial = {
  type: "Talent Level-Up Material",
  name: registerMessage({ defaultMessage: "Shard of a Foul Legacy" }),
  item: registerMessage({ defaultMessage: "Shard of a Foul Legacy" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Shard_of_a_Foul_Legacy",
};

export const ShadowOfTheWarrior: TalentMaterial = {
  type: "Talent Level-Up Material",
  name: registerMessage({ defaultMessage: "Shadow of the Warrior" }),
  item: registerMessage({ defaultMessage: "Shadow of the Warrior" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Shadow_of_the_Warrior",
};

export const DragonLordsCrown: TalentMaterial = {
  type: "Talent Level-Up Material",
  name: registerMessage({ defaultMessage: "Dragon Lord's Crown" }),
  item: registerMessage({ defaultMessage: "Dragon Lord's Crown" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Dragon_Lord%27s_Crown",
};

export const BloodjadeBranch: TalentMaterial = {
  type: "Talent Level-Up Material",
  name: registerMessage({ defaultMessage: "Bloodjade Branch" }),
  item: registerMessage({ defaultMessage: "Bloodjade Branch" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Bloodjade_Branch",
};

export const GildedScale: TalentMaterial = {
  type: "Talent Level-Up Material",
  name: registerMessage({ defaultMessage: "Gilded Scale" }),
  item: registerMessage({ defaultMessage: "Gilded Scale" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Gilded_Scale",
};

export const TalentMaterials = [
  Freedom,
  Prosperity,
  Resistance,
  Diligence,
  Ballad,
  Gold,
  DvalinPlume,
  DvalinSigh,
  DvalinClaw,
  TailOfBoreas,
  RingOfBoreas,
  SpiritLocketOfBoreas,
  TuskOfMonocerosCaeli,
  ShardOfAFoulLegacy,
  ShadowOfTheWarrior,
  DragonLordsCrown,
  BloodjadeBranch,
  GildedScale,
];
