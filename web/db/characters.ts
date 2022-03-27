import {
  AshenHeart,
  Ballad,
  BloodjadeBranch,
  Diligence,
  DragonLordsCrown,
  DvalinClaw,
  DvalinPlume,
  DvalinSigh,
  Elegance,
  Freedom,
  GildedScale,
  Gold,
  HellfireButterfly,
  Light,
  MoltenMoment,
  MudraOfTheMaleficGeneral,
  Prosperity,
  Resistance,
  RingOfBoreas,
  ShadowOfTheWarrior,
  ShardOfAFoulLegacy,
  SpiritLocketOfBoreas,
  TailOfBoreas,
  TalentMaterial,
  TheMeaningOfAeons,
  Transience,
  TuskOfMonocerosCaeli,
} from "./talentMaterials";
import {
  AmakumoFruit,
  CallaLily,
  Cecilia,
  CommonMaterial,
  CorLapis,
  CrystalMarrow,
  DandelionSeed,
  Dendrobium,
  FatuiInsignia,
  FluorescentFungus,
  GlazeLily,
  Handguard,
  HilichurlArrowhead,
  HilichurlMask,
  JueyunChili,
  NakuWeed,
  NoctilucousJade,
  Onikabuto,
  PhilanemoMushroom,
  Qingxin,
  SakuraBloom,
  SamachurlScroll,
  SangoPearl,
  SeaGanoderma,
  SilkFlower,
  Slime,
  SmallLampGrass,
  SpectralCore,
  Starconch,
  TreasureHoarderInsignia,
  Valberry,
  Violetgrass,
  WhopperflowerNectar,
  WindwheelAster,
  Wolfhook,
} from "./commonMaterials";
import { registerMessage } from "../utils";
import {
  AgnidusAgate,
  BasaltPillar,
  BrilliantDiamond,
  CharacterMaterial,
  CleansingHeart,
  CrystallineBloom,
  DewOfRepudiation,
  EverflameSeed,
  HoarfrostCore,
  HurricaneSeed,
  JuvenileJade,
  LightningPrism,
  MarionetteCore,
  PerpetualHeart,
  PrithivaTopaz,
  RiftbornRegalia,
  DragonheirsFalseFin,
  ShivadaJade,
  SmolderingPearl,
  StormBeads,
  VajradaAmethyst,
  VarunadaLazurite,
  VayudaTurquoise,
} from "./characterMaterials";

export const CharacterWiki = "https://genshin-impact.fandom.com/wiki/Characters";

export type Character = {
  type: "Character";
  name: string;
  wiki: string;
  materials: CharacterMaterial[];
  talentMaterialWeekly: TalentMaterial;
  talentMaterial: TalentMaterial;
  commonMaterials: CommonMaterial[];
  leaked?: boolean;
};

registerMessage({ defaultMessage: "Character" });
registerMessage({ defaultMessage: "Paimon" });

export const TravelerAnemo: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Traveler (Anemo)" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Traveler_(Anemo)",
  materials: [BrilliantDiamond],
  talentMaterialWeekly: DvalinSigh,
  talentMaterial: Resistance,
  commonMaterials: [SamachurlScroll, WindwheelAster],
};

export const TravelerGeo: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Traveler (Geo)" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Traveler_(Geo)",
  materials: [BrilliantDiamond],
  talentMaterialWeekly: DvalinSigh,
  talentMaterial: Resistance,
  commonMaterials: [SamachurlScroll, HilichurlArrowhead, WindwheelAster],
};

export const TravelerElectro: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Traveler (Electro)" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Traveler_(Electro)",
  materials: [BrilliantDiamond],
  talentMaterialWeekly: DragonLordsCrown,
  talentMaterial: Transience,
  commonMaterials: [Handguard],
};

export const Amber: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Amber" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Amber",
  materials: [AgnidusAgate, EverflameSeed],
  talentMaterialWeekly: DvalinSigh,
  talentMaterial: Freedom,
  commonMaterials: [HilichurlArrowhead, SmallLampGrass],
};

export const Barbara: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Barbara" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Barbara",
  materials: [VarunadaLazurite, CleansingHeart],
  talentMaterialWeekly: RingOfBoreas,
  talentMaterial: Freedom,
  commonMaterials: [SamachurlScroll, PhilanemoMushroom],
};

export const Beidou: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Beidou" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Beidou",
  materials: [VajradaAmethyst, LightningPrism],
  talentMaterialWeekly: DvalinSigh,
  talentMaterial: Gold,
  commonMaterials: [TreasureHoarderInsignia, NoctilucousJade],
};

