import { h } from "preact";
import { useMemo } from "preact/hooks";
import { Characters as CharacterList } from "../../db/characters";

const Characters = ({ search }: { search: string }) => {
  const list = useMemo(() => {
    const text = search.toLowerCase();

    return CharacterList.filter(c =>
      c.name.toLowerCase().includes(text)
    ).sort((a, b) => a.name.localeCompare(b.name));
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
        <div
          key={character.name}
          className="inline-block m-1 text-center bg-white text-black rounded shadow-lg w-24 cursor-pointer"
        >
          <img
            className="w-20 h-20 mx-auto mt-2 rounded-full"
            src={`/assets/characters/Character_${character.name}_Thumb.png`}
          />

          <div className="text-center text-sm p-2">{character.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Characters;
