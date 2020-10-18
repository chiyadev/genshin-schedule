import {
  Aerosiderite,
  BorealWolf,
  DandelionGladiator,
  Decarabian,
  Guyun,
  MistVeiledElixir,
  WeaponMaterial
} from "./weaponMaterials";

type WeaponPartial = {
  material: WeaponMaterial;
};

export type Weapon = WeaponPartial & {
  type: "Weapon";
  name: string;
  wiki: string;
};

export const Weapons: Weapon[] = [];

function generate(partial: WeaponPartial, names: string[]) {
  for (const name of names) {
    Weapons.push({
      type: "Weapon",
      name,
      wiki: `https://genshin-impact.fandom.com/wiki/${encodeURIComponent(
        name.replace(" ", "_")
      )}`,
      ...partial
    });
  }
}

generate({ material: Decarabian }, [
  "Aquila Favonia",
  "Cool Steel",
  "Favonius Codex",
  "Favonius Sword",
  "Ferrous Shadow",
  "Magic Guide",
  "Raven Bow",
  "The Bell",
  "The Stringless",
  "The Viridescent Hunt"
]);

generate({ material: BorealWolf }, [
  "Alley Hunter",
  "Bloodtainted Greatsword",
  "Harbinger of Dawn",
  "Sacrificial Bow",
  "Sacrificial Greatsword",
  "Sharpshooter's Oath",
  "Skyward Atlas",
  "Skyward Blade",
  "Skyward Harp",
  "Skyward Pride",
  "Sword of Descension",
  "The Black Sword",
  "The Flute",
  "The Widsith",
  "Thrilling Tales of Dragon Slayers",
  "Wine and Song"
]);

generate({ material: DandelionGladiator }, [
  "Beginner's Protector",
  "Favonius Greatsword",
  "Favonius Warbow",
  "Lost Prayer to the Sacred Winds",
  "Otherworldly Story",
  "Recurve Bow",
  "Sacrificial Fragments",
  "Sacrificial Sword",
  "Skyward Spine",
  "Traveler's Handy Sword",
  "White Iron Greatsword",
  "Wolf's Gravestone"
]);

generate({ material: Guyun }, [
  "Blackcliff Warbow",
  "Crescent Pike",
  "Dark Iron Sword",
  "Emerald Orb",
  "Lion's Roar",
  "Primordial Jade Winged-Spear",
  "Rust",
  "Slingshot",
  "Solar Pearl",
  "White Tassel",
  "Whiteblind"
]);

generate({ material: MistVeiledElixir }, [
  "Debate Club",
  "Dragon's Bane",
  "Eye of Perception",
  "Fillet Blade",
  "Halberd",
  "Messenger",
  "Prototype Crescent",
  "Prototype Malice",
  "Prototype Rancour",
  "Rainslasher",
  "Twin Nephrite"
]);

generate({ material: Aerosiderite }, [
  "Black Tassel",
  "Compound Bow",
  "Iron Sting",
  "Mappa Mare",
  "Prototype Aminus",
  "Prototype Grudge",
  "Royal Grimoire",
  "Serpent Spine",
  "Skyrider Greatsword",
  "Skyrider Sword"
]);