export const Bennett: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Bennett" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Bennett",
  materials: [AgnidusAgate, EverflameSeed],
  talentMaterialWeekly: DvalinPlume,
  talentMaterial: Resistance,
  commonMaterials: [TreasureHoarderInsignia, WindwheelAster],
};

export const Chongyun: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Chongyun" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Chongyun",
  materials: [ShivadaJade, HoarfrostCore],
  talentMaterialWeekly: DvalinSigh,
  talentMaterial: Diligence,
  commonMaterials: [HilichurlMask, CorLapis],
};

export const Diluc: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Diluc" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Diluc",
  materials: [AgnidusAgate, EverflameSeed],
  talentMaterialWeekly: DvalinPlume,
  talentMaterial: Resistance,
  commonMaterials: [FatuiInsignia, SmallLampGrass],
};

export const Fischl: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Fischl" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Fischl",
  materials: [VajradaAmethyst, LightningPrism],
  talentMaterialWeekly: SpiritLocketOfBoreas,
  talentMaterial: Ballad,
  commonMaterials: [HilichurlArrowhead, SmallLampGrass],
};

export const Jean: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Jean" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Jean",
  materials: [VayudaTurquoise, HurricaneSeed],
  talentMaterialWeekly: DvalinPlume,
  talentMaterial: Resistance,
  commonMaterials: [HilichurlMask, DandelionSeed],
};

export const Kaeya: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Kaeya" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Kaeya",
  materials: [ShivadaJade, HoarfrostCore],
  talentMaterialWeekly: SpiritLocketOfBoreas,
  talentMaterial: Ballad,
  commonMaterials: [TreasureHoarderInsignia, CallaLily],
};

export const Keqing: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Keqing" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Keqing",
  materials: [VajradaAmethyst, LightningPrism],
  talentMaterialWeekly: RingOfBoreas,
  talentMaterial: Prosperity,
  commonMaterials: [WhopperflowerNectar, CorLapis],
};

export const Lisa: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Lisa" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Lisa",
  materials: [VajradaAmethyst, LightningPrism],
  talentMaterialWeekly: DvalinClaw,
  talentMaterial: Ballad,
  commonMaterials: [Slime, Valberry],
};

export const Mona: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Mona" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Mona",
  materials: [VarunadaLazurite, CleansingHeart],
  talentMaterialWeekly: RingOfBoreas,
  talentMaterial: Resistance,
  commonMaterials: [WhopperflowerNectar, PhilanemoMushroom],
};

export const Ningguang: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Ningguang" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Ningguang",
  materials: [PrithivaTopaz, BasaltPillar],
  talentMaterialWeekly: SpiritLocketOfBoreas,
  talentMaterial: Prosperity,
  commonMaterials: [FatuiInsignia, GlazeLily],
};

export const Noelle: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Noelle" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Noelle",
  materials: [PrithivaTopaz, BasaltPillar],
  talentMaterialWeekly: DvalinClaw,
  talentMaterial: Resistance,
  commonMaterials: [HilichurlMask, Valberry],
};

export const Qiqi: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Qiqi" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Qiqi",
  materials: [ShivadaJade, HoarfrostCore],
  talentMaterialWeekly: TailOfBoreas,
  talentMaterial: Prosperity,
  commonMaterials: [SamachurlScroll, Violetgrass],
};

export const Razor: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Razor" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Razor",
  materials: [VajradaAmethyst, LightningPrism],
  talentMaterialWeekly: DvalinClaw,
  talentMaterial: Resistance,
  commonMaterials: [HilichurlMask, Wolfhook],
};

export const Sucrose: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Sucrose" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Sucrose",
  materials: [VayudaTurquoise, HurricaneSeed],
  talentMaterialWeekly: SpiritLocketOfBoreas,
  talentMaterial: Freedom,
  commonMaterials: [WhopperflowerNectar, WindwheelAster],
};

export const Venti: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Venti" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Venti",
  materials: [VayudaTurquoise, HurricaneSeed],
  talentMaterialWeekly: TailOfBoreas,
  talentMaterial: Ballad,
  commonMaterials: [Slime, Cecilia],
};

export const Xiangling: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Xiangling" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Xiangling",
  materials: [AgnidusAgate, EverflameSeed],
  talentMaterialWeekly: DvalinClaw,
  talentMaterial: Diligence,
  commonMaterials: [Slime, JueyunChili],
};

