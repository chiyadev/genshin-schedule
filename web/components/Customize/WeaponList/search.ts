import { MemorySearch } from "../../../utils/memorySearch";
import { Weapon, Weapons } from "../../../db/weapons";
import { MultiMap } from "../../../utils/multiMap";
import { Regions } from "../../../db/regions";
import { getTranslatedMessages } from "../../../langs";

export const WeaponSearch = new MemorySearch<Weapon>();
const materialToWeapons = new MultiMap<string, Weapon>();

for (const weapon of Weapons) {
  WeaponSearch.add(getTranslatedMessages(weapon.type), weapon);
  WeaponSearch.add(getTranslatedMessages(weapon.name), weapon);

  for (const material of [weapon.material, ...weapon.commonMaterials]) {
    WeaponSearch.add(getTranslatedMessages(material.name), weapon);
    WeaponSearch.add(getTranslatedMessages(material.item), weapon);

    materialToWeapons.add(material.name, weapon);
  }
}

for (const region of Regions) {
  for (const domain of region.domains) {
    for (const drops of domain.drops) {
      for (const item of [...drops.items, ...(drops.itemsAux || [])]) {
        for (const weapon of materialToWeapons.get(item.name)) {
          WeaponSearch.add(getTranslatedMessages(region.name), weapon);
          WeaponSearch.add(getTranslatedMessages(domain.name), weapon);

          //drops.name && WeaponSearch.add(drops.name, weapon);
          drops.days.forEach((day) => WeaponSearch.add(day, weapon));
        }
      }
    }
  }
}
