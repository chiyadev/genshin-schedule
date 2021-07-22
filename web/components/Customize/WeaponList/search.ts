import { MemorySearch } from "../../../utils/memorySearch";
import { Weapon, Weapons } from "../../../db/weapons";
import { MultiMap } from "../../../utils/multiMap";
import { Regions } from "../../../db/regions";

export const WeaponSearch = new MemorySearch<Weapon>();
const materialToWeapons = new MultiMap<string, Weapon>();

for (const weapon of Weapons) {
  WeaponSearch.add(weapon.type, weapon);
  WeaponSearch.add(weapon.name, weapon);

  WeaponSearch.add(weapon.material.name, weapon);
  WeaponSearch.add(weapon.material.item, weapon);

  for (const material of weapon.commonMaterials) {
    WeaponSearch.add(material.name, weapon);
    WeaponSearch.add(material.item, weapon);
  }

  materialToWeapons.add(weapon.material.name, weapon);
}

for (const region of Regions) {
  for (const domain of region.domains) {
    for (const drops of domain.drops) {
      for (const item of drops.items) {
        for (const weapon of materialToWeapons.get(item.name)) {
          WeaponSearch.add(region.name, weapon);
          WeaponSearch.add(domain.name, weapon);

          drops.name && WeaponSearch.add(drops.name, weapon);
          drops.days.forEach((day) => WeaponSearch.add(day, weapon));
        }
      }
    }
  }
}