export const Xingqiu: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Xingqiu" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Xingqiu",
  materials: [VarunadaLazurite, CleansingHeart],
  talentMaterialWeekly: TailOfBoreas,
  talentMaterial: Gold,
  commonMaterials: [HilichurlMask, SilkFlower],
};

export const Klee: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Klee" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Klee",
  materials: [AgnidusAgate, EverflameSeed],
  talentMaterialWeekly: RingOfBoreas,
  talentMaterial: Freedom,
  commonMaterials: [SamachurlScroll, PhilanemoMushroom],
};

export const Tartaglia: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Tartaglia" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Tartaglia",
  materials: [VarunadaLazurite, CleansingHeart],
  talentMaterialWeekly: ShardOfAFoulLegacy,
  talentMaterial: Freedom,
  commonMaterials: [FatuiInsignia, Starconch],
};

export const Diona: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Diona" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Diona",
  materials: [ShivadaJade, HoarfrostCore],
  talentMaterialWeekly: ShardOfAFoulLegacy,
  talentMaterial: Freedom,
  commonMaterials: [HilichurlArrowhead, CallaLily],
};

export const Zhongli: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Zhongli" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Zhongli",
  materials: [PrithivaTopaz, BasaltPillar],
  talentMaterialWeekly: TuskOfMonocerosCaeli,
  talentMaterial: Gold,
  commonMaterials: [Slime, CorLapis],
};

export const Xinyan: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Xinyan" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Xinyan",
  materials: [AgnidusAgate, EverflameSeed],
  talentMaterialWeekly: TuskOfMonocerosCaeli,
  talentMaterial: Gold,
  commonMaterials: [TreasureHoarderInsignia, Violetgrass],
};

export const Yanfei: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Yanfei" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Yanfei",
  materials: [AgnidusAgate, JuvenileJade],
  talentMaterialWeekly: BloodjadeBranch,
  talentMaterial: Gold,
  commonMaterials: [TreasureHoarderInsignia, NoctilucousJade],
};

export const Eula: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Eula" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Eula",
  materials: [ShivadaJade, CrystallineBloom],
  talentMaterialWeekly: DragonLordsCrown,
  talentMaterial: Resistance,
  commonMaterials: [HilichurlMask, DandelionSeed],
};

export const Albedo: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Albedo" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Albedo",
  materials: [PrithivaTopaz, BasaltPillar],
  talentMaterialWeekly: TuskOfMonocerosCaeli,
  talentMaterial: Ballad,
  commonMaterials: [SamachurlScroll, Cecilia],
};

export const Ganyu: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Ganyu" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Ganyu",
  materials: [ShivadaJade, HoarfrostCore],
  talentMaterialWeekly: ShadowOfTheWarrior,
  talentMaterial: Diligence,
  commonMaterials: [WhopperflowerNectar, Qingxin],
};

export const Ayaka: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Ayaka" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Kamisato_Ayaka",
  materials: [ShivadaJade, PerpetualHeart],
  talentMaterialWeekly: BloodjadeBranch,
  talentMaterial: Elegance,
  commonMaterials: [SakuraBloom, Handguard],
};

export const Xiao: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Xiao" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Xiao",
  materials: [VayudaTurquoise, JuvenileJade],
  talentMaterialWeekly: ShadowOfTheWarrior,
  talentMaterial: Prosperity,
  commonMaterials: [Slime, Qingxin],
};

export const Rosaria: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Rosaria" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Rosaria",
  materials: [ShivadaJade, HoarfrostCore],
  talentMaterialWeekly: ShadowOfTheWarrior,
  talentMaterial: Ballad,
  commonMaterials: [FatuiInsignia, Valberry],
};

export const HuTao: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Hu Tao" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Hu_Tao",
  materials: [AgnidusAgate, JuvenileJade],
  talentMaterialWeekly: ShardOfAFoulLegacy,
  talentMaterial: Diligence,
  commonMaterials: [WhopperflowerNectar, SilkFlower],
};

export const Kazuha: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Kazuha" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Kazuha",
  materials: [VayudaTurquoise, MarionetteCore],
  talentMaterialWeekly: GildedScale,
  talentMaterial: Diligence,
  commonMaterials: [TreasureHoarderInsignia, SeaGanoderma],
};

export const Sayu: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Sayu" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Sayu",
  materials: [VayudaTurquoise, MarionetteCore],
  talentMaterialWeekly: GildedScale,
  talentMaterial: Light,
  commonMaterials: [WhopperflowerNectar, CrystalMarrow],
};

