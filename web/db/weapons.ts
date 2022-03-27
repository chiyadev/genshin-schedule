import {
  Aerosiderite,
  BorealWolf,
  BranchOfDistantSea,
  DandelionGladiator,
  Decarabian,
  Guyun,
  NarukamiMask,
  MistVeiledElixir,
  Narukami,
  WeaponMaterial,
} from "./weaponMaterials";
import {
  BoneShard,
  ChaosGear,
  ChaosPart,
  CommonMaterial,
  ConcealedClaw,
  FatuiInsignia,
  FatuiKnife,
  Handguard,
  HilichurlArrowhead,
  HilichurlHorn,
  HilichurlMask,
  LeyLine,
  MirrorPrism,
  MistGrass,
  SamachurlScroll,
  Slime,
  SpectralCore,
  Statuette,
  TreasureHoarderInsignia,
  WhopperflowerNectar,
} from "./commonMaterials";
import { registerMessage } from "../utils";

export const WeaponWiki = "https://genshin-impact.fandom.com/wiki/Weapons";

export type Weapon = {
  type: "Weapon";
  name: string;
  wiki: string;
  material: WeaponMaterial;
  commonMaterials: CommonMaterial[];
  leaked?: boolean;
};

registerMessage({ defaultMessage: "Weapon" });

export const Weapons: Weapon[] = [];

function add(name: string, material: WeaponMaterial, commonMaterials: CommonMaterial[], leaked = false) {
  Weapons.push({
    type: "Weapon",
    name,
    wiki: `https://genshin-impact.fandom.com/wiki/${encodeURIComponent(name.replace(" ", "_"))}`,
    material,
    commonMaterials,
    leaked,
  });
}

// Decarabian
add(registerMessage({ defaultMessage: "Aquila Favonia" }), Decarabian, [HilichurlHorn, HilichurlArrowhead]);
add(registerMessage({ defaultMessage: "Cool Steel" }), Decarabian, [HilichurlHorn, HilichurlArrowhead]);
add(registerMessage({ defaultMessage: "Favonius Codex" }), Decarabian, [HilichurlHorn, SamachurlScroll]);
add(registerMessage({ defaultMessage: "Favonius Sword" }), Decarabian, [HilichurlHorn, HilichurlArrowhead]);
add(registerMessage({ defaultMessage: "Ferrous Shadow" }), Decarabian, [HilichurlHorn, WhopperflowerNectar]);
add(registerMessage({ defaultMessage: "Magic Guide" }), Decarabian, [HilichurlHorn, Slime]);
add(registerMessage({ defaultMessage: "Mitternachts Waltz" }), Decarabian, [HilichurlHorn, TreasureHoarderInsignia]);
add(registerMessage({ defaultMessage: "Raven Bow" }), Decarabian, [HilichurlHorn, HilichurlArrowhead]);
add(registerMessage({ defaultMessage: "Royal Grimoire" }), Decarabian, [HilichurlHorn, FatuiInsignia]);
add(registerMessage({ defaultMessage: "Royal Longsword" }), Decarabian, [HilichurlHorn, HilichurlArrowhead]);
add(registerMessage({ defaultMessage: "Song of Broken Pines" }), Decarabian, [HilichurlHorn, HilichurlMask]);
add(registerMessage({ defaultMessage: "Snow-Tombed Starsilver" }), Decarabian, [HilichurlHorn, Slime]);
add(registerMessage({ defaultMessage: "The Alley Flash" }), Decarabian, [HilichurlHorn, SamachurlScroll]);
add(registerMessage({ defaultMessage: "The Bell" }), Decarabian, [HilichurlHorn, WhopperflowerNectar]);
add(registerMessage({ defaultMessage: "The Stringless" }), Decarabian, [HilichurlHorn, HilichurlArrowhead]);
add(registerMessage({ defaultMessage: "The Viridescent Hunt" }), Decarabian, [HilichurlHorn, HilichurlArrowhead]);
add(registerMessage({ defaultMessage: "Cinnabar Spindle" }), Decarabian, [ChaosPart, HilichurlMask]);

