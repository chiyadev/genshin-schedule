import { MemorySearch } from "../../../utils/memorySearch";
import { Character, Characters } from "../../../db/characters";
import { MultiMap } from "../../../utils/multiMap";
import { Regions } from "../../../db/regions";
import { DomainOfMastery } from "../../../db/domainCategories";
import { getTranslatedMessages } from "../../../langs";

export const CharacterSearch = new MemorySearch<Character>();
const materialToCharacters = new MultiMap<string, Character>();

for (const character of Characters) {
  CharacterSearch.add(getTranslatedMessages(character.type), character);
  CharacterSearch.add(getTranslatedMessages(character.name), character);

  for (const material of [
    ...character.materials,
    ...character.commonMaterials,
    character.talentMaterial,
    character.talentMaterialWeekly,
  ]) {
    CharacterSearch.add(getTranslatedMessages(material.name), character);
    CharacterSearch.add(getTranslatedMessages(material.item), character);

    materialToCharacters.add(material.name, character);
  }
}

for (const region of Regions) {
  for (const character of region.characters) {
    CharacterSearch.add(getTranslatedMessages(region.name), character);
  }
}

for (const domain of DomainOfMastery.domains) {
  for (const drops of domain.drops) {
    for (const item of [...drops.items, ...(drops.itemsAux || [])]) {
      for (const character of materialToCharacters.get(item.name)) {
        CharacterSearch.add(getTranslatedMessages(domain.name), character);

        //drops.name && CharacterSearch.add(drops.name, character);
        drops.days.forEach((day) => CharacterSearch.add(day, character));
      }
    }
  }
}
