import { registerMessage } from "../utils";

export const TalentMaterialWiki = "https://genshin-impact.fandom.com/wiki/Talent_Level-Up_Materials";

export type TalentMaterial = {
  type: "Talent Level-Up Material";
  name: string;
  item: string;
  wiki: string;
  colorHint?: string;
};

registerMessage({ defaultMessage: "Talent Level-Up Material" });

export const Freedom: TalentMaterial = {
  type: "Talent Level-Up Material",
  name: registerMessage({ defaultMessage: "Freedom" }),
  item: registerMessage({ defaultMessage: "Teachings of Freedom" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Teachings_of_%22Freedom%22",
  colorHint: "green",
};

export const Prosperity: TalentMaterial = {
  type: "Talent Level-Up Material",
  name: registerMessage({ defaultMessage: "Prosperity" }),
  item: registerMessage({ defaultMessage: "Teachings of Prosperity" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Teachings_of_%22Prosperity%22",
  colorHint: "teal",
};

export const Resistance: TalentMaterial = {
  type: "Talent Level-Up Material",
  name: registerMessage({ defaultMessage: "Resistance" }),
  item: registerMessage({ defaultMessage: "Teachings of Resistance" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Teachings_of_%22Resistance%22",
  colorHint: "red",
};

export const Diligence: TalentMaterial = {
  type: "Talent Level-Up Material",
  name: registerMessage({ defaultMessage: "Diligence" }),
  item: registerMessage({ defaultMessage: "Teachings of Diligence" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Teachings_of_%22Diligence%22",
  colorHint: "orange",
};

export const Ballad: TalentMaterial = {
  type: "Talent Level-Up Material",
  name: registerMessage({ defaultMessage: "Ballad" }),
  item: registerMessage({ defaultMessage: "Teachings of Ballad" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Teachings_of_%22Ballad%22",
  colorHint: "blue",
};

export const Gold: TalentMaterial = {
  type: "Talent Level-Up Material",
  name: registerMessage({ defaultMessage: "Gold" }),
  item: registerMessage({ defaultMessage: "Teachings of Gold" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Teachings_of_%22Gold%22",
  colorHint: "yellow",
};

export const Transience: TalentMaterial = {
  type: "Talent Level-Up Material",
  name: registerMessage({ defaultMessage: "Transience" }),
  item: registerMessage({ defaultMessage: "Teachings of Transience" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Talent_Level-Up_Materials",
  colorHint: "cyan",
};

export const Elegance: TalentMaterial = {
  type: "Talent Level-Up Material",
  name: registerMessage({ defaultMessage: "Elegance" }),
  item: registerMessage({ defaultMessage: "Teachings of Elegance" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Teachings_of_Elegance",
  colorHint: "purple",
};

export const Light: TalentMaterial = {
  type: "Talent Level-Up Material",
  name: registerMessage({ defaultMessage: "Light" }),
  item: registerMessage({ defaultMessage: "Teachings of Light" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Teachings_of_Light",
  colorHint: "pink",
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

export const MoltenMoment: TalentMaterial = {
  type: "Talent Level-Up Material",
  name: registerMessage({ defaultMessage: "Molten Moment" }),
  item: registerMessage({ defaultMessage: "Molten Moment" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Molten_Moment",
};

export const HellfireButterfly: TalentMaterial = {
  type: "Talent Level-Up Material",
  name: registerMessage({ defaultMessage: "Hellfire Butterfly" }),
  item: registerMessage({ defaultMessage: "Hellfire Butterfly" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Hellfire_Butterfly",
};

export const AshenHeart: TalentMaterial = {
  type: "Talent Level-Up Material",
  name: registerMessage({ defaultMessage: "Ashen Heart" }),
  item: registerMessage({ defaultMessage: "Ashen Heart" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Ashen_Heart",
};

export const MudraOfTheMaleficGeneral: TalentMaterial = {
  type: "Talent Level-Up Material",
  name: registerMessage({ defaultMessage: "Mudra of the Malefic General" }),
  item: registerMessage({ defaultMessage: "Mudra of the Malefic General" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Mudra_of_the_Malefic_General",
};

export const TheMeaningOfAeons: TalentMaterial = {
  type: "Talent Level-Up Material",
  name: registerMessage({ defaultMessage: "The Meaning of Aeons" }),
  item: registerMessage({ defaultMessage: "The Meaning of Aeons" }),
  wiki: "https://genshin-impact.fandom.com/wiki/The_Meaning_of_Aeons",
};

export const TearsOfTheCalamitousGod: TalentMaterial = {
  type: "Talent Level-Up Material",
  name: registerMessage({ defaultMessage: "Tears of the Calamitous God" }),
  item: registerMessage({ defaultMessage: "Tears of the Calamitous God" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Tears_of_the_Calamitous_God",
};


export const TalentMaterials = [
  Freedom,
  Prosperity,
  Resistance,
  Diligence,
  Ballad,
  Gold,
  Transience,
  Elegance,
  Light,
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
  MoltenMoment,
  HellfireButterfly,
  AshenHeart,
  MudraOfTheMaleficGeneral,
  TheMeaningOfAeons,
  TearsOfTheCalamitousGod,
];
