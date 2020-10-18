import { h } from "preact";
import { useMemo } from "preact/hooks";
import { Character, Characters } from "../../db/characters";
import { Regions } from "../../db/regions";
import { Link } from "preact-router";
import { useConfig } from "../../configs";
import { cx } from "emotion";
import { Domains } from "../../db/domains";
import { DomainDropSets } from "../../db/domainDropSets";

const materialToCharacters = Characters.reduce((x, c) => {
  const list = x[c.talentMaterial.name];

  if (list) list.push(c);
  else x[c.talentMaterial.name] = [c];

  return x;
}, {} as { [key: string]: Character[] });

const CharacterList = ({ search }: { search: string }) => {
  const list = useMemo(() => {
    const text = search.toLowerCase();
    const set = new Set<Character>();

    for (const character of Characters) {
      if (
        character.name.toLowerCase().includes(text) ||
        character.talentMaterial.name.toLowerCase().includes(text)
      ) {
        set.add(character);
      }
    }

    for (const region of Regions) {
      if (region.name.toLowerCase().includes(text)) {
        for (const character of region.characters) {
          set.add(character);
        }
      }
    }

    function addByMaterial(material: string) {
      const characters = materialToCharacters[material];
      if (characters) {
        for (const character of characters) {
          set.add(character);
        }
      }
    }

    for (const domain of Domains) {
      if (domain.name.toLowerCase().includes(text)) {
        for (const drops of domain.drops) {
          for (const item of drops.items) {
            addByMaterial(item.name);
          }
        }
      }
    }

    for (const drops of DomainDropSets) {
      if (drops.name && drops.name.toLowerCase().includes(text)) {
        for (const item of drops.items) {
          addByMaterial(item.name);
        }
      }
    }

    return Array.from(set).sort((a, b) => a.name.localeCompare(b.name));
  }, [search]);

  if (list.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="text-xl font-bold mb-2">
        <img src="/assets/elements/Anemo.png" className="w-8 h-8 inline" />

        <span className="align-middle"> Characters</span>
      </div>

      {list.map(character => (
        <Link key={character.name} href={`/characters/${character.name}`}>
          <CharacterIcon character={character} />
        </Link>
      ))}
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
        "inline-block m-1 text-center bg-white text-black rounded shadow-lg w-24",
        { "opacity-50": alreadyAdded }
      )}
    >
      <img
        className="w-20 h-20 mx-auto mt-2 rounded-full"
        src={`/assets/characters/${character.name}.png`}
      />

      <div className="text-center p-2">
        <div className="text-sm">{character.name}</div>

        <div className="text-xs text-gray-600">
          <img
            src={`/assets/characters/${character.talentMaterial.name}.png`}
            className="w-3 h-3 inline opacity-75"
          />

          <span className="align-middle"> {character.talentMaterial.name}</span>
        </div>
      </div>
    </div>
  );
};

export default CharacterList;
