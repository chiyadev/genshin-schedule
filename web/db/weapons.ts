import {
  Aerosiderite,
  BorealWolf,
  DandelionGladiator,
  Decarabian,
  Guyun,
  MistVeiledElixir,
  WeaponMaterial,
} from "./weaponMaterials";
import {
  BoneShard,
  ChaosPart,
  CommonMaterial,
  FatuiInsignia,
  FatuiKnife,
  HilichurlArrowhead,
  HilichurlHorn,
  HilichurlMask,
  LeyLine,
  MistGrass,
  SamachurlScroll,
  Slime,
  TreasureHoarderInsignia,
  WhopperflowerNectar,
} from "./commonMaterials";

export const WeaponWiki = "https://genshin-impact.fandom.com/wiki/Weapons";

export type Weapon = {
  type: "Weapon";
  name: string;
  wiki: string;
  material: WeaponMaterial;
  commonMaterials: CommonMaterial[];
};

export const Weapons: Weapon[] = [];

function add(name: string, material: WeaponMaterial, commonMaterials: CommonMaterial[]) {
  Weapons.push({
    type: "Weapon",
    name,
    wiki: `https://genshin-impact.fandom.com/wiki/${encodeURIComponent(name.replace(" ", "_"))}`,
    material,
    commonMaterials,
  });
}

add("Aquila Favonia", Decarabian, [HilichurlHorn, HilichurlArrowhead]);
add("Cool Steel", Decarabian, [HilichurlHorn, HilichurlArrowhead]);
add("Favonius Codex", Decarabian, [HilichurlHorn, SamachurlScroll]);
add("Favonius Sword", Decarabian, [HilichurlHorn, HilichurlArrowhead]);
add("Ferrous Shadow", Decarabian, [HilichurlHorn, WhopperflowerNectar]);
add("Magic Guide", Decarabian, [HilichurlHorn, Slime]);
add("Raven Bow", Decarabian, [HilichurlHorn, HilichurlArrowhead]);
add("Royal Grimoire", Decarabian, [HilichurlHorn, FatuiInsignia]);
add("Snow-Tombed Starsilver", Decarabian, [HilichurlHorn, Slime]);
add("The Bell", Decarabian, [HilichurlHorn, WhopperflowerNectar]);
add("The Stringless", Decarabian, [HilichurlHorn, HilichurlArrowhead]);
add("The Viridescent Hunt", Decarabian, [HilichurlHorn, HilichurlArrowhead]);

add("Alley Hunter", BorealWolf, [LeyLine, TreasureHoarderInsignia]);
add("Bloodtainted Greatsword", BorealWolf, [LeyLine, HilichurlArrowhead]);
add("Deathmatch", BorealWolf, [LeyLine, WhopperflowerNectar]);
add("Dragonspine Spear", BorealWolf, [MistGrass, FatuiInsignia]);
add("Harbinger of Dawn", BorealWolf, [LeyLine, Slime]);
add("Sacrificial Bow", BorealWolf, [LeyLine, Slime]);
add("Sacrificial Greatsword", BorealWolf, [LeyLine, HilichurlArrowhead]);
add("Sharpshooter's Oath", BorealWolf, [LeyLine, Slime]);
add("Skyward Atlas", BorealWolf, [LeyLine, HilichurlArrowhead]);
add("Skyward Blade", BorealWolf, [LeyLine, Slime]);
add("Skyward Harp", BorealWolf, [LeyLine, HilichurlArrowhead]);
add("Skyward Pride", BorealWolf, [LeyLine, Slime]);
add("Sword of Descension", BorealWolf, [LeyLine, TreasureHoarderInsignia]);
add("The Black Sword", BorealWolf, [LeyLine, Slime]);
add("The Flute", BorealWolf, [LeyLine, Slime]);
add("The Widsith", BorealWolf, [LeyLine, HilichurlMask]);
add("Thrilling Tales of Dragon Slayers", BorealWolf, [LeyLine, SamachurlScroll]);
add("Wine and Song", BorealWolf, [LeyLine, SamachurlScroll]);