// Boreal Wolf
add(registerMessage({ defaultMessage: "Bloodtainted Greatsword" }), BorealWolf, [LeyLine, HilichurlArrowhead]);
add(registerMessage({ defaultMessage: "Deathmatch" }), BorealWolf, [LeyLine, WhopperflowerNectar]);
add(registerMessage({ defaultMessage: "Dodoco Tales" }), BorealWolf, [LeyLine, HilichurlMask]);
add(registerMessage({ defaultMessage: "Dragonspine Spear" }), BorealWolf, [MistGrass, FatuiInsignia]);
add(registerMessage({ defaultMessage: "Elegy for the End" }), BorealWolf, [HilichurlHorn, FatuiInsignia]);
add(registerMessage({ defaultMessage: "Harbinger of Dawn" }), BorealWolf, [LeyLine, Slime]);
add(registerMessage({ defaultMessage: "Sacrificial Bow" }), BorealWolf, [LeyLine, Slime]);
add(registerMessage({ defaultMessage: "Sacrificial Greatsword" }), BorealWolf, [LeyLine, HilichurlArrowhead]);
add(registerMessage({ defaultMessage: "Sharpshooter's Oath" }), BorealWolf, [LeyLine, Slime]);
add(registerMessage({ defaultMessage: "Skyward Atlas" }), BorealWolf, [LeyLine, HilichurlArrowhead]);
add(registerMessage({ defaultMessage: "Skyward Blade" }), BorealWolf, [LeyLine, Slime]);
add(registerMessage({ defaultMessage: "Skyward Harp" }), BorealWolf, [LeyLine, HilichurlArrowhead]);
add(registerMessage({ defaultMessage: "Skyward Pride" }), BorealWolf, [LeyLine, Slime]);
add(registerMessage({ defaultMessage: "Sword of Descension" }), BorealWolf, [LeyLine, TreasureHoarderInsignia]);
add(registerMessage({ defaultMessage: "The Black Sword" }), BorealWolf, [LeyLine, Slime]);
add(registerMessage({ defaultMessage: "The Flute" }), BorealWolf, [LeyLine, Slime]);
add(registerMessage({ defaultMessage: "The Widsith" }), BorealWolf, [LeyLine, HilichurlMask]);
add(registerMessage({ defaultMessage: "Thrilling Tales of Dragon Slayers" }), BorealWolf, [LeyLine, SamachurlScroll]);
add(registerMessage({ defaultMessage: "Wine and Song" }), BorealWolf, [LeyLine, SamachurlScroll]);

// Dandelion Gladiator
add(registerMessage({ defaultMessage: "Alley Hunter" }), DandelionGladiator, [ChaosPart, Slime]);
add(registerMessage({ defaultMessage: "Amos' Bow" }), DandelionGladiator, [ChaosPart, Slime]);
add(registerMessage({ defaultMessage: "Beginner's Protector" }), DandelionGladiator, [ChaosPart, SamachurlScroll]);
add(registerMessage({ defaultMessage: "Favonius Greatsword" }), DandelionGladiator, [ChaosPart, FatuiInsignia]);
add(registerMessage({ defaultMessage: "Favonius Lance" }), DandelionGladiator, [ChaosPart, Slime]);
add(registerMessage({ defaultMessage: "Favonius Warbow" }), DandelionGladiator, [ChaosPart, WhopperflowerNectar]);
add(registerMessage({ defaultMessage: "Festering Desire" }), DandelionGladiator, [HilichurlHorn, FatuiInsignia]); // yes, for some reason it's not chaos
add(registerMessage({ defaultMessage: "Freedom-Sworn" }), DandelionGladiator, [ChaosPart, SamachurlScroll]);
add(registerMessage({ defaultMessage: "Frostbearer" }), DandelionGladiator, [ChaosPart, WhopperflowerNectar]);
add(registerMessage({ defaultMessage: "Lost Prayer to the Sacred Winds" }), DandelionGladiator, [ChaosPart, Slime]);
add(registerMessage({ defaultMessage: "Otherworldly Story" }), DandelionGladiator, [ChaosPart, HilichurlMask]);
add(registerMessage({ defaultMessage: "Recurve Bow" }), DandelionGladiator, [ChaosPart, SamachurlScroll]);
add(registerMessage({ defaultMessage: "Royal Bow" }), DandelionGladiator, [ChaosPart, Slime]);
add(registerMessage({ defaultMessage: "Royal Greatsword" }), DandelionGladiator, [ChaosPart, Slime]);
add(registerMessage({ defaultMessage: "Sacrificial Fragments" }), DandelionGladiator, [
  ChaosPart,
  TreasureHoarderInsignia,
]);
add(registerMessage({ defaultMessage: "Sacrificial Sword" }), DandelionGladiator, [ChaosPart, SamachurlScroll]);
add(registerMessage({ defaultMessage: "Skyward Spine" }), DandelionGladiator, [ChaosPart, SamachurlScroll]);
add(registerMessage({ defaultMessage: "Traveler's Handy Sword" }), DandelionGladiator, [ChaosPart, SamachurlScroll]);
add(registerMessage({ defaultMessage: "White Iron Greatsword" }), DandelionGladiator, [ChaosPart, Slime]);
add(registerMessage({ defaultMessage: "Windblume Ode" }), DandelionGladiator, [LeyLine, WhopperflowerNectar]);
add(registerMessage({ defaultMessage: "Wolf's Gravestone" }), DandelionGladiator, [ChaosPart, SamachurlScroll]);