export const Yoimiya: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Yoimiya" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Yoimiya",
  materials: [AgnidusAgate, SmolderingPearl],
  talentMaterialWeekly: DragonLordsCrown,
  talentMaterial: Transience,
  commonMaterials: [SamachurlScroll, NakuWeed],
};

export const RaidenShogun: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Raiden Shogun" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Raiden_Shogun",
  materials: [VajradaAmethyst, StormBeads],
  talentMaterialWeekly: MoltenMoment,
  talentMaterial: Light,
  commonMaterials: [Handguard, AmakumoFruit],
};

export const Sara: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Sara" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Kujou_Sara",
  materials: [VajradaAmethyst, StormBeads],
  talentMaterialWeekly: AshenHeart,
  talentMaterial: Elegance,
  commonMaterials: [HilichurlMask, Dendrobium],
};

export const Kokomi: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Kokomi" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Sangonomiya_Kokomi",
  materials: [VarunadaLazurite, DewOfRepudiation],
  talentMaterialWeekly: HellfireButterfly,
  talentMaterial: Transience,
  commonMaterials: [SpectralCore, SangoPearl],
};

export const Aloy: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Aloy" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Aloy",
  materials: [ShivadaJade, CrystallineBloom],
  talentMaterialWeekly: MoltenMoment,
  talentMaterial: Freedom,
  commonMaterials: [SpectralCore, CrystalMarrow],
};

export const Thoma: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Thoma" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Thoma",
  materials: [AgnidusAgate, SmolderingPearl],
  talentMaterialWeekly: HellfireButterfly,
  talentMaterial: Transience,
  commonMaterials: [TreasureHoarderInsignia, FluorescentFungus],
};

export const Gorou: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Gorou" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Gorou",
  materials: [PrithivaTopaz, PerpetualHeart],
  talentMaterialWeekly: MoltenMoment,
  talentMaterial: Light,
  commonMaterials: [SpectralCore, SangoPearl],
};

export const Itto: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Itto" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Arataki_Itto",
  materials: [PrithivaTopaz, RiftbornRegalia],
  talentMaterialWeekly: AshenHeart,
  talentMaterial: Elegance,
  commonMaterials: [Slime, Onikabuto],
};

export const YunJin: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Yun Jin" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Yun_Jin",
  materials: [PrithivaTopaz, RiftbornRegalia],
  talentMaterialWeekly: AshenHeart,
  talentMaterial: Diligence,
  commonMaterials: [HilichurlMask, GlazeLily],
};

export const Shenhe: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Shenhe" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Shenhe",
  materials: [ShivadaJade, DragonheirsFalseFin],
  talentMaterialWeekly: HellfireButterfly,
  talentMaterial: Prosperity,
  commonMaterials: [WhopperflowerNectar, Qingxin],
};

export const YaeMiko: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Yae Miko" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Yae_Miko",
  materials: [VajradaAmethyst, DragonheirsFalseFin],
  talentMaterialWeekly: TheMeaningOfAeons,
  talentMaterial: Light,
  commonMaterials: [SeaGanoderma, Handguard],
};

export const Ayato: Character = {
  type: "Character",
  name: registerMessage({ defaultMessage: "Ayato" }),
  wiki: "https://genshin-impact.fandom.com/wiki/Kamisato_Ayato",
  materials: [VarunadaLazurite, DewOfRepudiation],
  talentMaterialWeekly: MudraOfTheMaleficGeneral,
  talentMaterial: Elegance,
  commonMaterials: [SakuraBloom, Handguard],
};

export const Characters = [
  // https://github.com/chiyadev/genshin-schedule/issues/11
  //TravelerAnemo,
  //TravelerGeo,
  //TravelerElectro,
  Albedo,
  Aloy,
  Amber,
  Ayaka,
  Ayato,
  Barbara,
  Beidou,
  Bennett,
  Chongyun,
  Diluc,
  Diona,
  Eula,
  Fischl,
  Ganyu,
  Gorou,
  HuTao,
  Itto,
  Jean,
  Kaeya,
  Kazuha,
  Keqing,
  Klee,
  Kokomi,
  Lisa,
  Mona,
  Ningguang,
  Noelle,
  Qiqi,
  RaidenShogun,
  Razor,
  Rosaria,
  Sara,
  Sayu,
  Shenhe,
  Sucrose,
  Tartaglia,
  Thoma,
  Venti,
  Xiangling,
  Xiao,
  Xingqiu,
  Xinyan,
  YaeMiko,
  Yanfei,
  Yoimiya,
  YunJin,
  Zhongli,
];
