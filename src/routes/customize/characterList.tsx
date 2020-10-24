import { h } from "preact";
import { useMemo } from "preact/hooks";
import { Character, Characters } from "../../db/characters";
import { Regions } from "../../db/regions";
import { Link } from "preact-router";
import { useConfig } from "../../configs";
import { cx } from "emotion";
import LazyLoad from "react-lazyload";
import { MemorySearch } from "../../memorySearch";
import { DomainOfMastery } from "../../db/domainCategories";
import { MultiMap } from "../../multiMap";
import { memo } from "preact/compat";

const db = new MemorySearch<Character>();
const materialToCharacters = new MultiMap<string, Character>();

for (const character of Characters) {
  db.add(character.type, character);
  db.add(character.name, character);
  db.add(character.talentMaterial.name, character);

  materialToCharacters.add(character.talentMaterial.name, character);
}

for (const region of Regions) {
  for (const character of region.characters) {
    db.add(region.name, character);
  }
}

for (const domain of DomainOfMastery.domains) {
  for (const drops of domain.drops) {
    for (const item of drops.items) {
      for (const character of materialToCharacters.get(item.name)) {
        db.add(domain.name, character);

        drops.name && db.add(drops.name, character);
        drops.days.forEach(day => db.add(day, character));
      }
    }
  }
}

const CharacterList = ({ search }: { search: string }) => {
  const results = useMemo(
    () => db.search(search).sort((a, b) => a.name.localeCompare(b.name)),
    [search]
  );

  if (results.length === 0) {
    return null;
  }
  return (
    <div className="space-y-2">
      <div className="text-xl font-bold">
        <img
          alt="Character"
          src="/assets/game/Anemo.png"
          className="w-8 h-8 inline"
        />

        <span className="align-middle"> Characters</span>
      </div>

      <div>
        {results.map(character => (
          <Link key={character.name} href={`/characters/${character.name}`}>
            <CharacterIcon character={character} />
          </Link>
        ))}
      </div>
    </div>
  );
};

const CharacterIcon = ({ character }: { character: Character }) => {
  const [existing] = useConfig("characters");

  const alreadyAdded = useMemo(() => existing.includes(character.name), [
    existing,
    character.name
  ]);

  return (
    <div
      className={cx(
        "inline-block m-1 text-center bg-white text-black rounded shadow-lg w-32",
        { "opacity-50": alreadyAdded }
      )}
    >
      <LazyLoad>
        <img
          alt={character.name}
          className="w-20 h-20 mx-auto mt-2 rounded-full"
          src={`/assets/game/${character.name}.png`}
        />
      </LazyLoad>

      <div className="text-center p-2">
        <div className="text-sm">{character.name}</div>

        <div className="text-xs text-gray-600">
          <img
            alt={character.talentMaterial.name}
            src={`/assets/game/${character.talentMaterial.item}.png`}
            className="w-3 h-3 inline opacity-75"
          />

          <span className="align-middle"> {character.talentMaterial.name}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(CharacterList);
