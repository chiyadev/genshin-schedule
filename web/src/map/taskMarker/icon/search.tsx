import { MemorySearch } from "../../../memorySearch";
import { CommonMaterials } from "../../../db/commonMaterials";
import { Artifacts } from "../../../db/artifacts";

export const IconSearch = new MemorySearch<string>();
export const Icons: string[] = [];

function addIcons(type: string, names: string[]) {
  for (const name of names) {
    Icons.push(name);
    IconSearch.add(name, name);
    type && IconSearch.add(type, name);
  }
}

addIcons("ore", [
  "Iron Chunk",
  "White Iron Chunk",
  "Crystal Chunk",
  "Electro Crystal",
  "Cor Lapis",
  "Noctilucous Jade",
]);

addIcons("character exp material", [
  "Wanderer's Advice",
  "Adventurer's Experience",
  "Hero's Wit",
]);

addIcons("weapon enhancement material", [
  "Enhancement Ore",
  "Fine Enhancement Ore",
  "Mystic Enhancement Ore",
]);

addIcons("character ascension material", [
  "Brilliant Diamond Sliver",
  "Vayuda Turquoise Sliver",
  "Shivada Jade Sliver",
  "Vajrada Amethyst Sliver",
  "Prithiva Topaz Sliver",
  "Varunada Lazurite Sliver",
  "Agnidus Agate Sliver",
]);

addIcons(
  "common ascension material",
  CommonMaterials.map((material) => material.item)
);

addIcons("local specialty mondstadt", [
  "Calla Lily",
  "Cecilia",
  "Dandelion Seed",
  "Philanemo Mushroom",
  "Small Lamp Grass",
  "Valberry",
  "Windwheel Aster",
  "Wolfhook",
]);

addIcons("local specialty liyue", [
  "Jueyun Chili",
  "Qingxin",
  "Silk Flower",
  "Starconch",
  "Violetgrass",
  "Glaze Lily",
  "Horsetail",
]);

addIcons("cooking ingredient", [
  "Almond",
  "Berry",
  "Bird Egg",
  "Cabbage",
  "Carrot",
  "Crab",
  "Fish",
  "Fowl",
  "Lotus Head",
  "Matsutake",
  "Mushroom",
  "Mint",
  "Onion",
  "Pinecone",
  "Potato",
  "Radish",
  "Raw Meat",
  "Snapdragon",
  "Sweet Flower",
  "Shrimp Meat",
  "Tomato",
  "Wheat",
]);

addIcons(
  "artifact",
  Artifacts.map((artifact) => artifact.name)
);

export const KnownResourceTimers: { [key: string]: number | undefined } = {
  "Iron Chunk": 24,
  "White Iron Chunk": 48,
  "Crystal Chunk": 72,
  "Electro Crystal": 48,
  "Cor Lapis": 72,
  "Noctilucous Jade": 48,
  "Calla Lily": 48,
  Cecilia: 48,
  "Dandelion Seed": 48,
  "Philanemo Mushroom": 48,
  "Small Lamp Grass": 48,
  Valberry: 48,
  "Windwheel Aster": 48,
  Wolfhook: 48,
  "Glaze Lily": 48,
  "Jueyun Chili": 48,
  Qingxin: 48,
  "Silk Flower": 48,
  Starconch: 48,
  Violetgrass: 48,
  Horsetail: 48, // source: https://www.reddit.com/r/Genshin_Impact/comments/jf7zhh/i_made_an_interactive_website_for_daily_domain/ga41wk5/?context=3
};
