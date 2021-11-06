import { MemorySearch } from "../utils/memorySearch";
import { Artifacts } from "./artifacts";
import { Task } from "../utils/config";
import { registerMessage } from "../utils";

export const KnownResourceTimers: Record<string, Task["refreshTime"]> = {};
export const IconSearch = new MemorySearch<string>();
export const IconNames: string[] = [];
export const IconCategories: Record<string, string[]> = {};

function addIcons(type: string, items: { name: string; timer?: Task["refreshTime"] }[]) {
  for (const { name, timer } of items) {
    IconNames.push(name);
    (IconCategories[type] || (IconCategories[type] = [])).push(name);
    IconSearch.add(name, name);
    type && IconSearch.add(type, name);
    timer && (KnownResourceTimers[name] = typeof timer === "number" ? timer * 3600000 : timer);
  }
}

addIcons(registerMessage({ defaultMessage: "Gadget" }), [
  { name: registerMessage({ defaultMessage: "Portable Waypoint" }), timer: 168 },
  { name: registerMessage({ defaultMessage: "Adepti Seeker's Stove" }), timer: 5 / 60 },
  { name: registerMessage({ defaultMessage: "Parametric Transformer" }), timer: 168 },
  { name: registerMessage({ defaultMessage: "Serenitea Pot" }) },
]);

addIcons(registerMessage({ defaultMessage: "Ore" }), [
  { name: registerMessage({ defaultMessage: "Iron Chunk" }), timer: 24 },
  { name: registerMessage({ defaultMessage: "White Iron Chunk" }), timer: 48 },
  { name: registerMessage({ defaultMessage: "Crystal Chunk" }), timer: 72 },
  { name: registerMessage({ defaultMessage: "Magical Crystal Chunk" }), timer: "reset" },
  { name: registerMessage({ defaultMessage: "Electro Crystal" }), timer: 48 },
  { name: registerMessage({ defaultMessage: "Cor Lapis" }), timer: 48 },
  { name: registerMessage({ defaultMessage: "Noctilucous Jade" }), timer: 48 },
  { name: registerMessage({ defaultMessage: "Starsilver" }), timer: 48 },
  { name: registerMessage({ defaultMessage: "Amethyst Lump" }), timer: 48 },
]);

addIcons(registerMessage({ defaultMessage: "Character EXP material" }), [
  { name: registerMessage({ defaultMessage: "Wanderer's Advice" }) },
  { name: registerMessage({ defaultMessage: "Adventurer's Experience" }) },
  { name: registerMessage({ defaultMessage: "Hero's Wit" }) },
]);

addIcons(registerMessage({ defaultMessage: "Weapon enhancement material" }), [
  { name: registerMessage({ defaultMessage: "Enhancement Ore" }) },
  { name: registerMessage({ defaultMessage: "Fine Enhancement Ore" }) },
  { name: registerMessage({ defaultMessage: "Mystic Enhancement Ore" }) },
]);

addIcons(registerMessage({ defaultMessage: "Character ascension material" }), [
  { name: registerMessage({ defaultMessage: "Agnidus Agate Silver" }) },
  { name: registerMessage({ defaultMessage: "Brilliant Diamond Silver" }) },
  { name: registerMessage({ defaultMessage: "Prithiva Topaz Silver" }) },
  { name: registerMessage({ defaultMessage: "Shivada Jade Silver" }) },
  { name: registerMessage({ defaultMessage: "Vajrada Amethyst Silver" }) },
  { name: registerMessage({ defaultMessage: "Varunada Lazurite Silver" }) },
  { name: registerMessage({ defaultMessage: "Vayuda Turquoise Silver" }) },
]);

