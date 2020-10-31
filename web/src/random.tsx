import { Artifacts } from "./db/artifacts";
import { Characters } from "./db/characters";
import { CommonMaterials } from "./db/commonMaterials";
import { DomainDropSets } from "./db/domainDropSets";
import { Domains } from "./db/domains";
import { Regions } from "./db/regions";
import { TalentMaterials } from "./db/talentMaterials";
import { WeaponMaterials } from "./db/weaponMaterials";
import { Weapons } from "./db/weapons";

export function randomStr(length: number) {
  const chars: string[] = [];

  for (let i = 0; i < length; i++) {
    chars[i] = Math.random().toString(36)[2];
  }

  return chars.join("");
}

const wordSet = new Set<string>();

function addWords(s: string) {
  for (const word of s.split(" ")) {
    word.length && wordSet.add(word);
  }
}

for (const artifact of Artifacts) addWords(artifact.name);
for (const character of Characters) addWords(character.name);
for (const material of CommonMaterials) addWords(material.name);
for (const drops of DomainDropSets) addWords(drops.name || "");
for (const domain of Domains) addWords(domain.name);
for (const region of Regions) addWords(region.name);
for (const material of TalentMaterials) addWords(material.name);
for (const material of WeaponMaterials) addWords(material.name);
for (const weapon of Weapons) addWords(weapon.name);

const words = Array.from(wordSet);

export function randomWord() {
  let word = words[Math.floor(Math.random() * words.length)];

  word = word.replace(/'/g, "");
  word = word.replace(/-/g, "_");

  return word;
}
