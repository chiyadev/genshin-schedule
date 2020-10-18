import { h } from "preact";
import { useMemo } from "preact/hooks";
import { Character, Characters as CharacterList } from "../../db/characters";
import { Regions } from "../../db/regions";

const Characters = ({ search }: { search: string }) => {
  const list = useMemo(() => {
    const text = search.toLowerCase();
    const set = new Set<Character>();

    for (const character of CharacterList) {
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

    return Array.from(set).sort((a, b) => a.name.localeCompare(b.name));
  }, [search]);

  if (list.length === 0) {
    return null;
  }

  return (
    <div className="">
      <div className="text-xl font-bold mb-2">
        <img
          src="/assets/elements/Element_Anemo.png"
          className="w-8 h-8 inline"
        />

        <span className="align-middle"> Characters</span>
      </div>

      {list.map(character => (
        <CharacterIcon key={character.name} character={character} />
      ))}
    </div>
  );
};

const CharacterIcon = ({ character }: { character: Character }) => {
  return (
    <div className="inline-block m-1 text-center bg-white text-black rounded shadow-lg w-24 cursor-pointer">
      <img
        className="w-20 h-20 mx-auto mt-2 rounded-full"
        src={`/assets/characters/Character_${character.name}_Thumb.png`}
      />

      <div className="text-center p-2">
        <div className="text-sm">{character.name}</div>

        <div className="text-xs text-gray-600">
          <img
            src={`/assets/talents/Item_Teachings_of__${character.talentMaterial.name}_.png`}
            className="w-3 h-3 inline opacity-75"
          />

          <span className="align-middle"> {character.talentMaterial.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Characters;