addIcons(registerMessage({ defaultMessage: "Common ascension material" }), [
  { name: registerMessage({ defaultMessage: "Slime Condensate" }), timer: "reset" },
  { name: registerMessage({ defaultMessage: "Damaged Mask" }), timer: "reset" },
  { name: registerMessage({ defaultMessage: "Firm Arrowhead" }), timer: "reset" },
  { name: registerMessage({ defaultMessage: "Divining Scroll" }), timer: "reset" },
  { name: registerMessage({ defaultMessage: "Heavy Horn" }), timer: "reset" },
  { name: registerMessage({ defaultMessage: "Dead Ley Line Branch" }), timer: "reset" },
  { name: registerMessage({ defaultMessage: "Chaos Device" }), timer: "reset" },
  { name: registerMessage({ defaultMessage: "Mist Grass Pollen" }), timer: "reset" },
  { name: registerMessage({ defaultMessage: "Hunter's Sacrificial Knife" }), timer: "reset" },
  { name: registerMessage({ defaultMessage: "Recruit's Insignia" }), timer: "reset" },
  { name: registerMessage({ defaultMessage: "Treasure Hoarder Insignia" }), timer: "reset" },
  { name: registerMessage({ defaultMessage: "Fragile Bone Shard" }), timer: "reset" },
  { name: registerMessage({ defaultMessage: "Whopperflower Nectar" }), timer: "reset" },
  { name: registerMessage({ defaultMessage: "Old Handguard" }), timer: "reset" },
  { name: registerMessage({ defaultMessage: "Chaos Gear" }), timer: "reset" },
  { name: registerMessage({ defaultMessage: "Dismal Prism" }), timer: "reset" },
  { name: registerMessage({ defaultMessage: "Spectral Husk" }), timer: "reset" },
  { name: registerMessage({ defaultMessage: "Concealed Claw" }), timer: "reset" },
]);

addIcons(registerMessage({ defaultMessage: "Local specialty of Mondstadt" }), [
  { name: registerMessage({ defaultMessage: "Calla Lily" }), timer: 48 },
  { name: registerMessage({ defaultMessage: "Cecilia" }), timer: 48 },
  { name: registerMessage({ defaultMessage: "Dandelion Seed" }), timer: 48 },
  { name: registerMessage({ defaultMessage: "Philanemo Mushroom" }), timer: 48 },
  { name: registerMessage({ defaultMessage: "Small Lamp Grass" }), timer: 48 },
  { name: registerMessage({ defaultMessage: "Valberry" }), timer: 48 },
  { name: registerMessage({ defaultMessage: "Windwheel Aster" }), timer: 48 },
  { name: registerMessage({ defaultMessage: "Wolfhook" }), timer: 48 },
]);

addIcons(registerMessage({ defaultMessage: "Local specialty of Liyue" }), [
  { name: registerMessage({ defaultMessage: "Bamboo" }), timer: 48 },
  { name: registerMessage({ defaultMessage: "Glaze Lily" }), timer: 48 },
  { name: registerMessage({ defaultMessage: "Horsetail" }), timer: 48 },
  { name: registerMessage({ defaultMessage: "Jueyun Chili" }), timer: 48 },
  { name: registerMessage({ defaultMessage: "Qingxin" }), timer: 48 },
  { name: registerMessage({ defaultMessage: "Silk Flower" }), timer: 48 },
  { name: registerMessage({ defaultMessage: "Starconch" }), timer: 48 },
  { name: registerMessage({ defaultMessage: "Violetgrass" }), timer: 48 },
]);

addIcons(registerMessage({ defaultMessage: "Local Specialty of Inazuma" }), [
  { name: registerMessage({ defaultMessage: "Crystal Marrow" }), timer: 48 },
  { name: registerMessage({ defaultMessage: "Dendrobium" }), timer: 48 },
  { name: registerMessage({ defaultMessage: "Naku Weed" }), timer: 48 },
  { name: registerMessage({ defaultMessage: "Onikabuto" }), timer: 48 },
  { name: registerMessage({ defaultMessage: "Sakura Bloom" }), timer: 48 },
  { name: registerMessage({ defaultMessage: "Sea Ganoderma" }), timer: 48 },
  { name: registerMessage({ defaultMessage: "Amakumo Fruit" }), timer: 48 },
  { name: registerMessage({ defaultMessage: "Sango Pearl" }), timer: 48 },
  { name: registerMessage({ defaultMessage: "Fluorescent Fungus" }), timer: 48 },
]);

