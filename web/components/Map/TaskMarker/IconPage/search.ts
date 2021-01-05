import { MemorySearch } from "../../../../utils/memorySearch";
import { Artifacts } from "../../../../db/artifacts";
import { Task } from "../../../../utils/configs";

export const KnownResourceTimers: Record<string, Task["refreshTime"]> = {};
export const IconSearch = new MemorySearch<string>();
export const IconNames: string[] = [];

function addIcons(type: string, items: { name: string; timer?: Task["refreshTime"] }[]) {
  for (const { name, timer } of items) {
    IconNames.push(name);
    IconSearch.add(name, name);
    type && IconSearch.add(type, name);
    timer && (KnownResourceTimers[name] = typeof timer === "number" ? timer * 3600000 : timer);
  }
}

addIcons("ore", [
  { name: "Iron Chunk", timer: 24 },
  { name: "White Iron Chunk", timer: 48 },
  { name: "Crystal Chunk", timer: 72 },
  { name: "Magical Crystal Chunk", timer: "reset" },
  { name: "Electro Crystal", timer: 48 },
  { name: "Cor Lapis", timer: 48 },
  { name: "Noctilucous Jade", timer: 48 },
  { name: "Starsilver", timer: 48 },
]);

addIcons("character exp material", [
  { name: "Wanderer's Advice" },
  { name: "Adventurer's Experience" },
  { name: "Hero's Wit" },
]);

addIcons("weapon enhancement material", [
  { name: "Enhancement Ore" },
  { name: "Fine Enhancement Ore" },
  { name: "Mystic Enhancement Ore" },
]);

addIcons("character ascension material", [
  { name: "Agnidus Agate Sliver" },
  { name: "Brilliant Diamond Sliver" },
  { name: "Prithiva Topaz Sliver" },
  { name: "Shivada Jade Sliver" },
  { name: "Vajrada Amethyst Sliver" },
  { name: "Varunada Lazurite Sliver" },
  { name: "Vayuda Turquoise Sliver" },
]);

addIcons("common ascension material", [
  { name: "Slime Condensate", timer: "reset" },
  { name: "Damaged Mask", timer: "reset" },
  { name: "Firm Arrowhead", timer: "reset" },
  { name: "Divining Scroll", timer: "reset" },
  { name: "Heavy Horn", timer: "reset" },
  { name: "Dead Ley Line Branch", timer: "reset" },
  { name: "Chaos Device", timer: "reset" },
  { name: "Mist Grass Pollen", timer: "reset" },
  { name: "Hunter's Sacrificial Knife", timer: "reset" },
  { name: "Recruit's Insignia", timer: "reset" },
  { name: "Treasure Hoarder Insignia", timer: "reset" },
  { name: "Fragile Bone Shard", timer: "reset" },
  { name: "Whopperflower Nectar", timer: "reset" },
]);

addIcons("local specialty mondstadt", [
  { name: "Calla Lily", timer: 48 },
  { name: "Cecilia", timer: 48 },
  { name: "Dandelion Seed", timer: 48 },
  { name: "Philanemo Mushroom", timer: 48 },
  { name: "Small Lamp Grass", timer: 48 },
  { name: "Valberry", timer: 48 },
  { name: "Windwheel Aster", timer: 48 },
  { name: "Wolfhook", timer: 48 },
]);

addIcons("local specialty liyue", [
  { name: "Bamboo", timer: 48 },
  { name: "Glaze Lily", timer: 48 },
  { name: "Horsetail", timer: 48 },
  { name: "Jueyun Chili", timer: 48 },
  { name: "Qingxin", timer: 48 },
  { name: "Silk Flower", timer: 48 },
  { name: "Starconch", timer: 48 },
  { name: "Violetgrass", timer: 48 },
]);

addIcons("cooking ingredient", [
  { name: "Almond", timer: 24 },
  { name: "Apple", timer: 24 },
  { name: "Berry", timer: 24 },
  { name: "Bird Egg", timer: 24 },
  { name: "Cabbage", timer: 24 },
  { name: "Carrot", timer: 24 },
  { name: "Crab", timer: 24 },
  { name: "Fish", timer: 24 },
  { name: "Fowl", timer: 24 },
  { name: "Lotus Head", timer: 24 },
  { name: "Matsutake", timer: 24 },
  { name: "Mint", timer: 24 },
  { name: "Mushroom", timer: 24 },
  { name: "Onion", timer: 24 },
  { name: "Pinecone", timer: 24 },
  { name: "Potato", timer: 24 },
  { name: "Radish", timer: 24 },
  { name: "Raw Meat", timer: 24 },
  { name: "Chilled Meat", timer: 24 },
  { name: "Shrimp Meat", timer: 24 },
  { name: "Snapdragon", timer: 24 },
  { name: "Sunsettia", timer: 24 },
  { name: "Sweet Flower", timer: 24 },
  { name: "Tomato", timer: 24 },
  { name: "Wheat", timer: 24 },
]);

addIcons("material", [
  { name: "Butterfly Wings", timer: 24 },
  { name: "Crystal Core", timer: 24 },
  { name: "Flaming Flower Stamen", timer: 24 },
  { name: "Frog", timer: 24 },
  { name: "Lizard Tail", timer: 24 },
  { name: "Loach Pearl", timer: 24 },
  { name: "Luminescent Spine", timer: 24 },
  { name: "Mist Flower Corolla", timer: 24 },
]);

addIcons(
  "artifact",
  Artifacts.map((artifact) => ({ name: artifact.name, timer: 24 }))
);

addIcons("npc", [
  { name: "General Goods" },
  { name: "Restaurant" },
  { name: "Blacksmith" },
  { name: "Souvenir Shop" },
  { name: "Other Shops" },
]);

addIcons("sigil", [{ name: "Anemo Sigil" }, { name: "Geo Sigil" }]);

addIcons("currency", [
  { name: "Mora" },
  { name: "Resin" },
  { name: "Primogem" },
  { name: "Genesis Crystal" },
  { name: "Intertwined Fate" },
  { name: "Acquaint Fate" },
  { name: "Masterless Starglitter" },
  { name: "Masterless Stardust" },
]);

addIcons("experience", [
  { name: "Adventure Experience" },
  { name: "Companionship Experience" },
  { name: "Battle Pass Experience" },
]);

addIcons("bundle", [
  { name: "Guidance of the Land" },
  { name: "Philosophies of the Land" },
  { name: "Battle Pass Bundle" },
]);

addIcons("circle", [
  { name: "Gray Circle" },
  { name: "Red Circle" },
  { name: "Orange Circle" },
  { name: "Yellow Circle" },
  { name: "Green Circle" },
  { name: "Teal Circle" },
  { name: "Blue Circle" },
  { name: "Cyan Circle" },
  { name: "Purple Circle" },
  { name: "Pink Circle" },
]);