add("Amos' Bow", DandelionGladiator, [ChaosPart, Slime]);
add("Beginner's Protector", DandelionGladiator, [ChaosPart, SamachurlScroll]);
add("Favonius Greatsword", DandelionGladiator, [ChaosPart, FatuiInsignia]);
add("Favonius Lance", DandelionGladiator, [ChaosPart, Slime]);
add("Favonius Warbow", DandelionGladiator, [ChaosPart, WhopperflowerNectar]);
add("Festering Desire", DandelionGladiator, [HilichurlHorn, FatuiInsignia]); // yes, for some reason it's not chaos
add("Frostbearer", DandelionGladiator, [ChaosPart, WhopperflowerNectar]);
add("Lost Prayer to the Sacred Winds", DandelionGladiator, [ChaosPart, Slime]);
add("Otherworldly Story", DandelionGladiator, [ChaosPart, HilichurlMask]);
add("Recurve Bow", DandelionGladiator, [ChaosPart, SamachurlScroll]);
add("Sacrificial Fragments", DandelionGladiator, [ChaosPart, TreasureHoarderInsignia]);
add("Sacrificial Sword", DandelionGladiator, [ChaosPart, SamachurlScroll]);
add("Skyward Spine", DandelionGladiator, [ChaosPart, SamachurlScroll]);
add("Traveler's Handy Sword", DandelionGladiator, [ChaosPart, SamachurlScroll]);
add("White Iron Greatsword", DandelionGladiator, [ChaosPart, Slime]);
add("Wolf's Gravestone", DandelionGladiator, [ChaosPart, SamachurlScroll]);

add("Blackcliff Agate", Guyun, [FatuiKnife, SamachurlScroll]);
add("Blackcliff Longsword", Guyun, [FatuiKnife, HilichurlArrowhead]);
add("Blackcliff Warbow", Guyun, [FatuiKnife, TreasureHoarderInsignia]);
add("Crescent Pike", Guyun, [FatuiKnife, TreasureHoarderInsignia]);
add("Dark Iron Sword", Guyun, [FatuiKnife, HilichurlMask]);
add("Emerald Orb", Guyun, [FatuiKnife, TreasureHoarderInsignia]);
add("Lion's Roar", Guyun, [FatuiKnife, TreasureHoarderInsignia]);
add("Primordial Jade Winged-Spear", Guyun, [FatuiKnife, FatuiInsignia]);
add("Rust", Guyun, [FatuiKnife, HilichurlMask]);
add("Slingshot", Guyun, [FatuiKnife, HilichurlMask]);
add("Solar Pearl", Guyun, [FatuiKnife, WhopperflowerNectar]);
add("Summit Shaper", Guyun, [FatuiKnife, HilichurlMask]);
add("White Tassel", Guyun, [FatuiKnife, FatuiInsignia]);
add("Whiteblind", Guyun, [FatuiKnife, TreasureHoarderInsignia]);

add("Blackcliff Pole", MistVeiledElixir, [MistGrass, FatuiInsignia]);
add("Blackcliff Slasher", MistVeiledElixir, [MistGrass, FatuiInsignia]);
add("Debate Club", MistVeiledElixir, [MistGrass, HilichurlMask]);
add("Dragon's Bane", MistVeiledElixir, [MistGrass, SamachurlScroll]);
add("Eye of Perception", MistVeiledElixir, [MistGrass, HilichurlMask]);
add("Fillet Blade", MistVeiledElixir, [MistGrass, TreasureHoarderInsignia]);
add("Halberd", MistVeiledElixir, [MistGrass, WhopperflowerNectar]);
add("Messenger", MistVeiledElixir, [MistGrass, TreasureHoarderInsignia]);
add("Primordial Jade Cutter", MistVeiledElixir, [MistGrass, TreasureHoarderInsignia]);
add("Prototype Crescent", MistVeiledElixir, [MistGrass, TreasureHoarderInsignia]);
add("Prototype Amber", MistVeiledElixir, [MistGrass, HilichurlArrowhead]);
add("Prototype Rancour", MistVeiledElixir, [MistGrass, FatuiInsignia]);
add("Rainslasher", MistVeiledElixir, [MistGrass, SamachurlScroll]);
add("Twin Nephrite", MistVeiledElixir, [MistGrass, FatuiInsignia]);

add("Black Tassel", Aerosiderite, [BoneShard, HilichurlArrowhead]);
add("Compound Bow", Aerosiderite, [BoneShard, FatuiInsignia]);
add("Iron Sting", Aerosiderite, [BoneShard, WhopperflowerNectar]);
add("Mappa Mare", Aerosiderite, [BoneShard, Slime]);
add("Prototype Archaic", Aerosiderite, [BoneShard, HilichurlMask]);
add("Prototype Starglitter", Aerosiderite, [BoneShard, HilichurlMask]);
add("Serpent Spine", Aerosiderite, [BoneShard, WhopperflowerNectar]);
add("Skyrider Greatsword", Aerosiderite, [BoneShard, TreasureHoarderInsignia]);
add("Skyrider Sword", Aerosiderite, [BoneShard, FatuiInsignia]);