addIcons(registerMessage({ defaultMessage: "Cooking ingredient" }), [
  { name: registerMessage({ defaultMessage: "Almond" }), timer: 24 },
  { name: registerMessage({ defaultMessage: "Apple" }), timer: 24 },
  { name: registerMessage({ defaultMessage: "Berry" }), timer: 24 },
  { name: registerMessage({ defaultMessage: "Bird Egg" }), timer: 24 },
  { name: registerMessage({ defaultMessage: "Cabbage" }), timer: 24 },
  { name: registerMessage({ defaultMessage: "Carrot" }), timer: 24 },
  { name: registerMessage({ defaultMessage: "Crab" }), timer: 24 },
  { name: registerMessage({ defaultMessage: "Fish" }), timer: 24 },
  { name: registerMessage({ defaultMessage: "Fowl" }), timer: 24 },
  { name: registerMessage({ defaultMessage: "Lotus Head" }), timer: 24 },
  { name: registerMessage({ defaultMessage: "Matsutake" }), timer: 24 },
  { name: registerMessage({ defaultMessage: "Mint" }), timer: 24 },
  { name: registerMessage({ defaultMessage: "Mushroom" }), timer: 24 },
  { name: registerMessage({ defaultMessage: "Onion" }), timer: 24 },
  { name: registerMessage({ defaultMessage: "Pinecone" }), timer: 24 },
  { name: registerMessage({ defaultMessage: "Potato" }), timer: 24 },
  { name: registerMessage({ defaultMessage: "Radish" }), timer: 24 },
  { name: registerMessage({ defaultMessage: "Raw Meat" }), timer: 24 },
  { name: registerMessage({ defaultMessage: "Chilled Meat" }), timer: 24 },
  { name: registerMessage({ defaultMessage: "Shrimp Meat" }), timer: 24 },
  { name: registerMessage({ defaultMessage: "Snapdragon" }), timer: 24 },
  { name: registerMessage({ defaultMessage: "Sunsettia" }), timer: 24 },
  { name: registerMessage({ defaultMessage: "Sweet Flower" }), timer: 24 },
  { name: registerMessage({ defaultMessage: "Tomato" }), timer: 24 },
  { name: registerMessage({ defaultMessage: "Wheat" }), timer: 24 },
]);

addIcons(registerMessage({ defaultMessage: "Furnishing" }), [
  { name: registerMessage({ defaultMessage: "Yellow Dye" }) },
  { name: registerMessage({ defaultMessage: "Blue Dye" }) },
  { name: registerMessage({ defaultMessage: "Red Dye" }) },
  { name: registerMessage({ defaultMessage: "Fabric" }) },
  { name: registerMessage({ defaultMessage: "Bamboo Segment" }), timer: "reset" },
  { name: registerMessage({ defaultMessage: "Birch Wood" }), timer: "reset" },
  { name: registerMessage({ defaultMessage: "Fragrant Cedar Wood" }), timer: "reset" },
  { name: registerMessage({ defaultMessage: "Cuihua Wood" }), timer: "reset" },
  { name: registerMessage({ defaultMessage: "Fir Wood" }), timer: "reset" },
  { name: registerMessage({ defaultMessage: "Pine Wood" }), timer: "reset" },
  { name: registerMessage({ defaultMessage: "Sandbearer Wood" }), timer: "reset" },
]);