// Guyun
add(registerMessage({ defaultMessage: "Blackcliff Agate" }), Guyun, [FatuiKnife, SamachurlScroll]);
add(registerMessage({ defaultMessage: "Blackcliff Longsword" }), Guyun, [FatuiKnife, HilichurlArrowhead]);
add(registerMessage({ defaultMessage: "Blackcliff Warbow" }), Guyun, [FatuiKnife, WhopperflowerNectar]);
add(registerMessage({ defaultMessage: "Crescent Pike" }), Guyun, [FatuiKnife, TreasureHoarderInsignia]);
add(registerMessage({ defaultMessage: "Dark Iron Sword" }), Guyun, [FatuiKnife, HilichurlMask]);
add(registerMessage({ defaultMessage: "Emerald Orb" }), Guyun, [FatuiKnife, TreasureHoarderInsignia]);
add(registerMessage({ defaultMessage: "Lithic Blade" }), Guyun, [FatuiKnife, HilichurlArrowhead]);
add(registerMessage({ defaultMessage: "Lion's Roar" }), Guyun, [FatuiKnife, TreasureHoarderInsignia]);
add(registerMessage({ defaultMessage: "Primordial Jade Winged-Spear" }), Guyun, [FatuiKnife, FatuiInsignia]);
add(registerMessage({ defaultMessage: "Rust" }), Guyun, [FatuiKnife, HilichurlMask]);
add(registerMessage({ defaultMessage: "Slingshot" }), Guyun, [FatuiKnife, HilichurlMask]);
add(registerMessage({ defaultMessage: "Solar Pearl" }), Guyun, [FatuiKnife, WhopperflowerNectar]);
add(registerMessage({ defaultMessage: "Summit Shaper" }), Guyun, [FatuiKnife, HilichurlMask]);
add(registerMessage({ defaultMessage: "White Tassel" }), Guyun, [FatuiKnife, FatuiInsignia]);
add(registerMessage({ defaultMessage: "Whiteblind" }), Guyun, [FatuiKnife, TreasureHoarderInsignia]);

// Mist Veiled Elixir
add(registerMessage({ defaultMessage: "Blackcliff Pole" }), MistVeiledElixir, [MistGrass, FatuiInsignia]);
add(registerMessage({ defaultMessage: "Blackcliff Slasher" }), MistVeiledElixir, [MistGrass, FatuiInsignia]);
add(registerMessage({ defaultMessage: "Calamity Queller" }), MistVeiledElixir, [MistGrass, WhopperflowerNectar]);
add(registerMessage({ defaultMessage: "Debate Club" }), MistVeiledElixir, [MistGrass, HilichurlMask]);
add(registerMessage({ defaultMessage: "Dragon's Bane" }), MistVeiledElixir, [MistGrass, SamachurlScroll]);
add(registerMessage({ defaultMessage: "Eye of Perception" }), MistVeiledElixir, [MistGrass, HilichurlMask]);
add(registerMessage({ defaultMessage: "Fillet Blade" }), MistVeiledElixir, [MistGrass, TreasureHoarderInsignia]);
add(registerMessage({ defaultMessage: "Halberd" }), MistVeiledElixir, [MistGrass, WhopperflowerNectar]);
add(registerMessage({ defaultMessage: "Messenger" }), MistVeiledElixir, [MistGrass, TreasureHoarderInsignia]);
add(registerMessage({ defaultMessage: "Primordial Jade Cutter" }), MistVeiledElixir, [
  MistGrass,
  TreasureHoarderInsignia,
]);
add(registerMessage({ defaultMessage: "Prototype Crescent" }), MistVeiledElixir, [MistGrass, TreasureHoarderInsignia]);
add(registerMessage({ defaultMessage: "Prototype Amber" }), MistVeiledElixir, [MistGrass, HilichurlArrowhead]);
add(registerMessage({ defaultMessage: "Prototype Rancour" }), MistVeiledElixir, [MistGrass, FatuiInsignia]);
add(registerMessage({ defaultMessage: "Rainslasher" }), MistVeiledElixir, [MistGrass, SamachurlScroll]);
add(registerMessage({ defaultMessage: "Royal Spear" }), MistVeiledElixir, [MistGrass, FatuiInsignia]);
add(registerMessage({ defaultMessage: "The Unforged" }), MistVeiledElixir, [MistGrass, TreasureHoarderInsignia]);
add(registerMessage({ defaultMessage: "Twin Nephrite" }), MistVeiledElixir, [MistGrass, FatuiInsignia]);