addIcons(registerMessage({ defaultMessage: "Material" }), [
  { name: registerMessage({ defaultMessage: "Butterfly Wings" }), timer: 24 },
  { name: registerMessage({ defaultMessage: "Crystal Core" }), timer: 24 },
  { name: registerMessage({ defaultMessage: "Flaming Flower Stamen" }), timer: 24 },
  { name: registerMessage({ defaultMessage: "Frog" }), timer: 24 },
  { name: registerMessage({ defaultMessage: "Lizard Tail" }), timer: 24 },
  { name: registerMessage({ defaultMessage: "Loach Pearl" }), timer: 24 },
  { name: registerMessage({ defaultMessage: "Luminescent Spine" }), timer: 24 },
  { name: registerMessage({ defaultMessage: "Mist Flower Corolla" }), timer: 24 },
  { name: registerMessage({ defaultMessage: "Vitalized Dragontooth" }), timer: 48 },
]);

addIcons(
  registerMessage({ defaultMessage: "Artifact" }),
  Artifacts.map((artifact) => ({ name: artifact.name, timer: 24 }))
);

addIcons(registerMessage({ defaultMessage: "NPC" }), [
  { name: registerMessage({ defaultMessage: "General Goods" }) },
  { name: registerMessage({ defaultMessage: "Restaurant" }) },
  { name: registerMessage({ defaultMessage: "Blacksmith" }) },
  { name: registerMessage({ defaultMessage: "Souvenir Shop" }) },
  { name: registerMessage({ defaultMessage: "Other Shops" }) },
]);

addIcons(registerMessage({ defaultMessage: "Sigil" }), [
  { name: registerMessage({ defaultMessage: "Anemo Sigil" }) },
  { name: registerMessage({ defaultMessage: "Geo Sigil" }) },
]);

addIcons(registerMessage({ defaultMessage: "Currency" }), [
  { name: registerMessage({ defaultMessage: "Mora" }) },
  { name: registerMessage({ defaultMessage: "Resin" }) },
  { name: registerMessage({ defaultMessage: "Condensed Resin" }) },
  { name: registerMessage({ defaultMessage: "Transient Resin" }) },
  { name: registerMessage({ defaultMessage: "Primogem" }) },
  { name: registerMessage({ defaultMessage: "Genesis Crystal" }) },
  { name: registerMessage({ defaultMessage: "Intertwined Fate" }) },
  { name: registerMessage({ defaultMessage: "Acquaint Fate" }) },
  { name: registerMessage({ defaultMessage: "Masterless Starglitter" }) },
  { name: registerMessage({ defaultMessage: "Masterless Stardust" }) },
]);

addIcons(registerMessage({ defaultMessage: "Experience" }), [
  { name: registerMessage({ defaultMessage: "Adventure Experience" }) },
  { name: registerMessage({ defaultMessage: "Companionship Experience" }) },
  { name: registerMessage({ defaultMessage: "Battle Pass Experience" }) },
]);

addIcons(registerMessage({ defaultMessage: "Bundle" }), [
  { name: registerMessage({ defaultMessage: "Guidance of the Land" }) },
  { name: registerMessage({ defaultMessage: "Philosophies of the Land" }) },
  { name: registerMessage({ defaultMessage: "Battle Pass Bundle" }) },
]);

addIcons(registerMessage({ defaultMessage: "Circle" }), [
  { name: registerMessage({ defaultMessage: "Gray Circle" }) },
  { name: registerMessage({ defaultMessage: "Red Circle" }) },
  { name: registerMessage({ defaultMessage: "Orange Circle" }) },
  { name: registerMessage({ defaultMessage: "Yellow Circle" }) },
  { name: registerMessage({ defaultMessage: "Green Circle" }) },
  { name: registerMessage({ defaultMessage: "Teal Circle" }) },
  { name: registerMessage({ defaultMessage: "Blue Circle" }) },
  { name: registerMessage({ defaultMessage: "Cyan Circle" }) },
  { name: registerMessage({ defaultMessage: "Purple Circle" }) },
  { name: registerMessage({ defaultMessage: "Pink Circle" }) },
]);