// Aerosiderite
add(registerMessage({ defaultMessage: "Black Tassel" }), Aerosiderite, [BoneShard, HilichurlArrowhead]);
add(registerMessage({ defaultMessage: "Compound Bow" }), Aerosiderite, [BoneShard, FatuiInsignia]);
add(registerMessage({ defaultMessage: "Iron Sting" }), Aerosiderite, [BoneShard, WhopperflowerNectar]);
add(registerMessage({ defaultMessage: "Lithic Spear" }), Aerosiderite, [BoneShard, HilichurlArrowhead]);
add(registerMessage({ defaultMessage: "Luxurious Sea-Lord" }), Aerosiderite, [BoneShard, Slime]);
add(registerMessage({ defaultMessage: "Mappa Mare" }), Aerosiderite, [BoneShard, Slime]);
add(registerMessage({ defaultMessage: "Memory of Dust" }), Aerosiderite, [BoneShard, HilichurlMask]);
add(registerMessage({ defaultMessage: "Prototype Archaic" }), Aerosiderite, [BoneShard, HilichurlMask]);
add(registerMessage({ defaultMessage: "Prototype Starglitter" }), Aerosiderite, [BoneShard, HilichurlMask]);
add(registerMessage({ defaultMessage: "Serpent Spine" }), Aerosiderite, [BoneShard, WhopperflowerNectar]);
add(registerMessage({ defaultMessage: "Skyrider Greatsword" }), Aerosiderite, [BoneShard, TreasureHoarderInsignia]);
add(registerMessage({ defaultMessage: "Skyrider Sword" }), Aerosiderite, [BoneShard, FatuiInsignia]);
add(registerMessage({ defaultMessage: "Staff of Homa" }), Aerosiderite, [LeyLine, Slime]);
add(registerMessage({ defaultMessage: "Vortex Vanquisher" }), Aerosiderite, [BoneShard, TreasureHoarderInsignia]);

// Branch of Distant Sea
add(registerMessage({ defaultMessage: "Akuoumaru" }), BranchOfDistantSea, [ConcealedClaw, Handguard]);
add(registerMessage({ defaultMessage: "Amenoma Kageuchi" }), BranchOfDistantSea, [ChaosGear, Handguard]);
add(registerMessage({ defaultMessage: "Everlasting Moonglow" }), BranchOfDistantSea, [MirrorPrism, SpectralCore]);
add(registerMessage({ defaultMessage: "Hakushin Ring" }), BranchOfDistantSea, [MirrorPrism, SamachurlScroll]);
add(registerMessage({ defaultMessage: "Mistsplitter Reforged" }), BranchOfDistantSea, [ChaosGear, Handguard]);
add(registerMessage({ defaultMessage: "Oathsworn Eye" }), BranchOfDistantSea, [ConcealedClaw, SpectralCore]);

// Narukami
add(registerMessage({ defaultMessage: "Hamayumi" }), Narukami, [MirrorPrism, HilichurlArrowhead]);
add(registerMessage({ defaultMessage: "Katsuragikiri Nagamasa" }), Narukami, [ChaosGear, Handguard]);
add(registerMessage({ defaultMessage: "Mouun's Moon" }), Narukami, [MirrorPrism, SpectralCore]);
add(registerMessage({ defaultMessage: "Predator" }), Narukami, [MirrorPrism, HilichurlArrowhead]);
add(registerMessage({ defaultMessage: "Redhorn Stonethresher" }), Narukami, [ConcealedClaw, Handguard]);
add(registerMessage({ defaultMessage: "Haran Geppaku Futsu" }), Narukami, [Statuette, Handguard]);

// Mask
add(registerMessage({ defaultMessage: "Engulfing Lightning" }), NarukamiMask, [ChaosGear, Handguard]);
add(registerMessage({ defaultMessage: "Kitain Cross Spear" }), NarukamiMask, [ChaosGear, TreasureHoarderInsignia]);
add(registerMessage({ defaultMessage: "Polar Star" }), NarukamiMask, [ConcealedClaw, SpectralCore]);
add(registerMessage({ defaultMessage: "The Catch" }), NarukamiMask, [ChaosGear, SpectralCore]);
add(registerMessage({ defaultMessage: "Wavebreaker's Fin" }), NarukamiMask, [ConcealedClaw, Handguard]);
add(registerMessage({ defaultMessage: "Kagura's Verity" }), NarukamiMask, [ConcealedClaw, SpectralCore]);
